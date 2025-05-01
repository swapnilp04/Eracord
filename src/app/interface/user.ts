export interface User {
	id?: number;
	username: string;
	password: string;
	confirm_password?: string;
	display_name?: string;
	active?: boolean;
	role?: string;
}
