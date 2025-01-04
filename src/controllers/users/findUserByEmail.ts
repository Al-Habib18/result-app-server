/** @format */

import { Request, Response } from "express";

import findByEmail from "@lib/users/findByEmail";
import badRequest from "@utils/badRequest";
import notFound from "@utils/notFound";
import { emailSchema } from "@schemas/zod-schema";

const findUserByEmailController = async (req: Request, res: Response) => {
    try {
        const { email } = req.params;
        // validate request params using Zod
        const parsedParams = emailSchema.safeParse(email);
        if (!parsedParams.success) {
            return badRequest(res, parsedParams.error.issues[0].message);
        }
        if (!email) return badRequest(res, "Email is required");

        const user = await findByEmail(email);
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

export default findUserByEmailController;
