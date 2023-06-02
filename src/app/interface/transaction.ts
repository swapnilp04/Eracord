import { Cheque } from './cheque';
import { Student } from './student';

export interface Transaction {
	id?: number;
	name: string;
	student_id: number;
	hostel_student_id: number;
	transaction_category_id: number;
	batch_standard_student_id: number;
	paid_by: string;
	payment_mode: string;
	is_cleared: boolean;
	is_checked: boolean;
	transaction_type: string;
	reason: string;
	amount: number;
	Cheque: Cheque;
	CreatedAt: Date;
	Student: Student;
}
