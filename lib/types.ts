// lib/types.ts
/**
 * Types that are generated directly from the master questionnaire
 * so we never get out-of-sync when questions are added or removed.
 */

import { questionnaire } from "./questions";

/**
 * Every question’s `id` becomes a key of the form-data object.
 *
 * The value is kept broad (string | number | File | null) because
 * different question types map to different primitive values.
 */
export type RealignmentFormData = {
  [Q in (typeof questionnaire)[number]["questions"][number] as Q["id"]]:
    | string
    | number
    | File
    | null;
};

/**
 * A convenience constant: an “all-null” starting object that matches the shape
 * of `RealignmentFormData`.  Useful for `useState` initialisation.
 */
export const emptyForm: RealignmentFormData = Object.fromEntries(
  questionnaire.flatMap((pillar) =>
    pillar.questions.map((q) => [q.id, null])
  )
) as RealignmentFormData;