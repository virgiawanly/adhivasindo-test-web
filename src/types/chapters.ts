import { Course } from './courses';

export interface Chapter {
  id: number;
  course_id: number;
  title: string;
  order: number;
  created_at?: string | null;
  updated_at?: string | null;
  deleted_at?: string | null;
  course?: Course;
  total_lessons?: number;
  total_video_lessons?: number;
  total_text_lessons?: number;
}
