/** @format */

import prisma from "../../schemas/index"; // Adjust path to your Prisma client
import findByCode from "./findByCode";
// import { JsonValue } from "@prisma/client";

export default async function demoAddFailedRolls(data: {
    code: string;
    theoryFailedRolls?: string[];
    practicalFailedRolls?: string[];
}) {
    try {
        const {
            code,
            theoryFailedRolls = [],
            practicalFailedRolls = [],
        } = data;
        if (!code) {
            throw new Error("Subject code is required.");
        }

        // Find the subject by its code
        const subject = await findByCode(code);
        if (!subject) {
            throw new Error(`Subject with code "${code}" not found.`);
        }

        /*         // Parse existing JSON fields into arrays
        let existingTheoryFailed: string[] = Array.isArray(subject.theoryFailed)
            ? (subject.theoryFailed as string[]) // Assert it as an array of strings
            : typeof subject.theoryFailed === "string"
            ? JSON.parse(subject.theoryFailed)
            : [];

        let existingPracticalFailed: string[] = Array.isArray(
            subject.practicalFailed
        )
            ? (subject.practicalFailed as string[])
            : typeof subject.practicalFailed === "string"
            ? JSON.parse(subject.practicalFailed)
            : [];
 */
        const updatedTheoryFailed = [
            ...(Array.isArray(subject.theoryFailed)
                ? subject.theoryFailed
                : []),
            ...(theoryFailedRolls || []),
        ];

        const updatedPracticalFailed = [
            ...(Array.isArray(subject.practicalFailed)
                ? subject.practicalFailed
                : []),
            ...(practicalFailedRolls || []),
        ];

        // Remove duplicates
        const uniqueTheoryFailed = Array.from(new Set(updatedTheoryFailed));
        const uniquePracticalFailed = Array.from(
            new Set(updatedPracticalFailed)
        );

        console.log("after : --- ", uniqueTheoryFailed);
        // Update the database with the modified arrays
        const updatedSubject = await prisma.subject.update({
            where: { code },
            data: {
                theoryFailed: uniqueTheoryFailed,
                practicalFailed: uniquePracticalFailed,
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
