/** @format */

import { Response, Request } from "express";
import { refreshTokenSchema } from "@schemas/zod-schema";
import getRefresh from "@lib/refresh/find";
import deleteRefresh from "@lib/refresh/delete";
import decodeToken from "@lib/refresh/decode";
import badRequest from "@utils/badRequest";
import notFound from "@utils/notFound";

const logoutController = async (req: Request, res: Response) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) badRequest(res, "Refresh token is required");
        // Validate the request body
        const parsedBody = refreshTokenSchema.safeParse(req.body);
        if (!parsedBody.success)
            return badRequest(res, parsedBody.error.issues[0].message);

        //get decoded user
        const decodedUser = decodeToken(parsedBody.data.refreshToken);
        if (decodedUser == null) {
            return badRequest(res, "Invalid refresh token");
        }

        // find refresh token
        const refreshTokenFound = await getRefresh(
            parsedBody.data.refreshToken
        );
        if (!refreshTokenFound) {
            return notFound(res, "Refresh token not found");
        }

        // delete refresh token
        await deleteRefresh(parsedBody.data.refreshToken);

        return res.status(200).json({
            message: "Logout successful",
        });
    } catch (error) {
        console.log("error :: ", error);
        return res.status(500).json({ message: "Error logging in user" });
    }
};

export default logoutController;
