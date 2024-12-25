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
      users: {
        Row: {
          id: string
          email: string
          username: string
          password_hash: string
          name: string
          role: string
          avatar_url: string | null
          github_username: string | null
          github_id: string | null
          devcoins: number
          email_verified: boolean
          adypu_email: string | null
          linkedin_url: string | null
          bio: string | null
          is_active: boolean
          last_login: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          username: string
          password_hash: string
          name: string
          role: string
          avatar_url?: string | null
          github_username?: string | null
          github_id?: string | null
          devcoins?: number
          email_verified?: boolean
          adypu_email?: string | null
          linkedin_url?: string | null
          bio?: string | null
          is_active?: boolean
          last_login?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          email?: string
          username?: string
          password_hash?: string
          name?: string
          role?: string
          avatar_url?: string | null
          github_username?: string | null
          github_id?: string | null
          devcoins?: number
          email_verified?: boolean
          adypu_email?: string | null
          linkedin_url?: string | null
          bio?: string | null
          is_active?: boolean
          last_login?: string | null
          updated_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          username: string
          name: string
          role: string
          avatar_url: string | null
          github_username: string | null
          email: string | null
          adypu_email: string | null
          linkedin_url: string | null
          points: number
          contributions: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          name: string
          role: string
          avatar_url?: string | null
          github_username?: string | null
          email?: string | null
          adypu_email?: string | null
          linkedin_url?: string | null
          points?: number
          contributions?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          username?: string
          name?: string
          role?: string
          avatar_url?: string | null
          github_username?: string | null
          email?: string | null
          adypu_email?: string | null
          linkedin_url?: string | null
          points?: number
          contributions?: number
          updated_at?: string
        }
      }
      contributions: {
        Row: {
          id: string
          user_id: string
          project_id: string | null
          type: 'PR' | 'COLLAB' | 'EVENT' | 'OTHER'
          description: string
          coins: number
          contribution_date: string
          verified: boolean
          pull_request_url: string | null
          status: 'pending' | 'approved' | 'rejected'
          reviewer_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          project_id?: string | null
          type: 'PR' | 'COLLAB' | 'EVENT' | 'OTHER'
          description: string
          coins: number
          contribution_date: string
          verified?: boolean
          pull_request_url?: string | null
          status?: 'pending' | 'approved' | 'rejected'
          reviewer_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          user_id?: string
          project_id?: string | null
          type?: 'PR' | 'COLLAB' | 'EVENT' | 'OTHER'
          description?: string
          coins?: number
          contribution_date?: string
          verified?: boolean
          pull_request_url?: string | null
          status?: 'pending' | 'approved' | 'rejected'
          reviewer_id?: string | null
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          name: string
          description: string
          repository_url: string
          is_active: boolean
          tech_stack: string[]
          difficulty_level: 'beginner' | 'intermediate' | 'advanced'
          maintainer_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          repository_url: string
          is_active?: boolean
          tech_stack?: string[]
          difficulty_level?: 'beginner' | 'intermediate' | 'advanced'
          maintainer_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          description?: string
          repository_url?: string
          is_active?: boolean
          tech_stack?: string[]
          difficulty_level?: 'beginner' | 'intermediate' | 'advanced'
          maintainer_id?: string
          updated_at?: string
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
      settings: {
        Row: {
          id: string
          points_per_contribution: number
          min_points_for_reward: number
          max_points_per_day: number
          github_token_enabled: boolean
          auto_approve_contributions: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          points_per_contribution?: number
          min_points_for_reward?: number
          max_points_per_day?: number
          github_token_enabled?: boolean
          auto_approve_contributions?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          points_per_contribution?: number
          min_points_for_reward?: number
          max_points_per_day?: number
          github_token_enabled?: boolean
          auto_approve_contributions?: boolean
          updated_at?: string
        }
      }
      rewards: {
        Row: {
          id: string
          name: string
          description: string
          points_required: number
          quantity_available: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          points_required: number
          quantity_available?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          description?: string
          points_required?: number
          quantity_available?: number
          is_active?: boolean
          updated_at?: string
        }
      }
      reward_claims: {
        Row: {
          id: string
          user_id: string
          reward_id: string
          status: 'pending' | 'approved' | 'rejected' | 'fulfilled'
          admin_notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          reward_id: string
          status?: 'pending' | 'approved' | 'rejected' | 'fulfilled'
          admin_notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          status?: 'pending' | 'approved' | 'rejected' | 'fulfilled'
          admin_notes?: string | null
          updated_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          title: string
          message: string
          type: 'contribution' | 'reward' | 'admin' | 'system'
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          message: string
          type: 'contribution' | 'reward' | 'admin' | 'system'
          is_read?: boolean
          created_at?: string
        }
        Update: {
          is_read?: boolean
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
