/** @format */

import { z } from "zod";
import { Role } from "@prisma/client";

export const idParamSchema = z.string();

export const rollNumberParamSchema = z.string();

export const codeParamSchema = z
    .string()
    .regex(/^\+?[0-9]\d{1,14}$/, "Invalid Code");

export const queryParamsSchema = z.object({
    limit: z.number().positive().max(50).optional(),
    page: z.number().positive().min(1).optional(),
});

export const createSubjectSchema = z.object({
    code: z.string().regex(/^\+?[0-9]\d{1,14}$/, "Invalid Code"),
    name: z.string().optional(),
    theoryFailed: z.array(z.string()).optional(),
    practicalFailed: z.array(z.string()).optional(),
});

export const updateSubjectSchema = z.object({
    code: z
        .string()
        .regex(/^\+?[0-9]\d{1,14}$/, "Invalid Subject Code")
        .optional(),
    name: z.string().optional(),
    theoryFailed: z.array(z.string()).optional(),
    practicalFailed: z.array(z.string()).optional(),
});

export const failedSchema = z.object({
    theoryFailed: z.array(z.string()).optional(),
    practicalFailed: z.array(z.string()).optional(),
});

export const subjectSchema = z.object({
    code: z.string(),
    name: z.string(),
    theoryFailed: z.array(z.string()).optional(),
    practicalFailed: z.array(z.string()).optional(),
});

export const createUserSchema = z.object({
    name: z.string().min(1, "Name is required").max(100, "Name is too long"),
    email: z.string().email("Invalid email address"),
    phone: z.string().regex(/^\+?[0-9]\d{1,14}$/, "Invalid phone number"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .max(128, "Password is too long"),
    role: z.enum([Role.USER, Role.ADMIN]).optional(),
    verified: z.boolean().optional(),
    status: z.enum(["PENDING", "ACTIVE", "SUSPENDED"]).optional(),
});

export const updateUserSchema = z.object({
    name: z
        .string()
        .min(1, "Name is required")
        .max(100, "Name is too long")
        .optional(),
    email: z.string().email("Invalid email address").optional(),
    phone: z
        .string()
        .regex(/^\+?[0-9]\d{1,14}$/, "Invalid phone number")
        .optional(),
});

export const userRegisterSchema = z.object({
    name: z.string().min(1, "Name is required").max(100, "Name is too long"),
    email: z.string().email("Invalid email address"),
    phone: z.string().regex(/^\+?[0-9]\d{1,14}$/, "Invalid phone number"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .max(128, "Password is too long"),
});
