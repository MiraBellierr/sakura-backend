import { Request, Response } from "express";
import { FeedbackModel } from "../models/FeedbackSchema";

export class FeedbackController {
	static async createFeedback(req: Request, res: Response): Promise<void> {
		try {
			const { feedbackId, complaintId, rating, comments } = req.body;

			const feedback = new FeedbackModel({
				feedbackId,
				complaintId,
				rating,
				comments,
			});

			await feedback.save();

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
			const feedbacks = await FeedbackModel.find();
			res.status(200).json(feedbacks);
		} catch (error: any) {
			console.error("Error fetching feedbacks:", error);
			res
				.status(500)
				.json({ message: "Internal server error", error: error.message });
		}
	}
}
