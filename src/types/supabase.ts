/* Generated‑style placeholder – extend as your DB evolves. */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      survey_data: {
        Row: { workspace_id: string; json: Json }
        Insert: { workspace_id: string; json: Json }
        Update: { workspace_id?: string; json?: Json }
      }
      role_data: {
        Row: { workspace_id: string; json: Json }
        Insert: { workspace_id: string; json: Json }
        Update: { workspace_id?: string; json?: Json }
      }
      surveys: {
        Row: { id: string; workspace_id: string; user_id: string; data: Json }
        Insert: {
          id?: string
          workspace_id: string
          user_id: string
          data: Json
        }
        Update: {
          id?: string
          workspace_id?: string
          user_id?: string
          data?: Json
        }
      }
    }
    Views: {}
    Functions: {}
  }
}