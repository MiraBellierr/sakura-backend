import admin from "firebase-admin";
import bcrypt from "bcrypt";
import { config } from "dotenv";

config();

const serviceAccount = require("../../sakura-database-firebase-adminsdk-o092f-9c7ede27f8.json");

// Initialize Firebase Admin SDK
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount), // Ensure Firebase is initialized with the correct credentials
	databaseURL: process.env.FIREBASE_DATABASE_URL, // Replace with your Firebase database URL
});

// Sample dummy data for one student and one admin
const dummyData = {
	students: [
		{
			userId: "12345",
			password: "student1234", // Plain password, will be hashed
			role: "student",
			name: "John Doe",
			matricNo: "12345",
			email: "john.doe@student.com",
		},
	],
	admins: [
		{
			userId: "admin1",
			password: "admin1234", // Plain password, will be hashed
			role: "admin",
			name: "Admin User",
			email: "admin@example.com",
		},
	],
};

// Function to hash the password and add dummy data to Firebase
const addDummyDataToFirebase = async () => {
	try {
		const usersRef = admin.database().ref("users");

		// Add student data to Firebase
		const student = dummyData.students[0];
		const hashedStudentPassword = await bcrypt.hash(student.password, 10); // Hash the password
		await usersRef.push({
			userId: student.userId,
			password: hashedStudentPassword,
			role: student.role,
			name: student.name,
			matricNo: student.matricNo,
			email: student.email,
		});

		// Add admin data to Firebase
		const adminData = dummyData.admins[0];
		const hashedAdminPassword = await bcrypt.hash(adminData.password, 10); // Hash the password
		await usersRef.push({
			userId: adminData.userId,
			password: hashedAdminPassword,
			role: adminData.role,
			name: adminData.name,
			email: adminData.email,
		});

		console.log("Dummy student and admin data added successfully!");
	} catch (error) {
		console.error("Error adding dummy data to Firebase:", error);
	}
};

// Run the function to add the dummy data
addDummyDataToFirebase();
