import { Batch } from './batch';
import { Standard } from './standard';
import { BatchStandard } from './batch-standard';
import { Student } from './student';

export interface BatchStandardStudent {
	id?: number;
	batch_id: number;
	standard_id: number;
	student_id: number;
	batch_standard_id: number;
	Batch: Batch;
	Standard: Standard;
	Student: Student;
	BatchStandard: BatchStandard;
	totalMarks?: number;
}
