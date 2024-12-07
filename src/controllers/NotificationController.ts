import { Request, Response } from "express";
import { NotificationModel } from "../models/NotificationSchema";

export class NotificationController {
	// Fetch all notifications for a specific user
	static async getNotifications(req: Request, res: Response): Promise<void> {
		const { userId } = req.params;

		try {
			const notifications = await NotificationModel.find({ userId }).sort({
				timestamp: -1,
			});

			if (!notifications || notifications.length === 0) {
				res.status(404).json({ message: "No notifications found." });
				return;
			}

			res.status(200).json(notifications);
		} catch (error: any) {
			console.error("Error fetching notifications:", error);
			res
				.status(500)
				.json({ message: "Internal server error", error: error.message });
		}
	}

	// Mark a specific notification as read
	static async markAsRead(req: Request, res: Response): Promise<void> {
		const { id } = req.params;

		try {
			const notification = await NotificationModel.findByIdAndUpdate(
				id,
				{ isRead: true },
				{ new: true } // Return the updated document
			);

			if (!notification) {
				res.status(404).json({ message: "Notification not found." });
				return;
			}

			res
				.status(200)
				.json({ message: "Notification marked as read.", notification });
		} catch (error: any) {
			console.error("Error marking notification as read:", error);
			res
				.status(500)
				.json({ message: "Internal server error", error: error.message });
		}
	}

	// Delete a specific notification
	static async deleteNotification(req: Request, res: Response): Promise<void> {
		const { id } = req.params;

		try {
			const notification = await NotificationModel.findByIdAndDelete(id);

			if (!notification) {
				res.status(404).json({ message: "Notification not found." });
				return;
			}

			res.status(200).json({ message: "Notification deleted successfully." });
		} catch (error: any) {
			console.error("Error deleting notification:", error);
			res
				.status(500)
				.json({ message: "Internal server error", error: error.message });
		}
	}

	// Mark all notifications as read for a specific user
	static async markAllAsRead(req: Request, res: Response): Promise<void> {
		const { userId } = req.params;

		try {
			const result = await NotificationModel.updateMany(
				{ userId, isRead: false },
				{ isRead: true }
			);

			res
				.status(200)
				.json({ message: "All notifications marked as read.", result });
		} catch (error: any) {
			console.error("Error marking all notifications as read:", error);
			res
				.status(500)
				.json({ message: "Internal server error", error: error.message });
		}
	}

	// Delete all notifications for a specific user
	static async deleteAllNotifications(
		req: Request,
		res: Response
	): Promise<void> {
		const { userId } = req.params;

		try {
			const result = await NotificationModel.deleteMany({ userId });

			res
				.status(200)
				.json({ message: "All notifications deleted successfully.", result });
		} catch (error: any) {
			console.error("Error deleting all notifications:", error);
			res
				.status(500)
				.json({ message: "Internal server error", error: error.message });
		}
	}
}
