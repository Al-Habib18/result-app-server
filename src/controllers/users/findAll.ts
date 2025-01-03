/** @format */
import { Request, Response } from "express";
import findAll from "../../lib/users/findAll";
import { queryParamsSchema } from "../../schemas/zod-schema";
import countTotalUser from "../../lib/users/countTotal";
import getPagination from "../../utils/pagination";
import getHATEOAS from "../../utils/hetos";

const userFindAllController = async (req: Request, res: Response) => {
    try {
        const { page, limit } = req.query;
        const defaultLimit = Number(limit);
        const defaultPage = Number(page);

        const parsedParams = queryParamsSchema.safeParse({
            limit: defaultLimit,
            page: defaultPage,
        });
        if (!parsedParams.success) {
            return res.status(400).json({
                message: "Invalid query parameters",
                errors: parsedParams.error.issues,
            });
        }

        const subjects = await findAll(defaultPage, defaultLimit);

        const totalItems: number = await countTotalUser();
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

export default userFindAllController;
