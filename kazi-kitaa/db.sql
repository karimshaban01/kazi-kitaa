-- Enable PostGIS Extension
CREATE EXTENSION IF NOT EXISTS postgis;

-- ENUMs
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE user_role AS ENUM ('client', 'worker', 'admin');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'job_status') THEN
        CREATE TYPE job_status AS ENUM ('pending', 'booked', 'in_progress', 'completed', 'cancelled');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'booking_status') THEN
        CREATE TYPE booking_status AS ENUM ('pending', 'accepted', 'rejected', 'cancelled', 'completed');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'weekday_enum') THEN
        CREATE TYPE weekday_enum AS ENUM ('Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun');
    END IF;
END $$;

-- USERS
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone_number VARCHAR(20) NOT NULL UNIQUE,
    password_hash TEXT,
    full_name VARCHAR(100) NOT NULL,
    role user_role NOT NULL,
    language VARCHAR(2) DEFAULT 'en',
    profile_photo TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_active TIMESTAMP,
    is_verified BOOLEAN DEFAULT FALSE,
    email VARCHAR(255) UNIQUE
);

-- WORKER PROFILES
CREATE TABLE IF NOT EXISTS worker_profiles (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    bio TEXT,
    hourly_rate NUMERIC,
    experience_years INTEGER,
    location GEOGRAPHY(POINT, 4326),
    service_radius_km INTEGER DEFAULT 5,
    available BOOLEAN DEFAULT TRUE
);

-- SERVICES
CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    name_en VARCHAR(100) NOT NULL,
    name_sw VARCHAR(100) NOT NULL,
    icon TEXT
);

-- WORKER ⇄ SERVICES
CREATE TABLE IF NOT EXISTS worker_services (
    worker_id UUID REFERENCES users(id) ON DELETE CASCADE,
    service_id INTEGER REFERENCES services(id) ON DELETE CASCADE,
    PRIMARY KEY(worker_id, service_id)
);

-- JOBS
CREATE TABLE IF NOT EXISTS jobs (
    -- Primary key
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- User input fields from form
    service_id INTEGER REFERENCES services(id) ON DELETE RESTRICT,
    description TEXT NOT NULL,
    location GEOGRAPHY(POINT, 4326) NOT NULL,
    scheduled_at TIMESTAMP NOT NULL,
    budget DECIMAL(10,2) NOT NULL CHECK (budget >= 0),
    duration INTEGER NOT NULL CHECK (duration > 0),
    
    -- System fields
    client_id UUID REFERENCES users(id) ON DELETE SET NULL,
    status job_status DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    views_count INTEGER DEFAULT 0,
    applications_count INTEGER DEFAULT 0
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_jobs_service ON jobs(service_id);
CREATE INDEX IF NOT EXISTS idx_jobs_scheduled_at ON jobs(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);
CREATE INDEX IF NOT EXISTS idx_jobs_location ON jobs USING GIST(location);

-- BOOKINGS
CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
    worker_id UUID REFERENCES users(id) ON DELETE CASCADE,
    accepted_at TIMESTAMP,
    completed_at TIMESTAMP,
    status booking_status DEFAULT 'pending'
);

-- AVAILABILITY
CREATE TABLE IF NOT EXISTS availability (
    id SERIAL PRIMARY KEY,
    worker_id UUID REFERENCES users(id) ON DELETE CASCADE,
    weekday weekday_enum NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL
);

-- RATINGS
CREATE TABLE IF NOT EXISTS ratings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    from_user UUID REFERENCES users(id) ON DELETE CASCADE,
    to_user UUID REFERENCES users(id) ON DELETE CASCADE,
    job_id UUID REFERENCES jobs(id) ON DELETE SET NULL,
    rating INTEGER CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- MESSAGES (Optional Chat Table)
CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
    receiver_id UUID REFERENCES users(id) ON DELETE CASCADE,
    job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- NOTIFICATIONS
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    type TEXT,
    content TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ADMINS
CREATE TABLE IF NOT EXISTS admins (
    id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    permissions JSONB
);

-- SKILLS
CREATE TABLE IF NOT EXISTS skills (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- WORKER ⇄ SKILLS
CREATE TABLE IF NOT EXISTS worker_skills (
    worker_id UUID REFERENCES users(id) ON DELETE CASCADE,
    skill_id INTEGER REFERENCES skills(id) ON DELETE CASCADE,
    PRIMARY KEY(worker_id, skill_id)
);

-- SPATIAL INDEXES
CREATE INDEX IF NOT EXISTS idx_worker_location ON worker_profiles USING GIST(location);
CREATE INDEX IF NOT EXISTS idx_job_location ON jobs USING GIST(location);

-- Insert sample data
-- 1. Insert user
INSERT INTO users (
    full_name,
    email,
    phone_number,
    password_hash,
    role,
    is_verified,
    created_at,
    last_active
) VALUES (
    'karim shaban haruna',
    'karimxhaban@gmail.com',
    '0785817222',
    'Karimshaban@01', -- In production, use proper password hashing
    'worker',
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);

-- 2. Insert worker profile with location
WITH new_user AS (
    SELECT id FROM users WHERE email = 'karimxhaban@gmail.com'
)
INSERT INTO worker_profiles (
    user_id,
    location,
    available,
    service_radius_km
)
SELECT 
    id,
    ST_SetSRID(ST_MakePoint(1, 1), 4326)::geography,
    true,
    5
FROM new_user;

-- 3. Insert IT service if not exists
INSERT INTO services (name_en, name_sw, icon)
VALUES ('IT Services', 'Huduma za IT', 'it-icon')
ON CONFLICT (name_en) DO NOTHING;

-- 4. Link worker to service
WITH new_user AS (
    SELECT id FROM users WHERE email = 'karimxhaban@gmail.com'
),
it_service AS (
    SELECT id FROM services WHERE name_en = 'IT Services'
)
INSERT INTO worker_services (worker_id, service_id)
SELECT new_user.id, it_service.id
FROM new_user, it_service;

-- 5. Insert skill
INSERT INTO skills (name)
VALUES ('software')
ON CONFLICT (name) DO NOTHING;

-- 6. Link worker to skill
WITH new_user AS (
    SELECT id FROM users WHERE email = 'karimxhaban@gmail.com'
),
software_skill AS (
    SELECT id FROM skills WHERE name = 'software'
)
INSERT INTO worker_skills (worker_id, skill_id)
SELECT new_user.id, software_skill.id
FROM new_user, software_skill
ON CONFLICT (worker_id, skill_id) DO NOTHING;

-- Sample insert statement for testing
INSERT INTO jobs (
    service_id,
    description,
    location,
    scheduled_at,
    budget,
    duration,
    client_id
) VALUES (
    4,
    'test',
    ST_SetSRID(ST_GeomFromText('POINT(1 1)'), 4326)::geography,
    '2025-05-28T21:00:00.000Z',
    100000,
    72,
    (SELECT id FROM users WHERE role = 'client' LIMIT 1)
);

INSERT INTO services (id, name_en, name_sw, icon) VALUES 
    (1, 'IT & Software', 'Teknolojia', 'computer'),
    (2, 'Sales & Marketing', 'Uuzaji', 'chart-line'),
    (3, 'Education', 'Elimu', 'graduation-cap'),
    (4, 'Healthcare', 'Afya', 'medkit'),
    (5, 'Construction', 'Ujenzi', 'hard-hat'),
    (6, 'Hospitality', 'Ukarimu', 'hotel')
ON CONFLICT (id) DO UPDATE 
    SET name_en = EXCLUDED.name_en,
        name_sw = EXCLUDED.name_sw,
        icon = EXCLUDED.icon;
