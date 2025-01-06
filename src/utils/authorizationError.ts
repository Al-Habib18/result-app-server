/** @format */

import { Response } from "express";

const authorizationError = (res: Response, message: string) => {
    return res.status(401).json({
        code: 401,
        error: "Unauthorized",
        message: message || "Unauthorized",
    });
};

export default authorizationError;
