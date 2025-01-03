/** @format */

import prisma from "../../schemas/index";

export default async function findById(id: string) {
    const user = await prisma.user.findUnique({
        where: { id: id },
    });
    return user;
}
