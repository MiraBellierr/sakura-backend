import mongoose, { Schema, Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IFaq extends Document {
	faqId: string;
	question: string;
	answer: string;
}

const FaqSchema: Schema = new Schema({
	faqId: { type: String, default: uuidv4 },
	question: { type: String, required: true },
	answer: { type: String, required: true },
});

export const FaqModel = mongoose.model<IFaq>("Faq", FaqSchema);
