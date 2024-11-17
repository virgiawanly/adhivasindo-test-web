import { Chapter } from './chapters';
import { Course } from './courses';

export enum LessonType {
  Video = 'video',
  Text = 'text',
}

export interface Lesson {
  id: number;
  course_id: number;
  chapter_id: number;
  title: string;
  type: LessonType;
  video_url: string | null;
  video_duration: number | null;
  text_content: string | null;
  order: number;
  created_at?: string | null;
  updated_at?: string | null;
  deleted_at?: string | null;
  course?: Course | null;
  chapter?: Chapter | null;
}
