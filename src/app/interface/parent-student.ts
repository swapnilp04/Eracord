import { Student } from './student';

export interface ParentStudent {
	id?: number;
	parent_id: number;
	student_id: number;
	is_active: boolean;
	Student: Student;
}
