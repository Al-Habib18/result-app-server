/** @format */

// src/utils/unformattedResult.ts
// const regex = /(\d{6})\s*\{\s*((?:\d{5}\(T\)(?:,\s*)?)*)\s*\}/g;
const regex = /(\d{6})\s*\{\s*((?:\d{5}\((?:T|P|T,P|P,T)\)(?:,\s*)?)*)\s*\}/g;

const getUnformattedResult = (
    text: string
): Array<{ rollNumber: string; subjectCodes: string[] }> => {
    const results: Array<{ rollNumber: string; subjectCodes: string[] }> = [];
    let match;

    while ((match = regex.exec(text)) !== null) {
        const rollNumber = match[1];
        const subjectCodes = match[2]
            .split(",")
            .map((code) => code.trim())
            .filter((code) => code);

        results.push({ rollNumber, subjectCodes });
    }

    return results;
};

export default getUnformattedResult;
