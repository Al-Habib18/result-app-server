/** @format */

import prisma from "../../schemas/index";

export default async function countTotalUser() {
    const tatalUser: number = await prisma.user.count();
    return tatalUser;
}
