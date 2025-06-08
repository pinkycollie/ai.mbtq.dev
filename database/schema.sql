-- Neon PostgreSQL Schema for Sign Language AI Platform

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    avatar_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User tokens table for blockchain rewards
CREATE TABLE IF NOT EXISTS user_tokens (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) REFERENCES users(id) NOT NULL UNIQUE,
    balance INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Token transactions table
CREATE TABLE IF NOT EXISTS token_transactions (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) REFERENCES users(id) NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'chat_interaction', 'content_upload', 'validation', etc.
    amount INTEGER NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sign language uploads table
CREATE TABLE IF NOT EXISTS sign_language_uploads (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) REFERENCES users(id) NOT NULL,
    filename VARCHAR(255) NOT NULL,
    blob_url TEXT NOT NULL,
    file_size BIGINT,
    upload_type VARCHAR(20) NOT NULL, -- 'video', 'image'
    status VARCHAR(20) DEFAULT 'pending_review', -- 'pending_review', 'approved', 'rejected'
    interpretation TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reviewed_at TIMESTAMP,
    reviewed_by VARCHAR(255) REFERENCES users(id)
);

-- Conversations table
CREATE TABLE IF NOT EXISTS conversations (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) REFERENCES users(id) NOT NULL,
    session_id VARCHAR(255) NOT NULL,
    messages JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_tokens_user_id ON user_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_token_transactions_user_id ON token_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_sign_language_uploads_user_id ON sign_language_uploads(user_id);
CREATE INDEX IF NOT EXISTS idx_conversations_user_id ON conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_conversations_session_id ON conversations(session_id);

-- Sample data for testing
INSERT INTO users (id, email, name) VALUES 
('demo123', 'demo@signlanguageai.com', 'Demo User')
ON CONFLICT (id) DO NOTHING;

INSERT INTO user_tokens (user_id, balance) VALUES 
('demo123', 25)
ON CONFLICT (user_id) DO NOTHING;
