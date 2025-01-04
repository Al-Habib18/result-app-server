/** @format */

import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
const decodeToken = (token: string) => {
    const user = jwt.verify(token, process.env.JWT_SECRET ?? "My_Secret_Key");
    return user as JwtPayload;
};

export default decodeToken;
