/** @format */

import prisma from "../../schemas/index";

export default async function findById(id: string) {
    const subject = await prisma.subject.findUnique({
        where: { id: id },
    });
    return subject;
}
