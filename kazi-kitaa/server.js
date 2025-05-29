const { Client } = require('pg');
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://172.17.0.8:5173', '*'], // Adjust this to your frontend URL
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// PostgreSQL connection config
const client = new Client({
  host: 'localhost',     // or your server IP
  port: 5432,            // default PostgreSQL port
  user: 'karim', // e.g., 'postgres'
  password: 'Karim@01',
  database: 'kazi_kitaa' // your database name,
});

// Connect to PostgreSQL
client.connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch(err => console.error("❌ Connection error", err.stack));

// Add JWT secret to your configuration
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // Use env variable in production

// Registration endpoint
app.post('/api/register', async (req, res) => {
  try {
    const { 
      full_name,
      email,
      phone,
      password,
      role,
      location,
      services,
      skills
    } = req.body;

    // Insert user data into database
    const userQuery = `
      INSERT INTO users (
        full_name,
        email,
        phone_number,
        password_hash,
        role,
        is_verified,
        created_at,
        last_active
      )
      VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      RETURNING id, full_name, email, role`;

    const userValues = [
      full_name,
      email,
      phone,
      password, // Note: Should hash password in production
      role,
      false // is_verified default false
    ];

    const userResult = await client.query(userQuery, userValues);
    const userId = userResult.rows[0].id;

    // If user is a worker, insert worker profile
    if (role === 'worker') {
      const workerProfileQuery = `
        INSERT INTO worker_profiles (
          user_id,
          location,
          available,
          service_radius_km
        )
        VALUES ($1, ST_SetSRID(ST_MakePoint($2, $3), 4326)::geography, true, 5)`;

      await client.query(workerProfileQuery, [
        userId,
        location.longitude,
        location.latitude
      ]);

      // Insert skills
      if (skills && skills.length > 0) {
        for (const skill of skills) {
          // First ensure skill exists in skills table
          await client.query(
            `INSERT INTO skills (name) VALUES ($1) ON CONFLICT (name) DO NOTHING`,
            [skill]
          );
          
          // Then link skill to worker
          await client.query(
            `INSERT INTO worker_skills (worker_id, skill_id)
             SELECT $1, id FROM skills WHERE name = $2`,
            [userId, skill]
          );
        }
      }

      // Insert services
      if (services && services.length > 0) {
        for (const service of services) {
          // Get service ID and link to worker
          const serviceQuery = `
            WITH service_id AS (
              SELECT id FROM services WHERE name_en = $1
            )
            INSERT INTO worker_services (worker_id, service_id)
            SELECT $2, id FROM service_id`;

          await client.query(serviceQuery, [service, userId]);
        }
      }
    }

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: userResult.rows[0]
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Error registering user',
      error: error.message
    });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Check if email exists
    const userQuery = `
      SELECT id, full_name, email, password_hash, role 
      FROM users 
      WHERE email = $1`;

    const userResult = await client.query(userQuery, [email]);

    if (userResult.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const user = userResult.rows[0];

    // Compare passwords (in production, use bcrypt.compare)
    if (user.password_hash !== password) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Get additional profile data for workers
    let profileData = {};
    if (user.role === 'worker') {
      const profileQuery = `
        SELECT wp.*, 
          array_agg(DISTINCT s.name) as skills,
          array_agg(DISTINCT srv.name_en) as services
        FROM worker_profiles wp
        LEFT JOIN worker_skills ws ON ws.worker_id = wp.user_id
        LEFT JOIN skills s ON s.id = ws.skill_id
        LEFT JOIN worker_services wsrv ON wsrv.worker_id = wp.user_id
        LEFT JOIN services srv ON srv.id = wsrv.service_id
        WHERE wp.user_id = $1
        GROUP BY wp.user_id, wp.location, wp.available, wp.service_radius_km`;

      const profileResult = await client.query(profileQuery, [user.id]);
      if (profileResult.rows.length > 0) {
        profileData = profileResult.rows[0];
      }
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id,
        role: user.role 
      }, 
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Update last_active timestamp
    await client.query(
      'UPDATE users SET last_active = CURRENT_TIMESTAMP WHERE id = $1',
      [user.id]
    );

    // Create response object without password
    const { password_hash, ...userWithoutPassword } = user;
    
    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        ...userWithoutPassword,
        ...profileData
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Error during login',
      error: error.message
    });
  }
});

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
 /*  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: 'No token provided'
    });
  } */

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
};

