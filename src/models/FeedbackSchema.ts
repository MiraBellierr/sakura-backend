import mongoose, { Schema, Document } from "mongoose";

export interface IFeedback extends Document {
	feedbackId: string;
	complaintId: string;
	rating: number;
	comments: string;
	dateSubmitted: Date;
}

const FeedbackSchema: Schema = new Schema({
	feedbackId: { type: String, required: true, unique: true },
	complaintId: { type: String, required: true },
	rating: { type: Number, min: 1, max: 5, required: true },
	comments: { type: String, required: true },
	dateSubmitted: { type: Date, default: Date.now },
});

export const FeedbackModel = mongoose.model<IFeedback>(
	"Feedback",
	FeedbackSchema
);
