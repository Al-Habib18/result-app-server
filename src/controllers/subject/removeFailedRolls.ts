/** @format */

import { Request, Response } from "express";
// import addFailedRolls from "../../lib/subjects/addFailedRolls";
import badRequest from "@utils/badRequest";
import notFound from "@utils/notFound";
import removeFailedRolls from "@lib/subjects/removeFailedRolls";
import findByCode from "@lib/subjects/findByCode";
import { codeParamSchema, failedSchema } from "@schemas/zod-schema";
const removeRollsController = async (req: Request, res: Response) => {
    try {
        const { code } = req.params;
        const { theoryFailed = [], practicalFailed = [] } = req.body;

        if (!code) return badRequest(res, "Code is required");

        // validate request params  using Zod
        const parsedParams = codeParamSchema.safeParse(code);
        if (!parsedParams.success) {
            return badRequest(res, parsedParams.error.issues[0].message);
        }

        // validate request body using Zod
        const parsedBody = failedSchema.safeParse(req.body);
        if (!parsedBody.success) {
            return badRequest(res, parsedBody.error.issues[0].message);
        }

        const subject = await findByCode(code);
        if (!subject) return notFound(res, "Subject not found");

        const data = {
            code,
            theoryFailedRolls: theoryFailed,
            practicalFailedRolls: practicalFailed,
        };

        const updatedSubject = await removeFailedRolls(data);

        return res.status(200).json({
            message: "Rolls removed successfully",
            data: updatedSubject,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export default removeRollsController;
