/** @format */

import prisma from "../../schemas/index";

export default async function findAll() {
    const subjects = await prisma.subject.findMany();
    return subjects;
}
