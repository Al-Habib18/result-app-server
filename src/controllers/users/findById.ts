/** @format */

import { Request, Response } from "express";
import { findById } from "@lib/users";
import badRequest from "@utils/badRequest";
import notFound from "@utils/notFound";
import { idParamSchema } from "../../schemas/zod-schema";

const userFindByIdController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        // validate request params using Zod
        const parsedParams = idParamSchema.safeParse(id);
        if (!parsedParams.success) {
            return badRequest(res, parsedParams.error.issues[0].message);
        }
        if (!id) return badRequest(res, "Id is required");

        const user = await findById(id);
        if (!user) return notFound(res, "User not found");

        return res.status(200).json({
            message: "User retrived Successfully",
            data: user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export default userFindByIdController;
