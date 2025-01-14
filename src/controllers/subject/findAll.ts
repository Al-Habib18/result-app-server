/** @format */
import { Request, Response } from "express";
import findAll from "../../lib/subjects/findAll";
import { queryParamsSchema } from "../../schemas/zod-schema";
import countTotalSubject from "../../lib/subjects/totalSubject";
import getPagination from "../../utils/pagination";
import getHATEOAS from "../../utils/hetos";

const findAllController = async (req: Request, res: Response) => {
    try {
        const { page, limit, code } = req.query;
        const defaultLimit = Number(limit);
        const defaultPage = Number(page);

        const codeString = code ? String(code) : undefined;

        const parsedParams = queryParamsSchema.safeParse({
            limit: defaultLimit,
            page: defaultPage,
            code: codeString,
        });
        if (!parsedParams.success) {
            return res.status(400).json({
                message: "Invalid query parameters",
                errors: parsedParams.error.issues,
            });
        }

        const subjects = await findAll(defaultPage, defaultLimit, codeString);

        const totalItems: number = await countTotalSubject();
        const pagination = getPagination(totalItems, defaultLimit, defaultPage);

        //create links for pagination
        const links = getHATEOAS({
            url: req.url,
            path: req.path,
            query: req.query,
            hasNext: !!pagination.next,
            hasPrev: !!pagination.prev,
            page: defaultPage,
        });
        return res.json({
            message: "Subjects retrived successfully",
            data: subjects,
            pagination,
            links,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export default findAllController;
