import mongoose, { Schema, Document } from "mongoose";

export interface INotification extends Document {
	userId: string;
	message: string;
	type: string; // Type of notification (e.g., "info", "warning", "complaint_update")
	data?: Record<string, any>; // Optional additional data (e.g., related complaint ID)
	isRead: boolean;
	timestamp: Date;
}

const NotificationSchema: Schema = new Schema({
	userId: { type: String, required: true },
	message: { type: String, required: true },
	type: {
		type: String,
		enum: ["info", "warning", "complaint_update"],
		required: true,
	},
	data: { type: Object },
	isRead: { type: Boolean, default: false },
	timestamp: { type: Date, default: Date.now },
});

export const NotificationModel = mongoose.model<INotification>(
	"Notification",
	NotificationSchema
);
