/** @format */

import prisma from "../../schemas/index"; // Adjust path to your Prisma client
import findByCode from "./findByCode";

export default async function removeFailedRolls(data: {
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

        //TODO: covert existingTheoryFailed and existingPracticalFailed to  arrays of string

        const existingTheoryFailedString = existingTheoryFailed.map((roll) =>
            roll?.toString()
        );

        const existingPracticalFailedString = existingPracticalFailed.map(
            (roll) => roll?.toString()
        );

        const updatedTheoryFailed = existingTheoryFailedString
            .filter((roll): roll is string => typeof roll === "string") // Ensure rolls are strings
            .filter((roll) => !theoryFailedRolls.includes(roll));

        const newTheoryFailed = Array.from(new Set(updatedTheoryFailed));

        const updatedPracticalFailed = existingPracticalFailedString
            .filter((roll): roll is string => typeof roll === "string") // Ensure rolls are strings
            .filter((roll) => !practicalFailedRolls.includes(roll));

        const newPracticalFailed = Array.from(new Set(updatedPracticalFailed));

        // Update the subject in the database
        const updatedSubject = await prisma.subject.update({
            where: { code },
            data: {
                ...subject,
                theoryFailed: newTheoryFailed,
                practicalFailed: newPracticalFailed,
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
