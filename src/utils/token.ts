/** @format */

import jwt, { JwtPayload } from "jsonwebtoken";
export const getAccessToken = (data: {
    id: string;
    email: string;
    name: string;
    role: string;
}) => {
    const accessToken = jwt.sign(
        {
            userId: data.id,
            email: data.email,
            name: data.name,
            role: data.role,
        },
        process.env.JWT_SECRET ?? "My_Secret_Key",
        { expiresIn: process.env.JWT_EXPIRES_IN ?? "24h" }
    );
    return accessToken;
};

export const decodeToken = (token: string) => {
    const user = jwt.verify(token, process.env.JWT_SECRET ?? "My_Secret_Key");
    return user as JwtPayload;
};

export const getTokenExpiration = (token: string) => {
    try {
        const decoded = decodeToken(token);

        let expiration = decoded.exp;
        if (!expiration) {
            return new Error("Invalid token");
        }
        const currentTime = Math.floor(Date.now() / 1000);

        if (currentTime > expiration) {
            return true;
        }
        return false;
    } catch (err) {
        console.log(err);
        return err;
    }
};
