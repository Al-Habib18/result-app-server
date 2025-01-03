/** @format */

import { Request, Response } from "express";

const userUpdateByIdController = async (req: Request, res: Response) => {
    console.log(req.body);
    res.json({ message: "user updated Successfully" });
};

export default userUpdateByIdController;
