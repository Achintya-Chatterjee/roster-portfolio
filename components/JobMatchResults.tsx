"use client";

import type { MatchResult } from "@/types/job";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X as ClearIcon } from "lucide-react";

interface JobMatchResultsProps {
  matchResult: MatchResult | null;
  onClearResults?: () => void;
}

export default function JobMatchResults({
  matchResult,
  onClearResults,
}: JobMatchResultsProps) {
  if (!matchResult) {
    return null;
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 dark:text-green-500";
    if (score >= 60) return "text-yellow-600 dark:text-yellow-500";
    if (score >= 40) return "text-orange-600 dark:text-orange-500";
    return "text-red-600 dark:text-red-500";
  };

  return (
    <Card className="mt-6">
      {" "}
      <CardHeader className="flex flex-row items-start justify-between">
        {" "}
        <div>
          <CardTitle>Job Match Analysis Results</CardTitle>
          {matchResult.notes && (
            <CardDescription className="pt-1 text-sm">
              {matchResult.notes}
            </CardDescription>
          )}
        </div>
        {onClearResults && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClearResults}
            aria-label="Clear results"
            className="ml-2 flex-shrink-0"
          >
            <ClearIcon className="h-5 w-5" />
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center py-4 border-b dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Overall Match Score
          </h3>
          <p
            className={`text-5xl font-bold ${getScoreColor(
              matchResult.overallScore
            )} mt-1`}
          >
            {matchResult.overallScore}%
          </p>
        </div>

        {matchResult.matchingSkills.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200">
              Matching Skills
            </h4>
            <div className="flex flex-wrap gap-2">
              {matchResult.matchingSkills.map((skill) => (
                <Badge
                  key={skill}
                  variant="default"
                  className="bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-700 dark:text-green-100 dark:hover:bg-green-600"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {matchResult.missingSkills.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200">
              Skills to Develop or Highlight
            </h4>
            <div className="flex flex-wrap gap-2">
              {matchResult.missingSkills.map((skill) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="border-orange-400 text-orange-700 hover:bg-orange-50 dark:border-orange-500 dark:text-orange-400 dark:hover:bg-orange-900/50"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {matchResult.matchingExperienceKeywords.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200">
              Relevant Experience Highlights
            </h4>
            <div className="flex flex-wrap gap-2">
              {matchResult.matchingExperienceKeywords.map((keyword) => (
                <Badge
                  key={keyword}
                  variant="secondary"
                  className="dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {matchResult.matchingSkills.length === 0 &&
          matchResult.missingSkills.length === 0 &&
          matchResult.matchingExperienceKeywords.length === 0 && (
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
              No specific skill or experience overlaps were programmatically
              identified. Review the notes above for a general assessment.
            </p>
          )}
      </CardContent>
    </Card>
  );
}
