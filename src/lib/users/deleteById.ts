/** @format */

import prisma from "../../schemas/index";

export default async function deleteById(id: string) {
    const user = await prisma.user.delete({
        where: { id },
    });

    return user;
}
