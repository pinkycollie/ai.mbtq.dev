-- Complete Database Schema for Sign Language AI Platform
-- Drop existing tables if they exist (for clean setup)
DROP TABLE IF EXISTS token_transactions CASCADE;
DROP TABLE IF EXISTS sign_language_uploads CASCADE;
DROP TABLE IF EXISTS conversations CASCADE;
DROP TABLE IF EXISTS user_tokens CASCADE;
DROP TABLE IF EXISTS user_sessions CASCADE;
DROP TABLE IF EXISTS verification_tokens CASCADE;
DROP TABLE IF EXISTS accounts CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS sign_language_datasets CASCADE;
DROP TABLE IF EXISTS user_achievements CASCADE;
DROP TABLE IF EXISTS content_validations CASCADE;
DROP TABLE IF EXISTS api_usage CASCADE;

-- Users table (compatible with NextAuth.js)
CREATE TABLE users (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name TEXT,
    email TEXT UNIQUE NOT NULL,
    email_verified TIMESTAMPTZ,
    image TEXT,
    role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'moderator')),
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'banned')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    last_login TIMESTAMPTZ,
    profile_completed BOOLEAN DEFAULT FALSE,
    bio TEXT,
    location TEXT,
    website TEXT,
    deaf_community_member BOOLEAN DEFAULT FALSE,
    preferred_sign_language TEXT DEFAULT 'ASL',
    accessibility_preferences JSONB DEFAULT '{}'::jsonb
);

-- Accounts table (for OAuth providers - NextAuth.js)
CREATE TABLE accounts (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    provider TEXT NOT NULL,
    provider_account_id TEXT NOT NULL,
    refresh_token TEXT,
    access_token TEXT,
    expires_at INTEGER,
    token_type TEXT,
    scope TEXT,
    id_token TEXT,
    session_state TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(provider, provider_account_id)
);

