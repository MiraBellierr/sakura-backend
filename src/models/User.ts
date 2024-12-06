export abstract class User {
	constructor(
		public userId: string,
		public password: string,
		public name: string,
		public email: string,
		public role: string // "student" or "admin"
	) {}
}
