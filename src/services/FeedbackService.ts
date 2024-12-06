import { Feedback } from "../models/Feedback";

export class FeedbackService {
	private static feedbacks: Feedback[] = [];

	static createFeedback(feedback: Feedback): void {
		this.feedbacks.push(feedback);
	}

	static listFeedbacks(): Feedback[] {
		return this.feedbacks;
	}
}
