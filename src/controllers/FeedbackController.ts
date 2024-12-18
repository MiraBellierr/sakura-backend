import { Request, Response } from "express";
import admin from "firebase-admin";

export class FeedbackController {
	static async createFeedback(req: Request, res: Response): Promise<void> {
		try {
			const { complaintId, rating, comments } = req.body;

			const submittedBy = req.user?.userId;
			if (!submittedBy) {
				res.status(403).json({
					message: "User must be authenticated to submit feedback.",
				});
				return;
			}

			// Create a new feedback entry in Firebase Realtime Database
			const newFeedbackRef = admin.database().ref("feedbacks").push();
			const feedback = {
				id: newFeedbackRef.key,
				complaintId,
				rating,
				comments,
				submittedBy,
				createdDate: new Date().toISOString(),
				updatedDate: new Date().toISOString(),
			};

			await newFeedbackRef.set(feedback);

			res
				.status(201)
				.json({ message: "Feedback submitted successfully!", feedback });
		} catch (error: any) {
			console.error("Error submitting feedback:", error);
			res
				.status(500)
				.json({ message: "Internal server error", error: error.message });
		}
	}

	static async listFeedbacks(req: Request, res: Response): Promise<void> {
		try {
			const snapshot = await admin.database().ref("feedbacks").once("value");
			const feedbacks = snapshot.val() ? Object.values(snapshot.val()) : [];

			res.status(200).json(feedbacks);
		} catch (error: any) {
			console.error("Error fetching feedbacks:", error);
			res
				.status(500)
				.json({ message: "Internal server error", error: error.message });
		}
	}
}
