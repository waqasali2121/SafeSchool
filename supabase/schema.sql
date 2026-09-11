-- ==============================================================================
-- SafeAI School – Database Schema & Initial Data
-- "Every Girl Safe. Every Parent Connected. Every Student Empowered."
-- ==============================================================================

-- 1. Enable Required Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS vector;

-- ==============================================================================
-- 2. Create Schema Tables (17 Tables)
-- ==============================================================================

-- 1. Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'teacher', 'parent', 'student')),
    phone_number VARCHAR(50),
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Classes table
CREATE TABLE IF NOT EXISTS classes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    grade_level INT NOT NULL,
    section VARCHAR(20) NOT NULL,
    room_number VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Subjects table
CREATE TABLE IF NOT EXISTS subjects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    code VARCHAR(50) NOT NULL,
    class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Teachers table
CREATE TABLE IF NOT EXISTS teachers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    employee_id VARCHAR(100) UNIQUE NOT NULL,
    department VARCHAR(100) NOT NULL,
    qualification VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Parents table
CREATE TABLE IF NOT EXISTS parents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    relationship VARCHAR(50) DEFAULT 'Father',
    address TEXT,
    emergency_phone VARCHAR(50) NOT NULL,
    whatsapp_enabled BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Students table
CREATE TABLE IF NOT EXISTS students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    roll_number VARCHAR(100) UNIQUE NOT NULL,
    class_id UUID REFERENCES classes(id) ON DELETE SET NULL,
    parent_id UUID REFERENCES parents(id) ON DELETE SET NULL,
    blood_group VARCHAR(10),
    rfid_card_id VARCHAR(100) UNIQUE,
    qr_code_token VARCHAR(255) UNIQUE,
    photo_url TEXT,
    is_inside_campus BOOLEAN DEFAULT false,
    last_safety_checkin TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Attendance table
CREATE TABLE IF NOT EXISTS attendance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    check_in TIMESTAMP WITH TIME ZONE,
    check_out TIMESTAMP WITH TIME ZONE,
    method VARCHAR(50) CHECK (method IN ('qr_scan', 'rfid_tap', 'manual', 'facial_ai')),
    status VARCHAR(50) DEFAULT 'present' CHECK (status IN ('present', 'late', 'absent', 'excused')),
    parent_notified_arrival BOOLEAN DEFAULT false,
    parent_notified_departure BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Homework table
