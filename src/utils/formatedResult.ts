/** @format */

// src/utils/formatResults.ts
interface SubjectNames {
    [key: string]: string;
}

const getFormattedResults = (
    data: Array<{ rollNumber: string; subjectCodes: string[] }>,
    subjectNames: SubjectNames = {}
): Array<any> => {
    const formattedData: Record<string, any> = {};

    data.forEach((item) => {
        const { rollNumber, subjectCodes } = item;

        subjectCodes.forEach((code) => {
            const [subjectBaseCode, type] = code.split("(");
            const isTheoryFailed = type === "T)";
            const isPracticalFailed = type === "P)";
            const isBothFailed = type === "T,P)";

            if (!formattedData[subjectBaseCode]) {
                formattedData[subjectBaseCode] = {
                    code: subjectBaseCode,
                    name: subjectNames[subjectBaseCode] || "Unknown Subject",
                    theoryFailed: [],
                    practicalFailed: [],
                };
            }

            if (isBothFailed) {
                formattedData[subjectBaseCode].theoryFailed.push(
                    Number(rollNumber)
                );
                formattedData[subjectBaseCode].practicalFailed.push(
                    Number(rollNumber)
                );
            }
            if (isTheoryFailed) {
                formattedData[subjectBaseCode].theoryFailed.push(
                    Number(rollNumber)
                );
            }
            if (isPracticalFailed) {
                formattedData[subjectBaseCode].practicalFailed.push(
                    Number(rollNumber)
                );
            }
        });
    });

    const formattedResults = Object.values(formattedData);

    return formattedResults;
};

export default getFormattedResults;
