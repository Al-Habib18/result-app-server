/** @format */

import { Request, Response, NextFunction } from "express";
import { refreshTokenSchema } from "@schemas/zod-schema";
import { getAccessToken, getTokenExpiration, decodeToken } from "@utils/token";
import getRefresh from "@lib/refresh/find";
import createRefresh from "@lib/refresh/create";
import deleteRefresh from "@lib/refresh/delete";
import badRequest from "@utils/badRequest";
import notFound from "@utils/notFound";

const refreshTokenController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { refreshToken } = req.body;

        // Validate the request body
        const parsedBody = refreshTokenSchema.safeParse({ refreshToken });
        if (!parsedBody.success) {
            return res.status(400).json({ errors: parsedBody.error.errors });
        }

        // retrive the refresh
        const refresh = await getRefresh(refreshToken);
        if (!refresh) {
            return notFound(res, "Refresh token not found");
        }

        const isExpired = getTokenExpiration(refresh.token);
        if (isExpired) {
            return badRequest(res, "Refresh token is expired");
        }

        //docode the refresh token
        const user = decodeToken(refreshToken);

        // generate access token
        const newRefreshToken = await createRefresh({
            id: user.userId,
            email: user.email,
            name: user.name,
            role: user.role,
        });

        // remove access token
        await deleteRefresh(refreshToken);

        // create access token
        const accessToken = await getAccessToken({
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        });

        return res.status(200).json({
            message: "Access Token retrive Successful",
            refreshToken: newRefreshToken,
            accessToken: accessToken,
        });
    } catch (error) {
        return next(error);
    }
};

export default refreshTokenController;
