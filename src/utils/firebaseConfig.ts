import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

export const initializeFirebase = async () => {
	const serviceAccount = require("../../sakura-database-firebase-adminsdk-o092f-9c7ede27f8.json");

	if (!admin.apps.length) {
		admin.initializeApp({
			credential: admin.credential.cert(serviceAccount),
			databaseURL: process.env.FIREBASE_DATABASE_URL,
		});
	}

	console.log("Connected to Firebase Realtime Database");
};
