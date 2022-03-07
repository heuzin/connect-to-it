import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IUserDocument } from '../models/User';

declare global {
    namespace Express {
        interface Request {
            user: (IUserDocument & { _id: any }) | null; //or can be anythin
        }
    }
}

export default function(req: Request, res: Response, next: NextFunction) {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.jwtSecret!);

        req.user = (decoded as jwt.JwtPayload).user;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
}
