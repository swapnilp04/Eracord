export interface User {
	id?: number;
	username: string;
	password: string;
	confirm_password?: string;
	active?: boolean;
	role?: string;
}
