/** @format */

import { Request, Response } from "express";
// import addFailedRolls from "../../lib/subjects/addFailedRolls";
const removeRollsController = async (req: Request, res: Response) => {
    try {
        console.log("req.body: ", req.body);
        return res.json({
            message: "Rolls removed successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export default removeRollsController;
