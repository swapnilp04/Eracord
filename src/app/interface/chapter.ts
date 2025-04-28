
import { Standard } from './standard';
import { Subject } from './subject';

export interface Chapter {
	id?: number;
	name: string;
	standard_id: number;
	Standard: Standard;
	subject_id: number;
	Subject: Subject;
	Selected?: boolean;
}