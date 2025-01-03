/** @format */

import prisma from "../../schemas/index";

export default async function findAll(
    page: number | undefined,
    limit: number | undefined
) {
    //TODO: sort using createdAt
    try {
        if (page === undefined) page = 1;
        if (limit === undefined) limit = 10;

        const users = await prisma.user.findMany({
            skip: limit * (page - 1) || 0,
            take: limit || 10,
        });
        // const subjects = await prisma.subject.findMany();
        return users;
    } catch (error) {
        console.log(error);
        return [];
    }
}
