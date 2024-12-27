/** @format */

import badRequest from "@utils/badRequest";
import notFound from "@utils/notFound";
import fs from "fs/promises"; // Use promise-based fs module for async/await
import { Request, Response } from "express";
import extractTextFromPDF from "../../utils/extractText";
import getUnformatedResult from "@utils/unformatedResult";
import getFormatResults from "@utils/formatedResult";
import findByCode from "@lib/subjects/findByCode";
import createSubject from "@lib/subjects/create";

const uploadController = async (req: Request, res: Response) => {
    let filePath: string | null = null;

    try {
        if (!req.file) return badRequest(res, "No file uploaded");
        filePath = req.file?.path as string;
        if (!filePath) return notFound(res, "No file uploaded");

        if (req.file.mimetype !== "application/pdf") {
            await fs.unlink(filePath); // Safely remove the file
            return badRequest(res, "File must be a PDF");
        }

        if (!(await fs.stat(filePath).catch(() => false)))
            return notFound(res, "File not found");

        // Extract text from the PDF
        const text = await extractTextFromPDF(filePath);
        const unformatedResult = getUnformatedResult(text);
        const results = getFormatResults(unformatedResult);

        await fs.unlink(filePath);

        if (results.length === 0)
            return notFound(res, "No data found in the PDF");
        let newSubjects: any = [];

        results.map(async (result) => {
            const { code, name, theoryFailed, practicalFailed } = result;
            const subject = await findByCode(code);
            if (!subject) {
                //TODO: create a new subject
                /*                 const data = {
                    code,
                    name,
                    theoryFailed,
                    practicalFailed,
                } */
                const subject = await createSubject({
                    code,
                    name,
                    theoryFailed,
                    practicalFailed,
                });
                newSubjects.push(subject);
            }

            //TODO: update subject
            // push theroyFailed and practicalFailed
        });

        console.log(newSubjects);
        return res.json({
            message: "PDF processed successfully",
            data: newSubjects,
        });
    } catch (error) {
        console.error("Error processing PDF:", error);
        return res
            .status(500)
            .json({ error: "Failed to process the PDF file." });
    } //TODO:  implement final block to delete file
};

export default uploadController;
