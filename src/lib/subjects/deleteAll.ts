/** @format */

import prisma from "../../schemas/index";

const deleteAll = async () => {
    try {
        const subjects = await prisma.subject.deleteMany();
        return subjects;
    } catch (error) {
        console.error("Error creating subject:", error);
        throw error;
    }
};

export default deleteAll;
