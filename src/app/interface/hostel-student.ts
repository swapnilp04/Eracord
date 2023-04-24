import { Hostel } from './hostel';
import { Student } from './student';

export interface HostelStudent {
	id?: number;
	student_id: number;
	hostel_id: number;
	hostel_room_id: number;
	student: Student;
	hostel: Hostel;
	contact_number: string;
	name: string;
}
