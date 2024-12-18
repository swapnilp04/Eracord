import { Standard } from './standard';

export interface Student {
	id?: number;
	init: string;
	first_name: string;
	middle_name: string;
	last_name: string;
	roll_number: string;
	birth_date: Date;
	parent_name: string;
	parent_occupation: string;
	contact_number: number;
	wh_number: number;
	adhar_card: string;
	status?: string;
	town: string;
	has_hostel: boolean;
	hostel_room_id: number;
	balance: number;
	student_account_balance: number;
	standard_id: number;
	Standard: Standard;
	has_absconded: boolean;
	last_payment_on: Date;
	has_left: boolean;
	left_at: Date;
}
