export interface User {
	id?: number;
	username: string;
	password: string;
	confirm_password?: string;
	role?: string;
}
