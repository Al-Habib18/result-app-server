/** @format */

import { z } from "zod";

export const queryParamsSchema = z.object({
    limit: z.number().positive().max(50).optional(),
    page: z.number().positive().min(1).optional(),
});
