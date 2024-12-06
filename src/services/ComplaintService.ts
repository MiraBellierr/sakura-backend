import { ComplaintModel, IComplaint } from "../models/ComplaintSchema";

export class ComplaintService {
	static async createComplaint(complaint: IComplaint): Promise<IComplaint> {
		return await new ComplaintModel(complaint).save();
	}

	static async getAllComplaints(): Promise<IComplaint[]> {
		return await ComplaintModel.find();
	}
}
