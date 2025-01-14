/** @format */

import { Request, Response } from "express";
import deleteAll from "@lib/subjects/deleteAll";

const deleteAllController = async (_req: Request, res: Response) => {
    try {
        await deleteAll();
        return res.status(200).json({
            message: "Subjects deleted successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export default deleteAllController;
