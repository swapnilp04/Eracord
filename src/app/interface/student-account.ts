import { Student } from './student';
import { User } from './user';

export interface StudentAccount {
	id?: number;
	student_id: number;
	transaction_type: string;
	amount: number;
	balance: number;
	CreatedAt: Date;
	Student: Student;
	User: User;
}
