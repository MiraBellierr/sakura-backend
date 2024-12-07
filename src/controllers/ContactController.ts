import { Request, Response } from "express";
import { ContactModel } from "../models/ContactSchema";

export class ContactController {
	// Get the single contact (if it exists)
	static async getContact(req: Request, res: Response): Promise<void> {
		try {
			const contact = await ContactModel.getContact(); // Use the model's static method

			if (!contact) {
				res.status(404).json({ message: "Contact not found!" });
				return;
			}

			res.status(200).json(contact);
		} catch (error: any) {
			console.error("Error fetching contact:", error);
			res
				.status(500)
				.json({ message: "Internal server error", error: error.message });
		}
	}

	// Update the existing contact (only one contact in DB)
	static async updateContact(req: Request, res: Response): Promise<void> {
		try {
			const { address, phone, email, fax } = req.body;

			// Retrieve the existing contact (only one should exist)
			let contact = await ContactModel.getContact();

			if (!contact) {
				res.status(404).json({ message: "Contact not found!" });
				return;
			}

			// Update the contact with new details
			contact.address = address;
			contact.phone = phone;
			contact.email = email;
			contact.fax = fax;

			// Save the updated contact
			await contact.save();

			res
				.status(200)
				.json({ message: "Contact updated successfully!", contact });
		} catch (error: any) {
			console.error("Error updating contact:", error);
			res
				.status(500)
				.json({ message: "Internal server error", error: error.message });
		}
	}
}
