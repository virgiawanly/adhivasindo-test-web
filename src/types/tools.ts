export interface Tool {
  id: number;
  name: string;
  slug: string;
  image: string | null;
  image_url?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  deleted_at?: string | null;
}
