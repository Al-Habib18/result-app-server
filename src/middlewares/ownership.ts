/** @format */

import { Request, Response, NextFunction } from "express";
import findById from "@lib/users/findByEmail";
import authorizationError from "@utils/authorizationError";
import authenticationError from "@utils/authenticationError";
import decodeToken from "@lib/refresh/decode";
import findByEmail from "@lib/users/findByEmail";
// import notFound from "@utils/notFound";

const checkOwnership = async (id: string, userId: string) => {
    const user = await findById(id);
    if (!user) return false;
    if (user.id === userId) return true;

    return false;
};
const ownership = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader)
            return authenticationError(res, "Authorization header missing");

        const token = authHeader.split(" ")[1];
        const decoded = decodeToken(token);

        if (!decoded) return authenticationError(res, "Invalid token");

        const user = await findByEmail(decoded.email);
        if (!user) return authenticationError(res, "User not found");

        const { id } = req.params;
        const userId = user.id;

        const isOwner = await checkOwnership(id, userId);

        if (isOwner) {
            return next();
        } else if (user.role === "ADMIN") {
            return next();
        } else {
            return authorizationError(
                res,
                "You cannot access other information"
            );
        }
    } catch (err) {
        console.error("Ownership middleware error:", err);
        return authenticationError(res, "Ownership failed");
    }
};

export default ownership;