// Add job endpoint
app.post('/api/jobs/add', verifyToken, async (req, res) => {
  try {
    const { 
      service_id,
      description,
      location,
      scheduled_at,
      budget,
      duration
    } = req.body;

    console.log('Received job data:', req.body);
    // Validate required fields
    if (!service_id || !description || !location || !scheduled_at || !budget || !duration) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Insert job into database
    const jobQuery = `
      INSERT INTO jobs (
        service_id,
        description,
        location,
        scheduled_at,
        budget,
        duration,
        client_id,
        status,
        created_at,
        updated_at
      )
      VALUES (
        $1,
        $2,
        ST_SetSRID(ST_GeomFromText($3), 4326)::geography,
        $4,
        $5,
        $6,
        $7,
        'pending',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
      )
      RETURNING id, service_id, description, scheduled_at, budget, duration, status`;

    const jobValues = [
      service_id,
      description,
      location, // Expecting format: 'POINT(longitude latitude)'
      scheduled_at,
      budget,
      duration,
      req.user.userId // From JWT token
    ];

    const result = await client.query(jobQuery, jobValues);

    // Create notification for nearby workers
    const notifyWorkersQuery = `
      INSERT INTO notifications (
        user_id,
        type,
        content,
        created_at
      )
      SELECT 
        wp.user_id,
        'new_job',
        $1,
        CURRENT_TIMESTAMP
      FROM worker_profiles wp
      WHERE ST_DWithin(
        wp.location,
        ST_SetSRID(ST_GeomFromText($2), 4326)::geography,
        wp.service_radius_km * 1000
      )`;

    await client.query(notifyWorkersQuery, [
      `New job available in your area: ${description.substring(0, 50)}...`,
      location
    ]);

    res.status(201).json({
      success: true,
      message: 'Job created successfully',
      job: result.rows[0]
    });

  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating job',
      error: error.message
    });
  }
});

// Get all jobs endpoint
app.get('/api/jobs/list', async (req, res) => {
  try {
    const jobsQuery = `
      SELECT 
        j.*,
        s.name_en as service_name_en,
        s.name_sw as service_name_sw,
        s.icon as service_icon,
        u.full_name as client_name,
        u.email as client_email,
        ST_AsGeoJSON(j.location)::json as location_json
      FROM jobs j
      LEFT JOIN services s ON j.service_id = s.id
      LEFT JOIN users u ON j.client_id = u.id
      ORDER BY j.created_at DESC`;

    const result = await client.query(jobsQuery);

    // Format the response data
    const jobs = result.rows.map(job => ({
      id: job.id,
      service: {
        id: job.service_id,
        name_en: job.service_name_en,
        name_sw: job.service_name_sw,
        icon: job.service_icon
      },
      description: job.description,
      location: job.location_json,
      scheduled_at: job.scheduled_at,
      budget: job.budget,
      duration: job.duration,
      status: job.status,
      client: {
        name: job.client_name,
        email: job.client_email
      },
      created_at: job.created_at,
      updated_at: job.updated_at,
      views_count: job.views_count,
      applications_count: job.applications_count
    }));

    res.send(jobs);

    /* res.json({
      success: true,
      count: jobs.length,
      jobs: jobs
    }); */

  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching jobs',
      error: error.message
    });
  }
});

// Get single job endpoint
app.get('/api/jobs/:jobId', async (req, res) => {
  try {
    const { jobId } = req.params;

    const jobQuery = `
      SELECT 
        id,
        service_id,
        client_id,
        description,
        budget,
        duration,
        status,
        created_at,
        updated_at,
        scheduled_at,
        ST_AsGeoJSON(location)::json as location_json
      FROM jobs
      WHERE id = $1`;

    const result = await client.query(jobQuery, [jobId]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    // Format the job data
    const job = result.rows[0];
    const formattedJob = {
      id: job.id,
      service_id: job.service_id,
      client_id: job.client_id,
      description: job.description,
      budget: job.budget,
      duration: job.duration,
      status: job.status,
      scheduled_at: job.scheduled_at,
      created_at: job.created_at,
      updated_at: job.updated_at,
      views: job.views_count || 0,
      applications: job.applications_count || 0,
      location: {
        coordinates: job.location_json.coordinates,
        address: job.location_json.properties?.address || 'Location not specified'
      }
    };

    // Increment views count
   /*  await client.query(
      'UPDATE jobs SET views_count = COALESCE(views_count, 0) + 1 WHERE id = $1',
      [jobId]
    ); */

    res.json({
      success: true,
      job: formattedJob
    });

  } catch (error) {
    console.error('Error fetching job:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching job details',
      error: error.message
    });
  }
});

