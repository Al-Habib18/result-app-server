/** @format */

import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
const decodeToken = (token: string) => {
    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET ?? "My_Secret_Key"
        );
        return decoded as JwtPayload;
    } catch (error) {
        return null;
    }
};

export default decodeToken;
