// types/supabase.ts
// -----------------------------------------------------------------------------
// Minimal handwritten database types for the “public” schema.
// You can safely add / rename columns later – just regenerate with
// `npx supabase@latest gen types typescript ...` when your DB evolves.
// -----------------------------------------------------------------------------

// Recursive JSON helper -------------------------------------------------------
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

// Main Database interface -----------------------------------------------------
export interface Database {
  public: {
    Tables: {
      // ------------- workspaces ------------------------------------------------
      workspaces: {
        Row: {
          id: string
          name: string
          created_at: string | null
        }
        Insert: {
          id?: string
          name: string
          created_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          created_at?: string | null
        }
        Relationships: [] // no FKs yet
      }

      // ------------- surveys ---------------------------------------------------
      surveys: {
        Row: {
          id: string
          user_id: string                 // FK → auth.users.id (UUID)
          data: Json                      // raw JSON answers
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          data: Json
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          data?: Json
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'surveys_user_id_fkey'
            columns: ['user_id']
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
    }

    Views: {}        // ↳ add view definitions here if you create any
    Functions: {}    // ↳ and function signatures here
  }
}