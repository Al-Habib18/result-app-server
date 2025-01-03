/** @format */

import prisma from "../../schemas/index";
// retrive a user by email
const findByEmail = async (email: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });
        return user;
    } catch (error) {
        console.error("Error finding user by email:", error);
        throw error;
    }
};

export default findByEmail;
