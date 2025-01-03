/** @format */
import { Request, Response } from "express";
import updateById from "../../lib/subjects/updateById";
import findById from "../../lib/subjects/findById";
import notFound from "../../utils/notFound";
import badRequest from "@utils/badRequest";
import { idParamSchema, updateSubjectSchema } from "@schemas/zod-schema";

const updateByCodeController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { code, name, theoryFailed, practicalFailed } = req.body;
        if (!id) return badRequest(res, "Id is required");

        // validate request params using Zod
        const parsedParams = idParamSchema.safeParse(id);
        if (!parsedParams.success) {
            return badRequest(res, parsedParams.error.issues[0].message);
        }

        // validate request body using Zod
        const parsedBody = updateSubjectSchema.safeParse(req.body);
        if (!parsedBody.success) {
            return badRequest(res, parsedBody.error.issues[0].message);
        }

        const updateData = {
            ...(code && { code }),
            ...(name && { name }),
            ...(theoryFailed && { theoryFailed }),
            ...(practicalFailed && { practicalFailed }),
        };

        //TODO: check : what is updateData?

        if (Object.keys(updateData).length === 0)
            return badRequest(res, "No data to update");

        const subject = await findById(id);
        if (!subject) notFound(res, "Subject not found");

        const updatedSubject = await updateById(id, updateData);

        //TODO: remove duplicate rolls

        return res.status(200).json({
            message: "Subject updated successfully",
            data: updatedSubject,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export default updateByCodeController;
