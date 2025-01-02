/** @format */

import { z } from "zod";

export const idParamSchema = z.string();

export const rollNumberParamSchema = z.string();

export const codeParamSchema = z.string();

export const queryParamsSchema = z.object({
    limit: z.number().positive().max(50).optional(),
    page: z.number().positive().min(1).optional(),
});

export const createSubjectSchema = z.object({
    code: z.string(),
    name: z.string(),
    theoryFailed: z.array(z.string()).optional(),
    practicalFailed: z.array(z.string()).optional(),
});

export const updateSubjectSchema = z.object({
    code: z.string().optional(),
    name: z.string().optional(),
    theoryFailed: z.array(z.string()).optional(),
    practicalFailed: z.array(z.string()).optional(),
});

export const removalSchema = z.object({
    theoryFailed: z.array(z.string()).optional(),
    practicalFailed: z.array(z.string()).optional(),
});
