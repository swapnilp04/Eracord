import { Subject } from './subject';

export interface Standard {
	id?: number;
	name: string;
	std: number;
	Subjects: Subject[];
}
