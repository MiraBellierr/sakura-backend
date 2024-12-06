import mongoose, { Schema, Document } from "mongoose";

export interface IFaq extends Document {
	faqId: string;
	question: string;
	answer: string;
}

const FaqSchema: Schema = new Schema({
	faqId: { type: String, required: true, unique: true },
	question: { type: String, required: true },
	answer: { type: String, required: true },
});

export const FaqModel = mongoose.model<IFaq>("Faq", FaqSchema);
