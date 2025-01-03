/** @format */

import { Request, Response } from "express";
import userCreate from "../../lib/users/create";
import { createUserSchema } from "@schemas/zod-schema";
import badRequest from "@utils/badRequest";
import findByEmail from "@lib/users/findByEmail";
import findByPhone from "@lib/users/findByPhone";
const userCreateController = async (req: Request, res: Response) => {
    try {
        const { name, email, phone, password, role } = req.body;
        //validate request body
        const parsedBody = createUserSchema.safeParse(req.body);
        if (!parsedBody.success) {
            return badRequest(res, parsedBody.error.issues[0].message);
        }

        if (Object.keys(req.body).length === 0)
            return badRequest(res, "No data to create");

        // check dupliacton with email and phone
        const isExistsEmail = await findByEmail(email);
        if (isExistsEmail) return badRequest(res, "Email already exists");

        const isExistsPhone = await findByPhone(phone);
        if (isExistsPhone) return badRequest(res, "Phone already exists");

        //TODO: encrypt password

        const user = await userCreate({ name, email, phone, password, role });
        return res
            .status(201)
            .json({ message: "User created successfully", data: user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export default userCreateController;
