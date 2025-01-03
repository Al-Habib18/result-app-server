/** @format */

import prisma from "../../schemas/index";

export default async function deleteById(id: string) {
    const subject = await prisma.user.delete({
        where: { id: id },
    });

    return subject;
}
