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
            const isBothFailed = type === "T,P)" || "P,T)";

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
            } else if (isTheoryFailed) {
                formattedData[subjectBaseCode].theoryFailed.push(
                    Number(rollNumber)
                );
            } else {
                formattedData[subjectBaseCode].practicalFailed.push(
                    Number(rollNumber)
                );
            }
        });
    });

    return Object.values(formattedData);
};

export default getFormattedResults;
