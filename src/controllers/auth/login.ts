/** @format */

import { Request, Response } from "express";

const loginController = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    console.log("email: ", email);
    console.log("password: ", password);
    res.json({ message: "User logged in successfully" });
};

export default loginController;
