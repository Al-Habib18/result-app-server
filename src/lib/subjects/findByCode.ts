/** @format */

import prisma from "../../schemas/index";

export default async function findByCode(code: string) {
    const subject = await prisma.subject.findUnique({
        where: { code: code },
    });
    return subject;
}
