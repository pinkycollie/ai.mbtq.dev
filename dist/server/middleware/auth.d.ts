import { Request, Response, NextFunction } from 'express';
export declare const authenticateToken: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export declare const verifyPassword: (password: string, hash: string) => Promise<boolean>;
export declare const hashPassword: (password: string) => Promise<string>;
