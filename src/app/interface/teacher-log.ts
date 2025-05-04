import { LogCategory } from './log-category';
import { Teacher } from './teacher';
import { Subject } from './subject';
import { Chapter } from './chapter';
import { BatchStandard } from './batch-standard';
import { CombinedClass } from './combined-class';

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
	chapter_id: number;
	Chapter: Chapter;
	batch_standard_id: number;
	BatchStandard: BatchStandard;
	comment: string;
	log_category_id: number;
	LogCategory: LogCategory;
	ApprovedOn: Date;
	user_id: number;
	has_combined_class: boolean;
	combined_classes?: CombinedClass[];
	students_count?: number;
	absent_count?: number;
	duration?: number;
}
