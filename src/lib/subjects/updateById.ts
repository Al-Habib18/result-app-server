/** @format */

import prisma from "../../schemas/index";

const updateSubject = async (
    id: string,
    data: {
        code?: string;
        name?: string;
        theoryFailed?: string[];
        practicalFailed?: string[];
    }
) => {
    try {
        const subject = await prisma.subject.update({
            where: { id },
            data,
            select: {
                id: true,
                code: true,
                name: true,
                theoryFailed: true,
                practicalFailed: true,
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

export default updateSubject;
