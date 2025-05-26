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
    is_verified BOOLEAN DEFAULT FALSE
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
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID REFERENCES users(id) ON DELETE SET NULL,
    service_id INTEGER REFERENCES services(id),
    description TEXT,
    location GEOGRAPHY(POINT, 4326),
    scheduled_at TIMESTAMP,
    budget NUMERIC,
    status job_status DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

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

-- SPATIAL INDEXES
CREATE INDEX IF NOT EXISTS idx_worker_location ON worker_profiles USING GIST(location);
CREATE INDEX IF NOT EXISTS idx_job_location ON jobs USING GIST(location);
