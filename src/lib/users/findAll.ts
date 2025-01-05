/** @format */

import prisma from "../../schemas/index";
import { AccountStatus } from "@prisma/client";

export default async function findAll(
    page: number | undefined,
    limit: number | undefined,
    status?: AccountStatus
) {
    //TODO: sort using createdAt
    try {
        if (page === undefined) page = 1;
        if (limit === undefined) limit = 10;

        const users = await prisma.user.findMany({
            skip: limit * (page - 1) || 0,
            take: limit || 10,
            where: { status: status },
        });
        // const subjects = await prisma.subject.findMany();
        return users;
    } catch (error) {
        console.log(error);
        return [];
    }
}
