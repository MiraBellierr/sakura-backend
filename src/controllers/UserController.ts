import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/UserSchema";

export class UserController {
	// Student Login
	static async studentLogin(req: Request, res: Response): Promise<void> {
		const { userId, password } = req.body;

		try {
			// Find the student in the database
			const student = await UserModel.findOne({ userId, role: "student" });
			if (!student) {
				res.status(404).json({ message: "Student not found!" });
				return;
			}

			// Compare passwords
			const passwordMatch = await bcrypt.compare(password, student.password);
			if (!passwordMatch) {
				res.status(401).json({ message: "Invalid credentials!" });
				return;
			}

			// Generate JWT
			const token = jwt.sign(
				{ userId: student.userId, role: student.role },
				process.env.JWT_SECRET || "secret",
				{ expiresIn: "1h" }
			);

			res.status(200).json({ message: "Login successful!", token });
		} catch (error) {
			console.error("Error during student login:", error);
			res.status(500).json({ message: "Internal server error" });
		}
	}

	// Admin Login
	static async adminLogin(req: Request, res: Response): Promise<void> {
		const { userId, password } = req.body;

		try {
			// Find the admin in the database
			const admin = await UserModel.findOne({ userId, role: "admin" });
			if (!admin) {
				res.status(404).json({ message: "Admin not found!" });
				return;
			}

			// Compare passwords
			const passwordMatch = await bcrypt.compare(password, admin.password);
			if (!passwordMatch) {
				res.status(401).json({ message: "Invalid credentials!" });
				return;
			}

			// Generate JWT
			const token = jwt.sign(
				{ userId: admin.userId, role: admin.role },
				process.env.JWT_SECRET || "secret",
				{ expiresIn: "1h" }
			);

			res.status(200).json({ message: "Login successful!", token });
		} catch (error) {
			console.error("Error during admin login:", error);
			res.status(500).json({ message: "Internal server error" });
		}
	}
}
