/** @format */
import { Request, Response } from "express";
const findByNameController = async (req: Request, res: Response) => {
    console.log(req.body);
    res.json({ message: "subject retrived Successfully" });
};

export default findByNameController;
