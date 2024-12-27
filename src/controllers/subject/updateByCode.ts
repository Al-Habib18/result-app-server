/** @format */
import { Request, Response } from "express";
const updateByIdController = async (req: Request, res: Response) => {
    console.log(req.body);
    res.json({ message: "subject updated Successfully" });
};

export default updateByIdController;
