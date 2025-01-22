/** @format */

import { Request, Response, NextFunction } from "express";
import authorizationError from "@utils/authorizationError";
import authenticationError from "@utils/authenticationError";
import decodeToken from "@lib/refresh/decode";
import findByEmail from "@lib/users/findByEmail";
// import notFound from "@utils/notFound";

const admin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader)
            return authenticationError(res, "Authorization header missing");

        const token = authHeader.split(" ")[1];
        const decoded = decodeToken(token);

        if (!decoded) return authenticationError(res, "Invalid token");

        const user = await findByEmail(decoded.email);
        if (!user) return authenticationError(res, "User not found");

        if (user.role === "ADMIN") {
            return next();
        } else {
            return authorizationError(res, "Unauthorized");
        }
    } catch (err) {
        console.error("Admin middleware error:", err);
        return authenticationError(res, "Authorization failed");
    }
};

export default admin;
