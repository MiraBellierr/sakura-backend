import mongoose from "mongoose";

export const connectDatabase = async (): Promise<void> => {
	try {
		await mongoose.connect(
			process.env.MONGO_URI || "mongodb://localhost:27017/sakura"
		);
		console.log("Connected to MongoDB");
	} catch (error) {
		console.error("Error connecting to MongoDB:", error);
		process.exit(1);
	}
};
