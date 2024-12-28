/** @format */

import { Request, Response } from "express";
import addFailedRolls from "../../lib/subjects/addFailedRolls";
import badRequest from "@utils/badRequest";
import notFound from "@utils/notFound";
import findByCode from "@lib/subjects/findByCode";
const addRollsController = async (req: Request, res: Response) => {
    try {
        const { code } = req.params;
        const { theoryFailed = [], practicalFailed = [] } = req.body;
        //TODO: validate request params and body using Zod
        if (!code) return badRequest(res, "Code is required");

        const isExistsSubject = await findByCode(code);
        if (!isExistsSubject) return notFound(res, "Subject not found");

        const data = {
            code,
            theoryFailedRolls: theoryFailed,
            practicalFailedRolls: practicalFailed,
        };

        const updatedSubject = await addFailedRolls(data);

        return res.json({
            message: "Rolls added successfully",
            data: updatedSubject,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export default addRollsController;