// User profile endpoint
app.get('/api/users/:userId', /*verifyToken,*/ async (req, res) => {
  try {
    const { userId } = req.params;

    // Main user query
    const userQuery = `
      SELECT 
        u.id,
        u.full_name,
        u.email,
        u.phone_number,
        u.role,
        u.is_verified,
        u.created_at,
        u.last_active,
        CASE 
          WHEN u.role = 'worker' THEN (
            SELECT json_build_object(
              'location', ST_AsGeoJSON(wp.location)::json,
              'available', wp.available,
              'service_radius_km', wp.service_radius_km,
              'skills', (
                SELECT array_agg(s.name)
                FROM worker_skills ws
                JOIN skills s ON s.id = ws.skill_id
                WHERE ws.worker_id = u.id
              ),
              'services', (
                SELECT array_agg(json_build_object(
                  'id', srv.id,
                  'name_en', srv.name_en,
                  'name_sw', srv.name_sw,
                  'icon', srv.icon
                ))
                FROM worker_services wsrv
                JOIN services srv ON srv.id = wsrv.service_id
                WHERE wsrv.worker_id = u.id
              )
            )
            FROM worker_profiles wp
            WHERE wp.user_id = u.id
          )
          ELSE NULL
        END as worker_profile,
        (
          SELECT json_build_object(
            'total_jobs', COUNT(j.id),
            'completed_jobs', COUNT(j.id) FILTER (WHERE j.status = 'completed'),
            'active_jobs', COUNT(j.id) FILTER (WHERE j.status = 'in_progress'),
            'total_spent', COALESCE(SUM(j.budget) FILTER (WHERE j.status = 'completed'), 0)
          )
          FROM jobs j
          WHERE j.client_id = u.id
        ) as client_stats
      FROM users u
      WHERE u.id = $1`;

    const result = await client.query(userQuery, [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const user = result.rows[0];

    // Remove sensitive information
    const { password_hash, ...safeUser } = user;

    // Format response
    const formattedUser = {
      ...safeUser,
      worker_profile: user.worker_profile || null,
      client_stats: user.client_stats || {
        total_jobs: 0,
        completed_jobs: 0,
        active_jobs: 0,
        total_spent: 0
      }
    };

    res.json({
      success: true,
      user: formattedUser
    });

  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user details',
      error: error.message
    });
  }
});

// Get all users endpoint
app.get('/api/users', async (req, res) => {
  try {
    const usersQuery = `
      SELECT 
        id,
        full_name,
        email,
        phone_number,
        role,
        is_verified,
        created_at,
        last_active
      FROM users
      ORDER BY created_at DESC`;

    const result = await client.query(usersQuery);

    const users = result.rows.map(user => ({
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      phone_number: user.phone_number,
      role: user.role,
      is_verified: user.is_verified,
      created_at: user.created_at,
      last_active: user.last_active
    }));

    res.json({
      success: true,
      count: users.length,
      users
    });

  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message
    });
  }
});

app.post('/api/jobs/:jobId/apply', /* verifyToken */ async (req, res) => {
  try {
    const { jobId } = req.params;
    const { cover_letter, worker_id, portfolio_url, resume_url } = req.body;

    // Validate input
    if (!cover_letter || !worker_id) {
      return res.status(400).json({
        success: false,
        message: 'Description and worker ID are required'
      });
    }

    console.log('Received application data:', req.body);
    // Insert application into database
    const applicationQuery = `
      INSERT INTO job_applications (
        job_id,
        applicant_id,
        cover_letter,
        resume_url,
        portfolio_url,
        status,
        submitted_at
      )
      VALUES ($1, $2, $3, $4, $5, 'pending', CURRENT_TIMESTAMP)
      RETURNING id, job_id, applicant_id, cover_letter, resume_url, portfolio_url, status`;

    const result = await client.query(applicationQuery, [jobId, worker_id, cover_letter, resume_url || '', portfolio_url || '']);

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      application: result.rows[0]
    });

  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting application',
      error: error.message
    });
  }
})

//All applications for a job
app.get('/api/jobs/:jobId/applications', async (req, res) => {
  try {
    const { jobId } = req.params;

    const applicationsQuery = `
      SELECT 
        ja.id,
        ja.cover_letter,
        ja.resume_url,
        ja.portfolio_url,
        ja.status,
        ja.submitted_at,
        u.id as applicant_id,
        u.full_name as applicant_name,
        u.email as applicant_email
      FROM job_applications ja
      JOIN users u ON ja.applicant_id = u.id
      WHERE ja.job_id = $1
      ORDER BY ja.submitted_at DESC`;

    const result = await client.query(applicationsQuery, [jobId]);

    const applications = result.rows.map(app => ({
      id: app.id,
      cover_letter: app.cover_letter,
      resume_url: app.resume_url,
      portfolio_url: app.portfolio_url,
      status: app.status,
      submitted_at: app.submitted_at,
      applicant: {
        id: app.applicant_id,
        name: app.applicant_name,
        email: app.applicant_email
      }
    }));

    res.json({
      success: true,
      count: applications.length,
      applications
    });

  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching job applications',
      error: error.message
    });
  }
});

// Start server
const PORT = 2000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// -- Connect as postgres user first
// GRANT ALL PRIVILEGES ON DATABASE kazi_kitaa TO karim;
// GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO karim;
// GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO karim;
// GRANT USAGE ON SCHEMA public TO karim;