/** @format */

import prisma from "../../schemas/index"; // Adjust path to your Prisma client
import findByCode from "./findByCode";

export default async function addFailedRolls(data: {
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

        // Fetch the subject by its code
        const subject = await findByCode(code);
        if (!subject) {
            throw new Error(`Subject with code "${code}" not found.`);
        }

        // Ensure existing fields are arrays or initialize them as empty arrays
        const existingTheoryFailed = Array.isArray(subject.theoryFailed)
            ? subject.theoryFailed
            : [];
        const existingPracticalFailed = Array.isArray(subject.practicalFailed)
            ? subject.practicalFailed
            : [];

        // Add new failed rolls and remove duplicates
        const updatedTheoryFailed = Array.from(
            new Set([...existingTheoryFailed, ...theoryFailedRolls])
        );
        const updatedPracticalFailed = Array.from(
            new Set([...existingPracticalFailed, ...practicalFailedRolls])
        );

        // Remove duplicates
        const theoryFailed = Array.from(new Set(updatedTheoryFailed));
        const practicalFailed = Array.from(new Set(updatedPracticalFailed));

        // Update the subject in the database
        const updatedSubject = await prisma.subject.update({
            where: { code },
            data: {
                ...subject,
                theoryFailed: theoryFailed,
                practicalFailed: practicalFailed,
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
