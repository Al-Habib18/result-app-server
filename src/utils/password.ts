/** @format */
import argon2 from "argon2";

export const hashPassword = async (password: string): Promise<string> => {
    return await argon2.hash(password);
};

export const comparePasswords = async (
    password: string,
    hash: string
): Promise<boolean> => {
    return await argon2.verify(hash, password);
};

export default { hashPassword, comparePasswords };
