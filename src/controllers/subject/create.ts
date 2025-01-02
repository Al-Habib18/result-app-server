/** @format */
import { Request, Response } from "express";
import createSubject from "../../lib/subjects/create";
import badRequest from "@utils/badRequest";
import findByCode from "@lib/subjects/findByCode";
import removeDuplicateRolls from "@lib/subjects/removeDuplicates";

const createController = async (req: Request, res: Response) => {
    try {
        const {
            code,
            name = "",
            theoryFailed = [],
            practicalFailed = [],
        } = req.body;

        //TODO: validate request body using Zod

        if (!code) return badRequest(res, "Code is required");

        //check duplication
        const isExistsSubject = await findByCode(code);
        if (isExistsSubject) return badRequest(res, "Subject already exists");

        // create a new subject
        await createSubject({
            name,
            code,
            theoryFailed,
            practicalFailed,
        });

        //  remove dupliate rolls
        const subject = await removeDuplicateRolls(code);

        return res.status(200).json({
            message: "Subject Created successful",
            data: subject,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export default createController;
