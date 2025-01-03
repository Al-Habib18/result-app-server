/** @format */

import { Request, Response } from "express";
import { updateById } from "@lib/users";
import badRequest from "@utils/badRequest";
import notFound from "@utils/notFound";
import { idParamSchema, updateUserSchema } from "@schemas/zod-schema";
import findByEmail from "@lib/users/findByEmail";
import findByPhone from "@lib/users/findByPhone";

const userUpdateByIdController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // validate request params using Zod
        const parsedParams = idParamSchema.safeParse(id);
        if (!parsedParams.success) {
            return badRequest(res, parsedParams.error.issues[0].message);
        }
        if (!id) return badRequest(res, "Id is required");

        // validate request body using Zod
        const parsedBody = updateUserSchema.safeParse(req.body);
        if (!parsedBody.success) {
            return badRequest(res, parsedBody.error.issues[0].message);
        }

        if (Object.keys(req.body).length === 0)
            return badRequest(res, "No data to update");

        // check duplication of email and phone
        const isExistsEmail = await findByEmail(req.body.email);
        if (isExistsEmail) return badRequest(res, "Email already exists");

        const isExistsPhone = await findByPhone(req.body.phone);
        if (isExistsPhone) return badRequest(res, "Phone already exists");

        const user = await updateById(id, req.body);
        if (!user) return notFound(res, "User not found");

        return res.json({
            message: "User updated successfully",
            data: user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export default userUpdateByIdController;
