/** @format */

import { Request, Response } from "express";
/* import { deleteById } from "../../services/users";
import { badRequest, notFound } from "../../utils/response";
import { idParamSchema } from "../../utils/zod";
 */
const userDeleteByIdController = async (req: Request, res: Response) => {
    try {
        console.log(req.body);
        /*         const { id } = req.params;
        // validate request params using Zod
        const parsedParams = idParamSchema.safeParse(req.params);
        if (!parsedParams.success) {
            return badRequest(res, parsedParams.error.issues[0].message);
        }
        if (!id) return badRequest(res, "Id is required");

        const user = await deleteById(id);
        if (!user) return notFound(res, "User not found"); */

        return res.json({
            message: "User deleted successfully",
            // data: user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export default userDeleteByIdController;
