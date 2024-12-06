import { Request, Response } from "express";
import { FaqModel } from "../models/FaqSchema";

export class FaqController {
	// Create a new FAQ
	static async createFaq(req: Request, res: Response): Promise<void> {
		try {
			const { faqId, question, answer } = req.body;

			const faq = new FaqModel({ faqId, question, answer });
			await faq.save();

			res.status(201).json({ message: "FAQ created successfully!", faq });
		} catch (error: any) {
			console.error("Error creating FAQ:", error);
			res
				.status(500)
				.json({ message: "Internal server error", error: error.message });
		}
	}

	// List all FAQs
	static async listFaqs(req: Request, res: Response): Promise<void> {
		try {
			const faqs = await FaqModel.find();
			res.status(200).json(faqs);
		} catch (error: any) {
			console.error("Error fetching FAQs:", error);
			res
				.status(500)
				.json({ message: "Internal server error", error: error.message });
		}
	}

	// Update an existing FAQ
	static async updateFaq(req: Request, res: Response): Promise<void> {
		const { id } = req.params;
		const { question, answer } = req.body;

		try {
			const faq = await FaqModel.findOneAndUpdate(
				{ faqId: id },
				{ question, answer },
				{ new: true } // Return the updated FAQ
			);

			if (!faq) {
				res.status(404).json({ message: "FAQ not found!" });
				return;
			}

			res.status(200).json({ message: "FAQ updated successfully!", faq });
		} catch (error: any) {
			console.error("Error updating FAQ:", error);
			res
				.status(500)
				.json({ message: "Internal server error", error: error.message });
		}
	}

	// Delete an FAQ
	static async deleteFaq(req: Request, res: Response): Promise<void> {
		const { id } = req.params;

		try {
			const faq = await FaqModel.findOneAndDelete({ faqId: id });

			if (!faq) {
				res.status(404).json({ message: "FAQ not found!" });
				return;
			}

			res.status(200).json({ message: "FAQ deleted successfully!" });
		} catch (error: any) {
			console.error("Error deleting FAQ:", error);
			res
				.status(500)
				.json({ message: "Internal server error", error: error.message });
		}
	}
}
