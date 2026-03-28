import { neon } from "@neondatabase/serverless";
// Allow build without DATABASE_URL (it will be required at runtime)
const databaseUrl = process.env.DATABASE_URL || '';
// Create a mock sql function for build time when DATABASE_URL is not set
const createSql = () => {
    if (!databaseUrl) {
        // Throw an error if database operations are attempted without DATABASE_URL
        return async (...args) => {
            throw new Error("DATABASE_URL is not set. Database operations are not possible. Please set the DATABASE_URL environment variable.");
        };
    }
    return neon(databaseUrl);
};
export const sql = createSql();
// Database helper functions
export async function createUser(id, email, name) {
    try {
        await sql `
      INSERT INTO users (id, email, name, created_at)
      VALUES (${id}, ${email}, ${name || null}, NOW())
      ON CONFLICT (id) DO NOTHING
    `;
        // Give welcome bonus
        await sql `
      INSERT INTO user_tokens (user_id, balance, created_at, updated_at)
      VALUES (${id}, 10, NOW(), NOW())
      ON CONFLICT (user_id) DO NOTHING
    `;
    }
    catch (error) {
        console.error("Error creating user:", error);
    }
}
export async function getUserTokens(userId) {
    try {
        const result = await sql `
      SELECT balance FROM user_tokens WHERE user_id = ${userId}
    `;
        return result[0]?.balance || 0;
    }
    catch (error) {
        console.error("Error getting user tokens:", error);
        return 0;
    }
}
export async function awardTokens(userId, type, amount) {
    try {
        // Update or insert user tokens
        await sql `
      INSERT INTO user_tokens (user_id, balance, created_at, updated_at)
      VALUES (${userId}, ${amount}, NOW(), NOW())
      ON CONFLICT (user_id)
      DO UPDATE SET
        balance = user_tokens.balance + ${amount},
        updated_at = NOW()
    `;
        // Log transaction
        await sql `
      INSERT INTO token_transactions (user_id, type, amount, created_at)
      VALUES (${userId}, ${type}, ${amount}, NOW())
    `;
    }
    catch (error) {
        console.error("Error awarding tokens:", error);
    }
}
export async function saveConversation(userId, sessionId, messages) {
    try {
        await sql `
      INSERT INTO conversations (user_id, session_id, messages, created_at)
      VALUES (${userId}, ${sessionId}, ${JSON.stringify(messages)}, NOW())
    `;
    }
    catch (error) {
        console.error("Error saving conversation:", error);
    }
}
export async function saveUpload(userId, filename, blobUrl, fileSize, uploadType) {
    try {
        const result = await sql `
      INSERT INTO sign_language_uploads (user_id, filename, blob_url, file_size, upload_type, status, created_at)
      VALUES (${userId}, ${filename}, ${blobUrl}, ${fileSize}, ${uploadType}, 'pending_review', NOW())
      RETURNING id
    `;
        return result[0]?.id;
    }
    catch (error) {
        console.error("Error saving upload:", error);
        return null;
    }
}
//# sourceMappingURL=db.js.map