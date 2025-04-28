import { Chapter } from './chapter';

export interface ExamChapter {
	id?: number;
	exam_id: number;
	chapter_id: number;
	Chapter: Chapter;
}
