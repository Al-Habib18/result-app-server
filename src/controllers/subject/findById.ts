/** @format */

import { Request, Response } from "express";
import findById from "../../lib/subjects/findById";
import badRequest from "../../utils/badRequest";
import notFound from "../../utils/notFound";

const findByIdController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        //TODO: validate request body using Zod
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
