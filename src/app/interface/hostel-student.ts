import { Hostel } from './hostel';
import { HostelRoom } from './hostel-room';
import { Student } from './student';

export interface HostelStudent {
	id?: number;
	student_id: number;
	hostel_id: number;
	hostel_room_id: number;
	Student: Student;
	Hostel: Hostel;
	HostelRoom: HostelRoom;
	contact_number: string;
	name: string;
}
