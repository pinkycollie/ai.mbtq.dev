export declare const sql: ((...args: any[]) => Promise<never>) | import("@neondatabase/serverless").NeonQueryFunction<false, false>;
export declare function createUser(id: string, email: string, name?: string): Promise<void>;
export declare function getUserTokens(userId: string): Promise<any>;
export declare function awardTokens(userId: string, type: string, amount: number): Promise<void>;
export declare function saveConversation(userId: string, sessionId: string, messages: any[]): Promise<void>;
export declare function saveUpload(userId: string, filename: string, blobUrl: string, fileSize: number, uploadType: string): Promise<any>;
