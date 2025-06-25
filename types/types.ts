/* types/types.ts  – Single source of shared types */

/* ───── Roles ───── */
export type RoleTag = 'critical' | 'nice-to-have' | 'optional';

export interface Role {
  id:   string;
  name: string;
  tag:  RoleTag;
}

/* ───── Survey questions ───── */
export interface BaseQuestion {
  id:          string;
  prompt:      string;
  required?:   boolean;
  placeholder?: string;
}

export interface TextQuestion extends BaseQuestion {
  type: 'text';
}

export interface SelectQuestion extends BaseQuestion {
  type:    'select';
  options: string[];
}

export type Question = TextQuestion | SelectQuestion;

/* ───── Pillar grouping ───── */
export interface Pillar {
  id:        string;
  title:     string;
  questions: Question[];
}