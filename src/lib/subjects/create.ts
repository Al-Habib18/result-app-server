/** @format */

import prisma from "../../schemas/index";
type Subject = {
    code: string;
    name: string;
    theoryFailed: string[];
    practicalFailed: string[];
};

const createSubject = async (data: Subject) => {
    try {
        const subject = await prisma.subject.create({
            data: {
                code: data.code,
                name: data.name,
                theoryFailed: data.theoryFailed,
                practicalFailed: data.practicalFailed,
            },
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
