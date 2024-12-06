import { User } from "./User";

export class Student extends User {
	constructor(
		userId: string,
		password: string,
		name: string,
		email: string,
		role: string
	) {
		super(userId, password, name, email, role);
	}
}
