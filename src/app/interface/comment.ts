import { Student } from './student';
import { User } from './user';

export interface Comment {
	id?: number;
	comment: string;
	student_id: number;
	Student: Student;
	has_reminder: boolean;
	reminder_on: Date;
	comment_category_id: number;
	user_id: number;
	User: User;
}