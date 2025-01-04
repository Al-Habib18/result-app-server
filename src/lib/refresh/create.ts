/** @format */

import jwt from "jsonwebtoken";
import prisma from "@schemas/index";
const createRefresh = async (data: {
    id: string;
    email: string;
    name: string;
    role: string;
}) => {
    const refreshToken = jwt.sign(
        {
            userId: data.id,
            email: data.email,
            name: data.name,
            role: data.role,
        },
        process.env.JWT_SECRET ?? "My_Secret_Key",
        { expiresIn: "7d" }
    );

    await prisma.refresh.create({
        data: {
            userId: data.id,
            email: data.email,
            token: refreshToken,
        },
    });

    return refreshToken;
};

export default createRefresh;
