import { Student } from './student';
import { TeacherLog } from './teacher-log';

export interface LogAttendance {
	id?: number;
	student_id: number;
	teacher_log_id: number;
	batch_standard_id: number;
	is_present: boolean;
	Student: Student;
	TeacherLog: TeacherLog;
}
