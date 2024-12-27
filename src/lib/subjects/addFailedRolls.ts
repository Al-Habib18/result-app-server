/** @format */

import prisma from "../../schemas/index"; // Adjust path to your Prisma client
import findByCode from "./findByCode";
// import { JsonValue } from "@prisma/client";

export default async function addFailedRolls(data: {
    code: string;
    theoryFailedRolls?: string[];
    practicalFailedRolls?: string[];
}) {
    try {
        const { code, theoryFailedRolls, practicalFailedRolls } = data;
        if (!code) {
            throw new Error("Subject code is required.");
        }

        // Find the subject by its code
        const subject = await findByCode(code);
        if (!subject) {
            throw new Error(`Subject with code "${code}" not found.`);
        }

        // Parse existing JSON fields into arrays
        const existingTheoryFailed: string[] = Array.isArray(
            subject.theoryFailed
        )
            ? (subject.theoryFailed as string[]) // Assert it as an array of strings
            : typeof subject.theoryFailed === "string"
            ? JSON.parse(subject.theoryFailed)
            : [];

        const existingPracticalFailed: string[] = Array.isArray(
            subject.practicalFailed
        )
            ? (subject.practicalFailed as string[])
            : typeof subject.practicalFailed === "string"
            ? JSON.parse(subject.practicalFailed)
            : [];

        // Add new rolls to the arrays
        if (theoryFailedRolls) {
            existingTheoryFailed.push(...theoryFailedRolls);
        }

        if (practicalFailedRolls) {
            existingPracticalFailed.push(...practicalFailedRolls);
        }

        // Update the database with the modified arrays
        const updatedSubject = await prisma.subject.update({
            where: { code },
            data: {
                theoryFailed: existingTheoryFailed,
                practicalFailed: existingPracticalFailed,
            },
            select: {
                id: true,
                code: true,
                name: true,
                theoryFailed: true,
                practicalFailed: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        return updatedSubject;
    } catch (error) {
        console.error("Error updating failed rolls:", error);
        throw error;
    }
}
