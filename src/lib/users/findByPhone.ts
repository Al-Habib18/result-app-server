/** @format */

import prisma from "../../schemas/index";
// retrive a user by phone number
const findByPhone = async (phone: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: { phone },
        });
        return user;
    } catch (error) {
        console.error("Error finding user by email:", error);
        throw error;
    }
};

export default findByPhone;
