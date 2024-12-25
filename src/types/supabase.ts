export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          points: number
          contributions: number
          created_at: string
          updated_at: string
          github_username?: string
          avatar_url?: string
        }
        Insert: {
          id: string
          username: string
          points?: number
          contributions?: number
          created_at?: string
          updated_at?: string
          github_username?: string
          avatar_url?: string
        }
        Update: {
          id?: string
          username?: string
          points?: number
          contributions?: number
          created_at?: string
          updated_at?: string
          github_username?: string
          avatar_url?: string
        }
      }
      projects: {
        Row: {
          id: string
          name: string
          description: string
          repository_url: string
          is_active: boolean
          created_at: string
          updated_at: string
          tech_stack: string[]
          difficulty_level: 'beginner' | 'intermediate' | 'advanced'
          maintainer_id: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          repository_url: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
          tech_stack?: string[]
          difficulty_level?: 'beginner' | 'intermediate' | 'advanced'
          maintainer_id: string
        }
        Update: {
          name?: string
          description?: string
          repository_url?: string
          is_active?: boolean
          updated_at?: string
          tech_stack?: string[]
          difficulty_level?: 'beginner' | 'intermediate' | 'advanced'
          maintainer_id?: string
        }
      }
      admin_users: {
        Row: {
          id: string
          user_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          created_at?: string
        }
        Update: {
          user_id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
