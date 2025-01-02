/** @format */
import { Request, Response } from "express";
import deleteById from "../../lib/subjects/deleteById";
import badRequest from "@utils/badRequest";
import notFound from "@utils/notFound";
import { idParamSchema } from "@schemas/zod-schema";
const deleteByIdController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        // validate request body using Zod
        const parsedParams = idParamSchema.safeParse(req.params);
        if (!parsedParams.success) {
            return badRequest(res, parsedParams.error.issues[0].message);
        }

        if (!id) return badRequest(res, "Id is required");

        const subject = await deleteById(id);
        if (!subject) return notFound(res, "Subject not found");

        return res.json({
            message: "Subject deleted successfully",
            data: subject,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export default deleteByIdController;
