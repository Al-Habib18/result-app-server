/** @format */

import { Request, Response } from "express";
import addFailedRolls from "../../lib/subjects/addFailedRolls";
import badRequest from "@utils/badRequest";
import notFound from "@utils/notFound";
import findByCode from "@lib/subjects/findByCode";
import { codeParamSchema, failedSchema } from "@schemas/zod-schema";
const addRollsController = async (req: Request, res: Response) => {
    try {
        const { code } = req.params;
        const { theoryFailed = [], practicalFailed = [] } = req.body;

        //validate request params
        const parsedParams = codeParamSchema.safeParse(code);
        if (!parsedParams.success) {
            return badRequest(res, parsedParams.error.issues[0].message);
        }

        // validate request body
        const parsedBody = failedSchema.safeParse(req.body);
        if (!parsedBody.success) {
            return badRequest(res, parsedBody.error.issues[0].message);
        }

        if (!code) return badRequest(res, "Code is required");

        const isExistsSubject = await findByCode(code);
        if (!isExistsSubject) return notFound(res, "Subject not found");

        const data = {
            code,
            theoryFailedRolls: theoryFailed,
            practicalFailedRolls: practicalFailed,
        };

        const updatedSubject = await addFailedRolls(data);

        return res.status(200).json({
            message: "Rolls added successfully",
            data: updatedSubject,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export default addRollsController;
