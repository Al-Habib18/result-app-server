/** @format */

import { Request, Response } from "express";
import findById from "../../lib/subjects/findById";
import badRequest from "../../utils/badRequest";
import notFound from "../../utils/notFound";
import { idParamSchema } from "@schemas/zod-schema";

const findByIdController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        // validate request params using Zod
        const parsedParams = idParamSchema.safeParse(req.params);
        if (!parsedParams.success) {
            return badRequest(res, parsedParams.error.issues[0].message);
        }
        if (!id) return badRequest(res, "Id is required");

        const subject = await findById(id);
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

export default findByIdController;
