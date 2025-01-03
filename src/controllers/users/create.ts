/** @format */

import { Request, Response } from "express";
import userCreate from "../../lib/users/create";
import { createUserSchema } from "@schemas/zod-schema";
import badRequest from "@utils/badRequest";
const userCreateController = async (req: Request, res: Response) => {
    try {
        const { name, email, phone, password, role } = req.body;
        //validate request body
        const parsedBody = createUserSchema.safeParse(req.body);
        if (!parsedBody.success) {
            return badRequest(res, parsedBody.error.issues[0].message);
        }

        //TODO: check dupliacton with email and phone
        //TODO: encrypt password

        const user = await userCreate({ name, email, phone, password, role });
        return res.json({ message: "User created successfully", data: user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export default userCreateController;
