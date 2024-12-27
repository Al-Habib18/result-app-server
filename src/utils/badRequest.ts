/** @format */

import { Response } from "express";

function badRequest(res: Response, message = "Bad Request") {
    res.status(400).json({
        code: 400,
        error: "Bad Request",
        message: message,
    });
}

export default badRequest;
