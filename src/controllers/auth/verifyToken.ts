/** @format */

import { Request, Response } from "express";
import { accessTokenSchema } from "@schemas/zod-schema";
import findByEmail from "@lib/users/findByEmail";
import { decodeToken } from "@utils/token";

const verifyTokenController = async (req: Request, res: Response) => {
    try {
        // Validate the request body
        const parsedBody = accessTokenSchema.safeParse(req.body);
        if (!parsedBody.success) {
            return res.status(400).json({ errors: parsedBody.error.errors });
        }

        const { accessToken } = parsedBody.data;

        // check if the user exists
        const decodedUser = await decodeToken(accessToken);
        const user = await findByEmail(decodedUser.email);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "Authorized", user });
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};

export default verifyTokenController;
