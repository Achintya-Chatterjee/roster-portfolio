/**
 * Represents the input containing the job description text.
 */
export interface JobDescriptionInput {
  text: string;
}

/**
 * Represents the result of a conceptual job match analysis.
 */
export interface MatchResult {
  /**
   * Overall match score as a percentage (0-100).
   */
  overallScore: number;

  /**
   * List of skills from the user's profile that match the job description.
   */
  matchingSkills: string[];

  /**
   * List of skills identified in the job description that seem to be missing
   * or less prominent on the user's profile.
   */
  missingSkills: string[];

  /**
   * Keywords or phrases from the user's experience summaries that align
   * with the job description.
   */
  matchingExperienceKeywords: string[];

  /**
   * Optional notes or a summary statement from the analysis.
   */
  notes?: string;
}
