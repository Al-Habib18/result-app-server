/** @format */
/* import { Request, Response, NextFunction } from "express";
import authenticationError from "@utils/authenticationError";
const authorize =
    (roles = ["ADMIN"]) =>
    (req: Request, res: Response, next: NextFunction) => {
        if (roles.includes(req.user.role)) {
            return next();
        }
        return authenticationError(res, "Unauthorized");
    };

export default authorize; */
