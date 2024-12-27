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
import addFailedRolls from "@lib/subjects/addFailedRolls";

type Subject = {
    code: string;
    name: string;
    theoryFailed: string[];
    practicalFailed: string[];
};

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

        if (results.length === 0)
            return notFound(res, "No data found in the PDF");

        results.map(async (subject: Subject) => {
            const { code } = subject;
            const isExistsSubject = await findByCode(code);
            if (!isExistsSubject) {
                await createSubject(subject); // create a new subject
            }

            // push theroyFailed and practicalFailed
            await addFailedRolls(subject);
        });

        return res.json({
            message: "PDF processed successfully",
        });
    } catch (error) {
        console.error("Error processing PDF:", error);
        return res
            .status(500)
            .json({ error: "Failed to process the PDF file." });
    } finally {
        if (filePath) {
            try {
                await fs.unlink(filePath);
            } catch (error) {
                console.error("Error deleting file:", error);
            }
        }
    }
};

export default uploadController;
