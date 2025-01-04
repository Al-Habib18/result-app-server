/** @format */

import { Request, Response } from "express";

const registerController = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    console.log("email: ", email);
    console.log("password: ", password);
    res.json({ message: "User registered successfully" });
};

export default registerController;
