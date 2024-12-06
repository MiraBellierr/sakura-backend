import { Priority, Status } from "../utils/Enums";

export class Complaint {
	constructor(
		public complaintId: string,
		public submittedBy: string,
		public roomNumber: string,
		public category: string,
		public description: string,
		public priority: Priority,
		public comment: string,
		public status: Status = Status.Pending,
		public dateSubmitted: Date = new Date()
	) {}

	updateStatus(newStatus: Status, comment: string): void {
		this.status = newStatus;
		this.comment = comment;
	}
}
