import { Standard } from './standard';
import { Batch } from './batch';

export interface Exam {
	id?: number;
	name: string;
	contact_number: number;
	batch_standard_id: number;
	standard_id: number;
	Standard: Standard;
	batch_id: number;
	Batch: Batch;
	exam_type: string;
	exam_marks: number;
	exam_time: number;
	exam_date: Date;
	exam_status: string;
}