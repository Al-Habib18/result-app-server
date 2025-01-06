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
        if (!req.headers.authorization)
            return authenticationError(res, "Authenticate failed");

        const token = req.headers.authorization.split(" ")[1];
        const decoded = decodeToken(token);
        if (!decoded) {
            return authenticationError(res, "Authenticate failed");
        }

        const user = await findByEmail(decoded.email);

        if (!user) {
            return authenticationError(res, "Authenticate failed");
        }

        //TODO: attach the user to the request
        // req.user = { user };
        // req.user = {
        //     ...user._doc,
        //     id: user.id,
        // };
        return next();
    } catch (err) {
        console.log(err);
        return authenticationError(
            res,
            "Authenticate failed in authenticate middleware"
        );
    }
};

export default authenticate;
