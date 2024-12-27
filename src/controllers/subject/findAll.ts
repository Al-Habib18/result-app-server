/** @format */
import { Request, Response } from "express";
import findAll from "../../lib/subjects/findAll";

const findAllController = async (req: Request, res: Response) => {
    try {
        const { page, limit } = req.query;
        //TODO: validate request body using Zod
        console.log("page:", page);
        console.log("limit:", limit);
        const subjects = await findAll();
        //TODO: create pagination
        //TODO: create links for pagination
        return res.json({
            message: "Subjects retrived successfully",
            data: subjects,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export default findAllController;
