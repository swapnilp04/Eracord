export interface Student {
	id?: number;
	init: string;
	first_name: string;
	middle_name: string;
	last_name: string;
	birth_date: Date;
	parent_name: string;
	parent_occupation: string;
	contact_number: number;
	wh_number: number;
	adhar_card: string;
	status?: string;
	town: string;
	has_hostel: boolean;
	balance: number;
}
