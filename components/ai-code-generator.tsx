"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Loader2, Code, Wand2 } from "lucide-react"
import { CodeEditor } from "@/components/code-editor"

export function AICodeGenerator() {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedCode, setGeneratedCode] = useState("")
  const [language, setLanguage] = useState<"typescript" | "python" | "sql">("typescript")

  const examplePrompts = {
    typescript: [
      "Create a React component for a user profile card",
      "Write a Next.js API route for user authentication",
      "Create a custom hook for fetching data with SWR",
    ],
    python: [
      "Create a FastAPI endpoint for user registration",
      "Write a function to process CSV data with pandas",
      "Create a SQLAlchemy model for a blog post",
    ],
    sql: [
      "Create a table for storing user profiles",
      "Write a query to find the top 10 products by sales",
      "Create a stored procedure for user registration",
    ],
  }

  const handleExampleClick = (example: string) => {
    setPrompt(example)
  }

  const generateCode = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)

    try {
      // Instead of using setTimeout which might cause issues,
      // let's directly set the generated code based on the language

      // Sample generated code based on language
      let code = ""

      if (language === "typescript") {
        code = `import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface UserProfileProps {
  userId: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
}

export function UserProfile({ userId }: UserProfileProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        setIsLoading(true);
        const response = await fetch(\`/api/users/\${userId}\`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        
        const data = await response.json();
        setUser(data.user);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    }

    fetchUser();
  }, [userId]);

  if (isLoading) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-24 h-24 rounded-full bg-gray-200 animate-pulse" />
            <div className="w-48 h-6 bg-gray-200 animate-pulse rounded" />
            <div className="w-32 h-4 bg-gray-200 animate-pulse rounded" />
            <div className="w-full h-16 bg-gray-200 animate-pulse rounded" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-md mx-auto border-red-200">
        <CardContent className="pt-6">
          <div className="text-center text-red-500">
            <p>Error: {error}</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!user) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="pt-6">
          <div className="text-center">
            <p>User not found</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium text-center">User Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="w-24 h-24">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
          {user.bio && (
            <div className="w-full">
              <h3 className="text-sm font-medium mb-2">Bio</h3>
              <p className="text-sm text-gray-600">{user.bio}</p>
            </div>
          )}
          <div className="flex space-x-2 pt-4">
            <Button variant="outline" size="sm">
              Edit Profile
            </Button>
            <Button size="sm">
              Contact
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}`
      } else if (language === "python") {
        code = `from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session

from .database import get_db
from .models import User as UserModel

# Pydantic models
class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8)
    full_name: str
    
class UserResponse(BaseModel):
    id: int
    email: EmailStr
    full_name: str
    created_at: datetime
    
    class Config:
        orm_mode = True

# Security
SECRET_KEY = "your-secret-key"  # In production, use environment variable
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# API Endpoint
app = FastAPI()

@app.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register_user(user: UserCreate, db: Session = Depends(get_db)):
    # Check if user already exists
    db_user = db.query(UserModel).filter(UserModel.email == user.email).first()
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create new user
    hashed_password = get_password_hash(user.password)
    db_user = UserModel(
        email=user.email,
        hashed_password=hashed_password,
        full_name=user.full_name
    )
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    return db_user`
      } else {
        code = `-- Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    bio TEXT,
    avatar_url VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create profiles table with one-to-one relationship to users
CREATE TABLE profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    website VARCHAR(255),
    location VARCHAR(255),
    date_of_birth DATE,
    phone_number VARCHAR(50),
    social_links JSONB,
    preferences JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create posts table for user content
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    is_published BOOLEAN DEFAULT FALSE,
    view_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster queries
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_users_email ON users(email);

-- Create stored procedure for user registration
CREATE OR REPLACE FUNCTION register_user(
    p_email VARCHAR(255),
    p_password VARCHAR(255),
    p_full_name VARCHAR(255)
) RETURNS INTEGER AS $$
DECLARE
    new_user_id INTEGER;
BEGIN
    -- Check if email already exists
    IF EXISTS (SELECT 1 FROM users WHERE email = p_email) THEN
        RAISE EXCEPTION 'Email already registered';
    END IF;
    
    -- Insert new user
    INSERT INTO users (email, password_hash, full_name)
    VALUES (p_email, p_password, p_full_name)
    RETURNING id INTO new_user_id;
    
    -- Create empty profile
    INSERT INTO profiles (user_id)
    VALUES (new_user_id);
    
    RETURN new_user_id;
END;
$$ LANGUAGE plpgsql;`
      }

      // Set the generated code directly
      setGeneratedCode(code)
    } catch (error: any) {
      console.error("Error generating code:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Code className="h-5 w-5 mr-2 text-primary" />
          AI Code Generator
        </CardTitle>
        <CardDescription>Describe what code you need and let AI generate it for you</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue="typescript"
          value={language}
          onValueChange={(value) => setLanguage(value as any)}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="typescript">TypeScript</TabsTrigger>
            <TabsTrigger value="python">Python</TabsTrigger>
            <TabsTrigger value="sql">SQL</TabsTrigger>
          </TabsList>
          <div className="mt-6 space-y-4">
            <div className="space-y-4">
              <Textarea
                placeholder={`Describe the ${language} code you want to generate...`}
                className="min-h-[100px] text-base"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <div>
                <p className="text-sm text-muted-foreground mb-2">Try one of these examples:</p>
                <div className="flex flex-wrap gap-2">
                  {examplePrompts[language].map((example, index) => (
                    <Button key={index} variant="outline" size="sm" onClick={() => handleExampleClick(example)}>
                      {example}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {generatedCode && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium">Generated Code</h3>
                  <Badge variant="outline">
                    {language === "typescript" ? "TypeScript" : language === "python" ? "Python" : "SQL"}
                  </Badge>
                </div>
                <CodeEditor defaultLanguage={language} defaultValue={generatedCode} height="400px" />
              </div>
            )}
          </div>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-6">
        <Button variant="outline" disabled={isGenerating}>
          Clear
        </Button>
        <Button onClick={generateCode} disabled={!prompt.trim() || isGenerating}>
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Wand2 className="mr-2 h-4 w-4" />
              Generate Code
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
