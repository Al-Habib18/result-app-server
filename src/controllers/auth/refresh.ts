/** @format */

import { Request, Response } from "express";

const refreshTokenController = async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    console.log("refreshToken: ", refreshToken);
    res.json({ message: "Access token and refresh token generated" });
};

export default refreshTokenController;
