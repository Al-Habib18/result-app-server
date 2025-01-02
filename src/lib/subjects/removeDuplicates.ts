/** @format */

import prisma from "../../schemas/index";

export default async function removeDuplicateRolls(code: string) {
    const subject = await prisma.subject.findUnique({
        where: { code: code },
    });
    //Remove duplicates rolls
    if (!subject) return null;

    // Ensure existing fields are arrays or initialize them as empty arrays
    const existingTheoryFailed = Array.isArray(subject.theoryFailed)
        ? subject.theoryFailed
        : [];
    const existingPracticalFailed = Array.isArray(subject.practicalFailed)
        ? subject.practicalFailed
        : [];

    const theoryFailed = Array.from(new Set(existingTheoryFailed));
    const practicalFailed = Array.from(new Set(existingPracticalFailed));

    const newSubject = await prisma.subject.update({
        where: { code: code },
        data: {
            theoryFailed: theoryFailed,
            practicalFailed: practicalFailed,
        },
    });

    return newSubject;
}
