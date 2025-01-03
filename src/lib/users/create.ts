/** @format */

import prisma from "../../schemas/index";
import { Role } from "@prisma/client";

const createUser = async (data: {
    name: string;
    email: string;
    phone: string;
    password: string;
    role: Role | undefined;
}) => {
    try {
        const subject = await prisma.user.create({
            data,
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                role: true,
                status: true,
                verified: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        return subject;
    } catch (error) {
        console.error("Error creating subject:", error);
        throw error;
    }
};

export default createUser;
