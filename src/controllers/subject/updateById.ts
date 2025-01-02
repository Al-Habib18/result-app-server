/** @format */
import { Request, Response } from "express";
import updateById from "../../lib/subjects/updateById";
import findById from "../../lib/subjects/findById";
import notFound from "../../utils/notFound";
import badRequest from "@utils/badRequest";

const updateByCodeController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { code, name, theoryFailed, practicalFailed } = req.body;

        //TODO: validate request body and Id using Zod
        if (!id) return badRequest(res, "Id is required");

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

        return res.json({
            message: "Subject updated successfully",
            data: updatedSubject,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export default updateByCodeController;
