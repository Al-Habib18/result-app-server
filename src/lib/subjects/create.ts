/** @format */

import prisma from "../../schemas/index";

const createSubject = async (data: {
    code: string;
    name: string | "";
    theoryFailed: string[] | [];
    practicalFailed: string[] | [];
}) => {
    try {
        const subject = await prisma.subject.create({
            data,
            select: {
                id: true,
                code: true,
                name: true,
                theoryFailed: true,
                practicalFailed: true,
            },
        });

        return subject;
    } catch (error) {
        console.error("Error creating subject:", error);
        throw error;
    }
};

export default createSubject;
