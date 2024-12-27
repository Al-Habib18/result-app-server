/** @format */

import prisma from "../schemas/index";

export default async function deleteMany() {
    const subjects = await prisma.subject.deleteMany({});
    return subjects;
}
