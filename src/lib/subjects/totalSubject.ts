/** @format */

import prisma from "../../schemas/index";

export default async function countTotalSubject() {
    const subject: number = await prisma.subject.count();
    return subject;
}
