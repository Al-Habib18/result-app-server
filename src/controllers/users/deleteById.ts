/** @format */

import { Request, Response } from "express";
import { deleteById } from "../../lib/users";
import badRequest from "../../utils/badRequest";
import notFound from "../../utils/notFound";
import { idParamSchema } from "../../schemas/zod-schema";

const userDeleteByIdController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        // validate request params using Zod
        const parsedParams = idParamSchema.safeParse(id);
        if (!parsedParams.success) {
            return badRequest(res, parsedParams.error.issues[0].message);
        }
        if (!id) return badRequest(res, "Id is required");

        const user = await deleteById(id);
        if (!user) return notFound(res, "User not found");

        // delete user
        await deleteById(id);

        return res.json({
            message: "User deleted successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export default userDeleteByIdController;
