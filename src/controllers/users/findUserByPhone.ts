/** @format */

import { Request, Response } from "express";
import badRequest from "@utils/badRequest";
import notFound from "@utils/notFound";
import { phoneSchema } from "../../schemas/zod-schema";
import findByPhone from "@lib/users/findByPhone";

const userFindByIdController = async (req: Request, res: Response) => {
    try {
        const { phone } = req.params;
        // validate request params using Zod
        const parsedParams = phoneSchema.safeParse(phone);
        if (!parsedParams.success) {
            return badRequest(res, parsedParams.error.issues[0].message);
        }
        if (!phone) return badRequest(res, "Id is required");

        const user = await findByPhone(phone);
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
