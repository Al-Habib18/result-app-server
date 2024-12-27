/** @format */
import { Request, Response } from "express";

const findAllController = async (req: Request, res: Response) => {
    console.log(req.body);
    res.json({ message: "subject findAll Successfully" });
};

export default findAllController;
