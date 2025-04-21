import { Student } from './student';
import { Exam } from './exam';

export interface ExamStudent {
	id?: number;
	student_id: number;
	Student: Student;
	exam_id: number;
	Exam: Exam;
	marks: number;
	rank: number;
	percentage: number;
	is_present: boolean;
}

