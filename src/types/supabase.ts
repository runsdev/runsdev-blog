export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          id: string;
          title: string;
          content: string;
          slug: string;
          created_at: string;
          updated_at: string;
          author_id: string;
          published: boolean;
        };
        Insert: {
          id?: string;
          title: string;
          content: string;
          slug: string;
          created_at?: string;
          updated_at?: string;
          author_id: string;
          published?: boolean;
        };
        Update: {
          id?: string;
          title?: string;
          content?: string;
          slug?: string;
          created_at?: string;
          updated_at?: string;
          author_id?: string;
          published?: boolean;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
        };
      };
      post_categories: {
        Row: {
          post_id: string;
          category_id: string;
        };
        Insert: {
          post_id: string;
          category_id: string;
        };
        Update: {
          post_id?: string;
          category_id?: string;
        };
      };
      post_images: {
        Row: {
          id: string;
          post_id: string;
          url: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          post_id: string;
          url: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          post_id?: string;
          url?: string;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
  };
}
