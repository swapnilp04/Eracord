export interface Exam {
	id?: number;
	name: string;
	contact_number: number;
	batch_standard_id: number;
	standard_id: number;
	batch_id: number;
	exam_type: string;
	exam_marks: number;
	exam_time: number;
	exam_date: Date;
}
