/* Auto‑generated or hand‑written Supabase type definitions
 * Keeping this as a module by exporting at least one symbol.
 *
 * If you later run:
 *   npx supabase gen types typescript --project-id YOUR_PROJECT_REF --schema public > types/supabase.ts
 * that will overwrite this file with fully‑typed tables.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

/** Public schema tables ‑ adjust to match your DB structure */
export interface Database {
  public: {
    Tables: {
      workspaces: {
        Row: {
          id: string;
          name: string;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          created_at?: string | null;
        };
        Relationships: [];
      };
      /* 👉  Add other tables here (survey_responses, users, etc.) */
    };
    Views: {};
    Functions: {};
  };
}