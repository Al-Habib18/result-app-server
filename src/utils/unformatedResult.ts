/** @format */

// src/utils/unformattedResult.ts
// Updated regex to capture subject codes more flexibly
const regex = /(\d{6})\s*\{\s*((?:\d{5}\((?:T|P|T,P|P,T)\)(?:,\s*)?)*)\s*\}/g;

const getUnformattedResult = (
    text: string
): Array<{ rollNumber: string; subjectCodes: string[] }> => {
    const results: Array<{ rollNumber: string; subjectCodes: string[] }> = [];
    let match;

    while ((match = regex.exec(text)) !== null) {
        const rollNumber = match[1];
        const rawSubjectCodes = match[2]
            .split(",")
            .map((code) => code.trim())
            .filter((code) => code);

        // Merge adjacent split codes (like '25922(T' and 'P)')
        const subjectCodes = [];
        for (let i = 0; i < rawSubjectCodes.length; i++) {
            const current = rawSubjectCodes[i];
            const next = rawSubjectCodes[i + 1];

            if (next && next === "P)") {
                // Merge current and next if next is "P)"
                subjectCodes.push(`${current},P)`);
                i++; // Skip the next item
            } else {
                subjectCodes.push(current);
            }
        }

        results.push({ rollNumber, subjectCodes });
    }

    return results;
};

export default getUnformattedResult;
