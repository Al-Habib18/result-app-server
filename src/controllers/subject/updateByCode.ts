/** @format */
import { Request, Response } from "express";
import updateById from "../../lib/subjects/updateById";
import findByCode from "../../lib/subjects/findByCode";
import notFound from "@utils/notFound";
import badRequest from "@utils/badRequest";
import removeDuplicateRolls from "@lib/subjects/removeDuplicates";
const updateByCodeController = async (req: Request, res: Response) => {
    try {
        const { code } = req.params;
        const { name, theoryFailed, practicalFailed } = req.body;

        //TODO: validate request body and  using Zod
        if (!code) return badRequest(res, "Code is required");

        const updateData = {
            ...(name && { name }),
            ...(theoryFailed && { theoryFailed }),
            ...(practicalFailed && { practicalFailed }),
        };

        if (Object.keys(updateData).length === 0)
            return badRequest(res, "No data to update");

        const subject = await findByCode(code);
        if (!subject) return notFound(res, "Subject not found");

        const id = subject.id;

        // update subject
        await updateById(id, updateData);

        // remove duplicate rolls
        const updatedSubject = await removeDuplicateRolls(code);

        return res.json({
            message: "Subject updated successfully",
            data: updatedSubject,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export default updateByCodeController;
