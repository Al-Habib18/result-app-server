/** @format */

import prisma from "../../schemas/index";

export default async function deleteById(id: string) {
    const subject = await prisma.subject.delete({
        where: { id: id },
    });

    return subject;
    /*     console.log("id : ", id);
    return await prisma.subject.deleteMany({}); */
}
