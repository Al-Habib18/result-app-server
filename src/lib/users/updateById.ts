/** @format */

import prisma from "../../schemas/index";

const updateUser = async (
    id: string,
    data: {
        name?: string;
        email?: string;
        phone?: string;
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

export default updateUser;
