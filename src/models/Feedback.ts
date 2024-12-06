export class Feedback {
	constructor(
		public feedbackId: string,
		public complaintId: string,
		public rating: number,
		public comments: string,
		public dateSubmitted: Date = new Date()
	) {}
}
