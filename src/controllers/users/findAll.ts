/** @format */

import { Request, Response } from "express";

const userFindAllController = async (req: Request, res: Response) => {
    try {
        console.log(req.body);
        return res.json({
            message: "User retrived Successfully",
            // data: user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export default userFindAllController;
