/** @format */

import findByCode from "@lib/subjects/findByCode";
import { Request, Response } from "express";
import notFound from "../../utils/notFound";
import badRequest from "../../utils/badRequest";

const findByCodeController = async (req: Request, res: Response) => {
    try {
        const { code } = req.params;
        //TODO: validate request body using Zod
        if (!code) return badRequest(res, "Code is required");

        const subject = await findByCode(code);
        if (!subject) return notFound(res, "Subject not found");

        return res.json({
            message: "Subject retrived successfully",
            data: subject,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export default findByCodeController;
