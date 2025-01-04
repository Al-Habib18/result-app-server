/** @format */

import { Request, Response } from "express";

import userCreate from "@lib/users/create";
import findByEmail from "@lib/users/findByEmail";
import findByPhone from "@lib/users/findByPhone";
import { hashPassword } from "@utils/password";
import { Role } from "@prisma/client";
import { userRegisterSchema } from "@schemas/zod-schema";
import badRequest from "@utils/badRequest";

const registerController = async (req: Request, res: Response) => {
    try {
        const { name, email, phone, password } = req.body;

        // validate request body using Zod
        const parsedBody = userRegisterSchema.safeParse({
            name,
            email,
            phone,
            password,
        });
        if (!parsedBody.success) {
            return badRequest(res, parsedBody.error.issues[0].message);
        }

        //check duplication of email and phone
        const isExistsEmail = await findByEmail(email);
        if (isExistsEmail) return badRequest(res, "Email already exists");

        const isExistsPhone = await findByPhone(phone);
        if (isExistsPhone) return badRequest(res, "Phone already exists");

        // T hash password
        const pass = password as string;
        const hashedPassword = await hashPassword(pass);
        // create a new user
        const user = await userCreate({
            name,
            email,
            phone,
            password: hashedPassword,
            role: Role.USER,
        });

        res.json({ message: "User registered successfully", data: user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export default registerController;
