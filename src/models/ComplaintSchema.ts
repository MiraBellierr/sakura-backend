import mongoose, { Schema, Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IComplaint extends Document {
	complaintId: string;
	title: string;
	name: string;
	matricNo: string;
	submittedBy: string;
	roomNumber: string;
	category: string;
	description: string;
	priority: string;
	comment: string;
	status: string;
	dateSubmitted: Date;
	updatedDate?: Date;
}

const ComplaintSchema: Schema = new Schema({
	complaintId: { type: String, default: uuidv4 },
	title: { type: String, required: true },
	name: { type: String, required: true },
	matricNo: { type: String, required: true },
	submittedBy: { type: String, required: true },
	roomNumber: { type: String, required: true },
	category: { type: String, required: true },
	description: { type: String, required: true },
	priority: { type: String, required: true },
	comment: { type: String, default: "" },
	status: { type: String, default: "Pending" },
	dateSubmitted: { type: Date, default: Date.now },
	updatedDate: { type: Date },
});

export const ComplaintModel = mongoose.model<IComplaint>(
	"Complaint",
	ComplaintSchema
);
