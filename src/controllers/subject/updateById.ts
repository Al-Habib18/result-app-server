/** @format */
import { Request, Response } from "express";
const updateByCodeController = async (req: Request, res: Response) => {
    console.log(req.body);
    res.json({ message: "subject updated Successfully" });
};

export default updateByCodeController;