CREATE TABLE IF NOT EXISTS homework (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    teacher_id UUID REFERENCES teachers(id) ON DELETE CASCADE,
    class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
    subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    due_date TIMESTAMP WITH TIME ZONE NOT NULL,
    attachment_urls TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. Assignments table
CREATE TABLE IF NOT EXISTS assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
    subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE,
    teacher_id UUID REFERENCES teachers(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    instructions TEXT NOT NULL,
    total_marks INT DEFAULT 100,
    difficulty VARCHAR(50) DEFAULT 'medium',
    due_date TIMESTAMP WITH TIME ZONE NOT NULL,
    generated_by_ai BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. Marks table
CREATE TABLE IF NOT EXISTS marks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE,
    exam_type VARCHAR(100) NOT NULL,
    obtained_marks NUMERIC(5,2) NOT NULL,
    total_marks NUMERIC(5,2) NOT NULL,
    grade VARCHAR(10),
    teacher_remarks TEXT,
    date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 11. Notifications table
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    recipient_id UUID REFERENCES users(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES users(id) ON DELETE SET NULL,
    category VARCHAR(50) CHECK (category IN ('attendance', 'homework', 'marks', 'emergency', 'announcements', 'ai_updates')),
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    read BOOLEAN DEFAULT false,
    channel VARCHAR(50) DEFAULT 'app' CHECK (channel IN ('app', 'sms', 'whatsapp', 'email')),
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 12. EmergencyContacts table
CREATE TABLE IF NOT EXISTS emergency_contacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    phone_number VARCHAR(50) NOT NULL,
    address TEXT,
    distance_km NUMERIC(4,2),
    latitude NUMERIC(9,6),
    longitude NUMERIC(9,6),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 13. Documents table (RAG Knowledge Base)
CREATE TABLE IF NOT EXISTS documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    filename VARCHAR(255) NOT NULL,
    file_type VARCHAR(20) NOT NULL,
    file_size_kb INT,
    subject VARCHAR(100),
    class_id UUID REFERENCES classes(id) ON DELETE SET NULL,
    uploader_id UUID REFERENCES users(id) ON DELETE SET NULL,
    status VARCHAR(50) DEFAULT 'indexed' CHECK (status IN ('processing', 'indexed', 'failed')),
    chunks_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 14. DocumentChunks table
CREATE TABLE IF NOT EXISTS document_chunks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
    chunk_index INT NOT NULL,
    content TEXT NOT NULL,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 15. Embeddings table (pgvector 768 dimensions)
CREATE TABLE IF NOT EXISTS embeddings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    chunk_id UUID UNIQUE REFERENCES document_chunks(id) ON DELETE CASCADE,
    embedding vector(768),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 16. ChatHistory table
CREATE TABLE IF NOT EXISTS chat_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    session_title VARCHAR(255) DEFAULT 'New Study Session',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 17. AIResponses table
CREATE TABLE IF NOT EXISTS ai_responses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    chat_session_id UUID REFERENCES chat_history(id) ON DELETE CASCADE,
    user_query TEXT NOT NULL,
    ai_response TEXT NOT NULL,
    source_documents JSONB,
    confidence_score NUMERIC(5,2),
    grounded_in_rag BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================================================
-- 3. Indexes & RAG Semantic Search RPC Function
-- ==============================================================================

CREATE INDEX IF NOT EXISTS embeddings_vector_idx ON embeddings 
USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

CREATE OR REPLACE FUNCTION match_documents (
  query_embedding vector(768),
  match_count int DEFAULT 5,
  similarity_threshold float DEFAULT 0.65
)
RETURNS TABLE (
  chunk_id UUID,
  document_title VARCHAR,
  content TEXT,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    dc.id AS chunk_id,
    d.title AS document_title,
    dc.content AS content,
    1 - (e.embedding <=> query_embedding) AS similarity
  FROM embeddings e
  JOIN document_chunks dc ON dc.id = e.chunk_id
  JOIN documents d ON d.id = dc.document_id
  WHERE 1 - (e.embedding <=> query_embedding) > similarity_threshold
  ORDER BY similarity DESC
  LIMIT match_count;
END;
$$;

-- ==============================================================================
-- 4. Initial Seed Data (Classes, Emergency Contacts, Sample Curriculum)
-- ==============================================================================

-- Classes
INSERT INTO classes (id, name, grade_level, section, room_number)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'Grade 10 - Lily', 10, 'A', 'Room 101'),
  ('22222222-2222-2222-2222-222222222222', 'Grade 10 - Jasmine', 10, 'B', 'Room 102'),
  ('33333333-3333-3333-3333-333333333333', 'Grade 9 - Rose', 9, 'A', 'Lab 3')
ON CONFLICT (id) DO NOTHING;

-- Emergency Contacts
INSERT INTO emergency_contacts (id, name, type, phone_number, address, distance_km, latitude, longitude)
VALUES
  ('44444444-4444-4444-4444-444444444441', 'Metropolitan Women & Girls Police Precinct', 'Police', '+1 (555) 911-2020', 'Civic Center Ave, Sector 4', 0.80, 33.7182, 73.0605),
  ('44444444-4444-4444-4444-444444444442', 'St. Jude Children & Maternity Trauma Center', 'Hospital', '+1 (555) 911-4040', '12 Medical Complex Road', 1.40, 33.7220, 73.0680),
  ('44444444-4444-4444-4444-444444444443', 'National Emergency Rescue 1122 Helpline', 'Helpline', '1122', 'Central Emergency Hotline', 2.10, 33.7140, 73.0520),
  ('44444444-4444-4444-4444-444444444444', 'SafeAI Campus Internal Security Desk', 'Security', '+1 (555) 723-3240', 'Main Gate Security Dispatch', 0.05, 33.7200, 73.0600)
ON CONFLICT (id) DO NOTHING;

-- Curriculum Document
INSERT INTO documents (id, title, filename, file_type, file_size_kb, subject, class_id, status, chunks_count)
VALUES
  ('55555555-5555-5555-5555-555555555551', 'Grade 10 Biology - Chapter 5: Photosynthesis & Respiration', 'Biology_Chapter_5_Photosynthesis.pdf', 'pdf', 3420, 'Biology & Life Sciences', '11111111-1111-1111-1111-111111111111', 'indexed', 2),
  ('55555555-5555-5555-5555-555555555552', 'SafeAI Campus Safety & Emergency Protocol 2026', 'SafeAI_Campus_Safety_Policy_2026.pdf', 'pdf', 1450, 'School Policies & Safety', '11111111-1111-1111-1111-111111111111', 'indexed', 2)
ON CONFLICT (id) DO NOTHING;

-- Document Chunks for RAG
INSERT INTO document_chunks (id, document_id, chunk_index, content, metadata)
VALUES
  ('66666666-6666-6666-6666-666666666661', '55555555-5555-5555-5555-555555555551', 1, 'Photosynthesis is the biological process by which green plants, algae, and cyanobacteria convert light energy from the Sun into chemical energy stored in glucose: 6CO2 + 6H2O + light -> C6H12O6 + 6O2. It takes place in chloroplasts across light-dependent thylakoid reactions and the stroma Calvin cycle.', '{"page": 42}'),
  ('66666666-6666-6666-6666-666666666662', '55555555-5555-5555-5555-555555555552', 1, 'SafeAI Campus Emergency SOS Protocol: Activating the red SOS Panic Button in the Student App automatically sends real-time GPS coordinates and SMS/Push notifications to parents, rings the Central Security Control Room, and alerts the nearest rapid response police precinct.', '{"page": 5}')
ON CONFLICT (id) DO NOTHING;
