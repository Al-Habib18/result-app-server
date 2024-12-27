/** @format */

// src/utils/formatResults.ts
interface SubjectNames {
    [key: string]: string;
}

const getFormattedResults = (
    data: Array<{ rollNumber: string, subjectCodes: string[] }>,
    subjectNames: SubjectNames = {}
): Array<any> => {
    const formattedData: Record<string, any> = {};

    data.forEach((item) => {
        const { rollNumber, subjectCodes } = item;

        subjectCodes.forEach((code) => {
            const [subjectBaseCode, type] = code.split("(");
            const isTheory = type === "T)";
            const isBoth = type === "T,P)" || "P,T)";

            if (!formattedData[subjectBaseCode]) {
                formattedData[subjectBaseCode] = {
                    subject_code: subjectBaseCode,
                    subject_name:
                        subjectNames[subjectBaseCode] || "Unknown Subject",
                    theory_failed: [],
                    practical_failed: [],
                };
            }

            if (isBoth) {
                formattedData[subjectBaseCode].theory_failed.push(
                    Number(rollNumber)
                );
                formattedData[subjectBaseCode].practical_failed.push(
                    Number(rollNumber)
                );
            } else if (isTheory) {
                formattedData[subjectBaseCode].theory_failed.push(
                    Number(rollNumber)
                );
            } else {
                formattedData[subjectBaseCode].practical_failed.push(
                    Number(rollNumber)
                );
            }
        });
    });

    return Object.values(formattedData);
};

export default getFormattedResults;
