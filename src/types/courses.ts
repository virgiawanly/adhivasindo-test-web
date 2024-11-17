import { Tool } from './tools';

export enum CourseStatus {
  Draft = 'draft',
  Published = 'published',
}

export interface CourseCompetency {
  id: number;
  course_id: number;
  name: string;
  created_at?: string | null;
  updated_at?: string | null;
  deleted_at?: string | null;
}

export interface Course {
  id: number;
  name: string;
  slug: string;
  status: CourseStatus;
  description: string | null;
  image: string | null;
  image_url?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  deleted_at?: string | null;
  competencies?: CourseCompetency[];
  tools?: Tool[];
}
