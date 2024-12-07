import mongoose, { Schema, Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IFeedback extends Document {
	feedbackId: string;
	complaintId: string;
	rating: number;
	comments: string;
	dateSubmitted: Date;
}

const FeedbackSchema: Schema = new Schema({
	feedbackId: { type: String, default: uuidv4 },
	complaintId: { type: String, required: true },
	rating: { type: Number, min: 1, max: 5, required: true },
	comments: { type: String, required: true },
	dateSubmitted: { type: Date, default: Date.now },
});

export const FeedbackModel = mongoose.model<IFeedback>(
	"Feedback",
	FeedbackSchema
);
