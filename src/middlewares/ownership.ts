/**
 * import { Request, Response, NextFunction } from "express";
 * import findById from "@lib/users/findByEmail";
 * import authorizationError from "@utils/authorizationError";
 * import notFound from "@utils/notFound";
 *
 * const checkOwnership = async (id: string, userId: string) => {
 *     const user = await findById(id);
 *     if (!user) return false;
 *     if (user.id === userId) return true;
 *
 *     return false;
 * };
 * const ownership =
 *     (model = "") =>
 *     async (req: Request, res: Response, next: NextFunction) => {
 *         if (model === "User") {
 *             const { id } = req.params;
 *             const userId = req.user.id;
 *
 *             try {
 *                 const isOwner = await checkOwnership(id, userId);
 *
 *                 if (isOwner) {
 *                     next();
 *                 } else if (req.user.role === "ADMIN") {
 *                     next();
 *                 } else {
 *                     return authorizationError(
 *                         res,
 *                         "You cannot access other information"
 *                     );
 *                 }
 *             } catch (err) {
 *                 next(err);
 *             }
 *         } else {
 *             return notFound(res, "Ownership validation failed");
 *         }
 *     };
 *
 * export default ownership;
 *
 * @format
 */
