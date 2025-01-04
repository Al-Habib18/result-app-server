/** @format */

import prisma from "../../schemas/index";
import { Role, AccountStatus } from "@prisma/client";

const updateAllDataById = async (
    id: string,
    data: {
        name?: string;
        email?: string;
        phone?: string;
        role?: Role;
        verified?: boolean;
        status?: AccountStatus;
    }
) => {
    try {
        const subject = await prisma.user.update({
            where: { id },
            data,
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        return subject;
    } catch (error) {
        console.error("Error updating subject:", error);
        throw error;
    }
};

export default updateAllDataById;
