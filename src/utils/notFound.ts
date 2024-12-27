/** @format */
import { Response } from "express";

function notFound(res: Response, message = "Resource") {
    res.status(404).json({
        code: 404,
        message: message,
        error: `Not Found Error`,
    });
}

export default notFound;
