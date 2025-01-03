/** @format */

import findByCode from "@lib/subjects/findByCode";
import { Request, Response } from "express";
import notFound from "../../utils/notFound";
import badRequest from "../../utils/badRequest";
import { codeParamSchema } from "@schemas/zod-schema";

const findByCodeController = async (req: Request, res: Response) => {
    try {
        const { code } = req.params;

        // validate code using Zod
        const parsedParams = codeParamSchema.safeParse(code);
        if (!parsedParams.success) {
            return badRequest(res, parsedParams.error.issues[0].message);
        }

        if (!code) return badRequest(res, "Code is required");

        const subject = await findByCode(code);
        if (!subject) return notFound(res, "Subject not found");

        return res.status(200).json({
            message: "Subject retrived successfully",
            data: subject,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export default findByCodeController;
