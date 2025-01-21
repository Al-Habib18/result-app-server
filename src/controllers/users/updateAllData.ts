/** @format */

import { Request, Response } from "express";

import updateAllData from "@lib/users/updateAllDatabyId";
import badRequest from "@utils/badRequest";
import notFound from "@utils/notFound";
import { updateUserAllDataSchema } from "@schemas/zod-schema";
import findByEmail from "@lib/users/findByEmail";
import findByPhone from "@lib/users/findByPhone";

const userUpdateAllDataController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { email, phone, name, role, verified, status } = req.body;
        // validate request params using Zod
        const parsedParams = updateUserAllDataSchema.safeParse({
            id,
            email,
            phone,
            name,
            role,
            verified,
            status,
        });

        if (!parsedParams.success) {
            return badRequest(res, parsedParams.error.issues[0].message);
        }

        if (!id) return badRequest(res, "Id is required");

        if (Object.keys(req.body).length === 0)
            return badRequest(res, "No data to update");

        const user = await findByEmail(email);
        if (user && user.email !== email)
            return badRequest(res, "Email already exists");

        const userPhone = await findByPhone(phone);
        if (userPhone && userPhone.phone !== phone)
            return badRequest(res, "Phone already exists");

        const updatedUser = await updateAllData(id, {
            name,
            email,
            phone,
            role,
            verified,
            status,
        });
        if (!updatedUser) return notFound(res); // User not found
        return res.status(200).json({
            message: "User updated successfully",
            data: updatedUser,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

export default userUpdateAllDataController;
