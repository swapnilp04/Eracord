import { Batch } from './batch';
import { Standard } from './standard';

export interface BatchStandard {
	id?: number;
	batch_id: number;
	standard_id: number;
	Batch: Batch;
	Standard: Standard;
	fee: number;
	students_count: number;
}
