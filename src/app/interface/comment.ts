import { Student } from './student';
import { CommentCategory } from './comment-category';
import { User } from './user';

type Default<T, S> = T | undefined

export interface Comment {
	id?: number;
	comment: string;
	student_id: number;
	Student: Student;
	has_reminder: boolean;
	reminder_on: Date;
	comment_category_id: number;
	CommentCategory: CommentCategory
	user_id: number;
	completed: boolean;
	completed_on: Date;
	User: User;
	is_loading: Default<boolean, false>;
	CreatedAt: Date;
}