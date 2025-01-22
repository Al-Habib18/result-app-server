/** @format */

import prisma from "@schemas/index";
import { hashPassword } from "@utils/password";

const createRootUser = async (email: string, password: string) => {
    //hash password
    const hashedPassword = await hashPassword(password);

    // Check if any admin already exists
    const existingAdmin = await prisma.user.findFirst({
        where: {
            role: "ADMIN",
        },
    });

    if (existingAdmin) {
        throw new Error("Root user already exists.");
    }

    const rootUser = await prisma.user.create({
        data: {
            name: "Root User",
            email: email,
            phone: "1234567890",
            password: hashedPassword,
            role: "ADMIN",
            verified: true,
            status: "ACTIVE",
        },
    });

    console.log("Root user created successfully:", rootUser);

    return rootUser;
};

export default createRootUser;
