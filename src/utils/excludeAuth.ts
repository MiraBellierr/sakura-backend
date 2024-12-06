import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const excludeAuth = (paths: string[]) => {
	return (req: Request, res: Response, next: NextFunction): void => {
		// Check if the current path matches any excluded path
		const pathMatch = paths.some((path) => req.originalUrl.startsWith(path));

		if (pathMatch) {
			next(); // Skip authentication for excluded paths
		} else {
			const token = req.headers.authorization?.split(" ")[1];
			if (!token) {
				res.status(401).json({ message: "Access token is missing!" });
				return;
			}

			jwt.verify(token, process.env.JWT_SECRET || "secret", (err, user) => {
				if (err) {
					res.status(403).json({ message: "Invalid or expired token!" });
					return;
				}

				req.user = user as { userId: string; role: string };
				next();
			});
		}
	};
};
