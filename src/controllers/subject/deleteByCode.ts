/** @format */
import { Request, Response } from "express";
import deleteById from "../../lib/subjects/deleteById";
import badRequest from "@utils/badRequest";
import notFound from "@utils/notFound";
import findByCode from "@lib/subjects/findByCode";
import { codeParamSchema } from "@schemas/zod-schema";
const deleteByCodeController = async (req: Request, res: Response) => {
    try {
        const { code } = req.params;

        // validate request params
        const parsedParams = codeParamSchema.safeParse(req.params);
        if (!parsedParams.success) {
            return badRequest(res, parsedParams.error.issues[0].message);
        }

        if (!code) return badRequest(res, "Id is required");

        const isExistsSubject = await findByCode(code);
        if (!isExistsSubject) return notFound(res, "Subject not found");

        const id = isExistsSubject.id;

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

export default deleteByCodeController;