-- Sessions table (NextAuth.js)
CREATE TABLE sessions (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    session_token TEXT UNIQUE NOT NULL,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    expires TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Verification tokens table (NextAuth.js)
CREATE TABLE verification_tokens (
    identifier TEXT NOT NULL,
    token TEXT NOT NULL,
    expires TIMESTAMPTZ NOT NULL,
    PRIMARY KEY (identifier, token)
);

-- User tokens table (for blockchain rewards)
CREATE TABLE user_tokens (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE UNIQUE,
    balance INTEGER DEFAULT 0 CHECK (balance >= 0),
    total_earned INTEGER DEFAULT 0 CHECK (total_earned >= 0),
    total_spent INTEGER DEFAULT 0 CHECK (total_spent >= 0),
    level INTEGER DEFAULT 1 CHECK (level >= 1),
    experience_points INTEGER DEFAULT 0 CHECK (experience_points >= 0),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Token transactions table
CREATE TABLE token_transactions (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN (
        'welcome_bonus', 'chat_interaction', 'content_upload', 
        'content_validation', 'daily_login', 'achievement', 
        'referral_bonus', 'purchase', 'withdrawal'
    )),
    amount INTEGER NOT NULL,
    balance_after INTEGER NOT NULL,
    description TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    transaction_hash TEXT, -- for blockchain integration
    status TEXT DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed'))
);

-- Sign language uploads table
CREATE TABLE sign_language_uploads (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    filename TEXT NOT NULL,
    original_filename TEXT NOT NULL,
    blob_url TEXT NOT NULL,
    file_size BIGINT NOT NULL,
    file_type TEXT NOT NULL,
    upload_type TEXT NOT NULL CHECK (upload_type IN ('video', 'image', 'audio')),
    duration INTEGER, -- for videos in seconds
    resolution TEXT, -- e.g., "1920x1080"
    status TEXT DEFAULT 'pending_review' CHECK (status IN (
        'pending_review', 'approved', 'rejected', 'processing', 'archived'
    )),
    interpretation TEXT,
    confidence_score DECIMAL(3,2), -- AI confidence 0.00-1.00
    sign_language TEXT DEFAULT 'ASL',
    tags TEXT[] DEFAULT '{}',
    is_public BOOLEAN DEFAULT FALSE,
    download_count INTEGER DEFAULT 0,
    like_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    reviewed_at TIMESTAMPTZ,
    reviewed_by TEXT REFERENCES users(id),
    review_notes TEXT,
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Conversations table
CREATE TABLE conversations (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    session_id TEXT NOT NULL,
    title TEXT,
    messages JSONB NOT NULL DEFAULT '[]'::jsonb,
    message_count INTEGER DEFAULT 0,
    tokens_earned INTEGER DEFAULT 0,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'archived', 'deleted')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    last_message_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sign language datasets table
CREATE TABLE sign_language_datasets (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL CHECK (category IN (
        'general', 'medical', 'legal', 'financial', 'educational', 
        'emergency', 'business', 'technology', 'entertainment'
    )),
    sign_language TEXT NOT NULL DEFAULT 'ASL',
    total_signs INTEGER DEFAULT 0,
    contributor_count INTEGER DEFAULT 0,
    is_public BOOLEAN DEFAULT TRUE,
    created_by TEXT REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'::jsonb
);

-- User achievements table
CREATE TABLE user_achievements (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    achievement_type TEXT NOT NULL CHECK (achievement_type IN (
        'first_upload', 'first_chat', 'contributor', 'validator', 
        'early_adopter', 'community_helper', 'streak_master', 
        'quality_contributor', 'mentor', 'ambassador'
    )),
    title TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    tokens_awarded INTEGER DEFAULT 0,
    unlocked_at TIMESTAMPTZ DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'::jsonb,
    UNIQUE(user_id, achievement_type)
);

-- Content validations table
CREATE TABLE content_validations (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    upload_id TEXT NOT NULL REFERENCES sign_language_uploads(id) ON DELETE CASCADE,
    validator_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    validation_type TEXT NOT NULL CHECK (validation_type IN (
        'accuracy', 'quality', 'appropriateness', 'technical'
    )),
    score INTEGER CHECK (score BETWEEN 1 AND 5),
    feedback TEXT,
    is_approved BOOLEAN,
    tokens_earned INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(upload_id, validator_id, validation_type)
);

-- API usage tracking table
CREATE TABLE api_usage (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
    endpoint TEXT NOT NULL,
    method TEXT NOT NULL,
    status_code INTEGER NOT NULL,
    response_time_ms INTEGER,
    tokens_consumed INTEGER DEFAULT 0,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at);
CREATE INDEX idx_accounts_user_id ON accounts(user_id);
CREATE INDEX idx_sessions_user_id ON sessions(user_id);
CREATE INDEX idx_sessions_session_token ON sessions(session_token);
CREATE INDEX idx_user_tokens_user_id ON user_tokens(user_id);
CREATE INDEX idx_token_transactions_user_id ON token_transactions(user_id);
CREATE INDEX idx_token_transactions_created_at ON token_transactions(created_at);
CREATE INDEX idx_sign_language_uploads_user_id ON sign_language_uploads(user_id);
CREATE INDEX idx_sign_language_uploads_status ON sign_language_uploads(status);
CREATE INDEX idx_sign_language_uploads_created_at ON sign_language_uploads(created_at);
CREATE INDEX idx_conversations_user_id ON conversations(user_id);
CREATE INDEX idx_conversations_session_id ON conversations(session_id);
CREATE INDEX idx_user_achievements_user_id ON user_achievements(user_id);
CREATE INDEX idx_content_validations_upload_id ON content_validations(upload_id);
CREATE INDEX idx_api_usage_user_id ON api_usage(user_id);
CREATE INDEX idx_api_usage_created_at ON api_usage(created_at);

-- Functions and triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_accounts_updated_at BEFORE UPDATE ON accounts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_tokens_updated_at BEFORE UPDATE ON user_tokens
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_conversations_updated_at BEFORE UPDATE ON conversations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to award tokens
CREATE OR REPLACE FUNCTION award_user_tokens(
    p_user_id TEXT,
    p_type TEXT,
    p_amount INTEGER,
    p_description TEXT DEFAULT NULL
) RETURNS BOOLEAN AS $$
DECLARE
    current_balance INTEGER;
    new_balance INTEGER;
BEGIN
    -- Get current balance
    SELECT balance INTO current_balance 
    FROM user_tokens 
    WHERE user_id = p_user_id;
    
    -- If user doesn't have token record, create one
    IF current_balance IS NULL THEN
        INSERT INTO user_tokens (user_id, balance, total_earned)
        VALUES (p_user_id, p_amount, p_amount);
        current_balance = 0;
        new_balance = p_amount;
    ELSE
        -- Update existing balance
        new_balance = current_balance + p_amount;
        UPDATE user_tokens 
        SET balance = new_balance,
            total_earned = total_earned + p_amount,
            updated_at = NOW()
        WHERE user_id = p_user_id;
    END IF;
    
    -- Record transaction
    INSERT INTO token_transactions (user_id, type, amount, balance_after, description)
    VALUES (p_user_id, p_type, p_amount, new_balance, p_description);
    
    RETURN TRUE;
EXCEPTION
    WHEN OTHERS THEN
        RETURN FALSE;
END;
$$ LANGUAGE plpgsql;

-- Function to check and award achievements
CREATE OR REPLACE FUNCTION check_user_achievements(p_user_id TEXT) RETURNS VOID AS $$
DECLARE
    upload_count INTEGER;
    chat_count INTEGER;
    validation_count INTEGER;
BEGIN
    -- Count user activities
    SELECT COUNT(*) INTO upload_count FROM sign_language_uploads WHERE user_id = p_user_id;
    SELECT COUNT(*) INTO chat_count FROM conversations WHERE user_id = p_user_id;
    SELECT COUNT(*) INTO validation_count FROM content_validations WHERE validator_id = p_user_id;
    
    -- First upload achievement
    IF upload_count = 1 THEN
        INSERT INTO user_achievements (user_id, achievement_type, title, description, tokens_awarded)
        VALUES (p_user_id, 'first_upload', 'First Upload', 'Uploaded your first sign language content', 10)
        ON CONFLICT (user_id, achievement_type) DO NOTHING;
        
        PERFORM award_user_tokens(p_user_id, 'achievement', 10, 'First Upload Achievement');
    END IF;
    
    -- First chat achievement
    IF chat_count = 1 THEN
        INSERT INTO user_achievements (user_id, achievement_type, title, description, tokens_awarded)
        VALUES (p_user_id, 'first_chat', 'First Chat', 'Had your first conversation with PINKY AI', 5)
        ON CONFLICT (user_id, achievement_type) DO NOTHING;
        
        PERFORM award_user_tokens(p_user_id, 'achievement', 5, 'First Chat Achievement');
    END IF;
    
    -- Contributor achievement (10+ uploads)
    IF upload_count >= 10 THEN
        INSERT INTO user_achievements (user_id, achievement_type, title, description, tokens_awarded)
        VALUES (p_user_id, 'contributor', 'Active Contributor', 'Uploaded 10+ sign language contents', 50)
        ON CONFLICT (user_id, achievement_type) DO NOTHING;
        
        PERFORM award_user_tokens(p_user_id, 'achievement', 50, 'Active Contributor Achievement');
    END IF;
    
    -- Validator achievement (5+ validations)
    IF validation_count >= 5 THEN
        INSERT INTO user_achievements (user_id, achievement_type, title, description, tokens_awarded)
        VALUES (p_user_id, 'validator', 'Content Validator', 'Validated 5+ community contributions', 25)
        ON CONFLICT (user_id, achievement_type) DO NOTHING;
        
        PERFORM award_user_tokens(p_user_id, 'achievement', 25, 'Content Validator Achievement');
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Sample data for testing
INSERT INTO users (id, name, email, email_verified, role) VALUES 
('demo-user-1', 'Demo User', 'demo@signlanguageai.com', NOW(), 'user'),
('admin-user-1', 'Admin User', 'admin@signlanguageai.com', NOW(), 'admin')
ON CONFLICT (email) DO NOTHING;

-- Give demo users welcome tokens
SELECT award_user_tokens('demo-user-1', 'welcome_bonus', 25, 'Welcome to Sign Language AI!');
SELECT award_user_tokens('admin-user-1', 'welcome_bonus', 100, 'Admin Welcome Bonus');

-- Create sample dataset
INSERT INTO sign_language_datasets (name, description, category, sign_language, created_by) VALUES 
('Basic ASL Vocabulary', 'Essential American Sign Language signs for beginners', 'general', 'ASL', 'admin-user-1'),
('Medical ASL Terms', 'Sign language vocabulary for healthcare settings', 'medical', 'ASL', 'admin-user-1'),
('Financial ASL Signs', 'Banking and finance related sign language', 'financial', 'ASL', 'admin-user-1')
ON CONFLICT DO NOTHING;
