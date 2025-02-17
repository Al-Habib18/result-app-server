/** @format */

/** @format */

import { Response, Request } from "express";
import { loginSchema } from "@schemas/zod-schema";
import findByEmail from "@lib/users/findByEmail";
// import { AccountStatus } from "@prisma/client";
import { comparePasswords } from "@utils/password";
import { getAccessToken } from "@utils/token";
import badRequest from "@utils/badRequest";
import createRefresh from "../../lib/refresh/create";

const loginController = async (req: Request, res: Response) => {
    try {
        // Validate the request body
        const parsedBody = loginSchema.safeParse(req.body);
        if (!parsedBody.success) {
            return res.status(400).json({ errors: parsedBody.error.errors });
        }

        // check if the user exists
        const user = await findByEmail(parsedBody.data.email);
        if (!user) return badRequest(res, "Invalid credentials");

        // compare password

        const isMatch = comparePasswords(
            parsedBody.data.password,
            user.password
        );

        console.log("isMatch :: ", isMatch);

        if (!isMatch) {
            return badRequest(res, "Invalid credentials");
        } /*TODO: else if (!user.verified) {
            // check user is verified
            return badRequest(res, "User not verified");
        } else if (user.status !== AccountStatus.ACTIVE) {
            // check if the account is active
            return badRequest(res, "Account is not active");
        } */

        // generate refresh token
        const refreshToken = await createRefresh({
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        });
        //generate access token
        const accessToken = getAccessToken({
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        });
        /*         //TODO: delete old refresh token
        await deleteRefresh(user.id); */

        return res.status(200).json({
            message: "Login successful",
            refreshToken,
            accessToken: accessToken,
        });
    } catch (error) {
        console.log("error :: ", error);
        return res.status(500).json({ message: "Error logging in user" });
    }
};

export default loginController;
