
import { Standard } from './standard';

export interface Subject {
	id?: number;
	name: string;
	standard_id: number;
	Standard: Standard;
	chapters_count?: number;
	labels?: string[];
	data?: any[];
}
