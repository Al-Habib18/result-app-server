/** @format */

import prisma from "@schemas/index";

const getRefresh = async (token: string) => {
    const refreshToken = await prisma.refresh.findFirst({
        where: {
            token,
        },
    });
    return refreshToken;
};

export default getRefresh;
