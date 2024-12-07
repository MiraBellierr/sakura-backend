import { Request, Response } from "express";
import { ComplaintModel } from "../models/ComplaintSchema";
import { NotificationModel } from "../models/NotificationSchema";
import { sendNotification } from "../app";

export class ComplaintController {
	static async listComplaints(req: Request, res: Response): Promise<void> {
		try {
			const complaints = await ComplaintModel.find(); // Fetch all complaints from the database
			res.status(200).json(complaints);
		} catch (error: any) {
			console.error("Error fetching complaints:", error);
			res
				.status(500)
				.json({ message: "Internal server error", error: error.message });
		}
	}
	static async createComplaint(req: Request, res: Response): Promise<void> {
		try {
			const {
				title,
				name,
				matricNo,
				roomNumber,
				category,
				description,
				priority,
				comment,
			} = req.body;

			// Ensure the user is authenticated and use their userId
			const submittedBy = req.user?.userId;
			if (!submittedBy) {
				res.status(403).json({
					message: "User must be authenticated to submit a complaint.",
				});
				return;
			}

			const complaint = new ComplaintModel({
				title,
				name,
				matricNo,
				submittedBy,
				roomNumber,
				category,
				description,
				priority,
				comment,
			});

			await complaint.save();

			res
				.status(201)
				.json({ message: "Complaint created successfully!", complaint });
		} catch (error: any) {
			console.error("Error creating complaint:", error);
			res
				.status(500)
				.json({ message: "Internal server error", error: error.message });
		}
	}

	static async updateComplaint(req: Request, res: Response): Promise<void> {
		const { id } = req.params; // Complaint ID from route parameters
		const { status, comment } = req.body;

		try {
			// Find the complaint and update
			const complaint = await ComplaintModel.findOneAndUpdate(
				{ complaintId: id },
				{ status, comment, updatedDate: new Date() }, // Explicitly set updatedDate
				{ new: true } // Return the updated document
			);

			if (!complaint) {
				res.status(404).json({ message: "Complaint not found!" });
				return;
			}

			const notification = await NotificationModel.create({
				userId: complaint.submittedBy,
				message: `Your complaint has been updated to "${status}".`,
				type: "complaint_update",
				data: { complaintId: complaint.complaintId },
			});

			// Emit real-time notification to the user
			sendNotification(complaint.submittedBy, {
				message: notification.message,
				type: notification.type,
				data: notification.data,
			});

			res
				.status(200)
				.json({ message: "Complaint updated successfully!", complaint });
		} catch (error: any) {
			console.error("Error updating complaint:", error);
			res
				.status(500)
				.json({ message: "Internal server error", error: error.message });
		}
	}

	static async getComplaintsByMatricNo(
		req: Request,
		res: Response
	): Promise<void> {
		const { matricNo } = req.params; // Get matricNo from route parameters

		try {
			const complaints = await ComplaintModel.find({ matricNo });

			if (complaints.length === 0) {
				res
					.status(404)
					.json({ message: `No complaints found for matricNo: ${matricNo}` });
				return;
			}

			res.status(200).json(complaints);
		} catch (error: any) {
			console.error("Error fetching complaints:", error);
			res
				.status(500)
				.json({ message: "Internal server error", error: error.message });
		}
	}
}
