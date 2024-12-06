import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { UserModel } from "../models/UserSchema";

const seedDatabase = async () => {
	await mongoose.connect(
		process.env.MONGO_URI || "mongodb://localhost:27017/sakura"
	);

	const adminPassword = await bcrypt.hash("admin123", 10);
	const studentPassword = await bcrypt.hash("student123", 10);

	const users = [
		{
			userId: "admin1",
			password: adminPassword,
			name: "Admin User",
			email: "admin@example.com",
			role: "admin",
		},
		{
			userId: "student1",
			password: studentPassword,
			name: "Student User",
			email: "student@example.com",
			role: "student",
		},
	];

	await UserModel.insertMany(users);
	console.log("Database seeded!");
	mongoose.connection.close();
};

seedDatabase();
