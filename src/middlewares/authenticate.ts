/** @format */

import { NextFunction, Request, Response } from "express";
import decodeToken from "@lib/refresh/decode";
import findByEmail from "@lib/users/findByEmail";
import authenticationError from "@utils/authenticationError";

const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader)
            return authenticationError(res, "Authorization header missing");

        const token = authHeader.split(" ")[1];
        const decoded = decodeToken(token);

        if (!decoded) return authenticationError(res, "Invalid token");

        const user = await findByEmail(decoded.email);
        if (!user) return authenticationError(res, "User not found");

        //TODO: req.user = user; // Attach user to the request
        console.log("Authentication successful:", user.email);

        return next();
    } catch (err) {
        console.error("Authentication middleware error:", err);
        return authenticationError(res, "Authentication failed");
    }
};

export default authenticate;
