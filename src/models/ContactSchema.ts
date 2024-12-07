import mongoose, { Schema, Document, Model } from "mongoose";

// Define the Contact document interface
export interface IContact extends Document {
	address: string;
	phone: string;
	email: string;
	fax: string;
}

// Define the Contact model interface with custom static methods
export interface IContactModel extends Model<IContact> {
	getContact(): Promise<IContact | null>;
}

// Define the schema for the Contact model
const ContactSchema: Schema<IContact> = new Schema({
	address: { type: String, required: true },
	phone: { type: String, required: true },
	email: { type: String, required: true },
	fax: { type: String, required: true },
});

// Add a static method to retrieve the single contact document
ContactSchema.statics.getContact = async function (): Promise<IContact | null> {
	return this.findOne(); // Return the first document or null if no document exists
};

// Create and export the Contact model
export const ContactModel = mongoose.model<IContact, IContactModel>(
	"Contact",
	ContactSchema
);
