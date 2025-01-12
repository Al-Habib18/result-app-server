/** @format */

import prisma from "../../schemas/index";

export default async function findAll(
    page: number | undefined,
    limit: number | undefined,
    code: string | undefined
) {
    //TODO: sort using createdAt
    try {
        if (page === undefined) page = 1;
        if (limit === undefined) limit = 10;

        console.log("code: ", code);
        if (code) {
            const subjects = await prisma.subject.findMany({
                where: { code: code },
            });
            return subjects;
        }

        const subjects = await prisma.subject.findMany({
            skip: limit * (page - 1) || 0,
            take: limit || 10,
        });
        return subjects;
    } catch (error) {
        console.log(error);
        return [];
    }
}
