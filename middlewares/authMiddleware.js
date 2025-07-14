import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';
import User from '../models/userModel.js';

export const authorize = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new Error('Not authorized to access this route', 401));
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        req.user = await User.findById(decoded.userId).select('-password');

        if (!req.user) {
            return next(new Error('No user found with this id', 401));
        }

        next();
    } catch (error) {
        return next(new Error('Not authorized to access this route', 401));
    }
};
