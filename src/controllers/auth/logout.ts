/** @format */

import { Request, Response } from "express";

const registerController = async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    console.log("refreshToken: ", refreshToken);
    res.json({ message: "User logged out successfully" });
};

export default registerController;
