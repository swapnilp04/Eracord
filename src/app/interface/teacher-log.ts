import { LogCategory } from './log-category';
import { Teacher } from './teacher';
import { Subject } from './subject';
import { BatchStandard } from './batch-standard';

export interface TeacherLog {
	id?: number;
	log_date: Date;
	start_hour: number;
	start_minuit: number;
	end_hour: number;
	end_minuit: number;
	teacher_id: number;
	Teacher: Teacher;
	subject_id: number;
	Subject: Subject;
	batch_standard_id: number;
	BatchStandard: BatchStandard;
	comment: string;
	log_category_id: number;
	LogCategory: LogCategory;
	ApprovedOn: Date
}