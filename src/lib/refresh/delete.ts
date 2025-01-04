/** @format */

// delete refresh token

import getRefresh from "./find";
import prisma from "@schemas/index";

const deleteRefresh = async (token: string) => {
    //find first refresh token
    if (!token) {
        return null;
    }
    const refreshToken = await getRefresh(token);
    if (!refreshToken) {
        console.log("refresh token not found");
        return null;
    }

    // // delete refresh token
    const deletedRefreshToken = await prisma.refresh.delete({
        where: {
            id: refreshToken.id,
        },
    });
    return deletedRefreshToken;
};

export default deleteRefresh;
