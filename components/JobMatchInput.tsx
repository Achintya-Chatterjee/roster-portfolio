"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface JobMatchInputProps {
  onAnalyze: (jobText: string) => void;
  isLoading: boolean;
}

export default function JobMatchInput({
  onAnalyze,
  isLoading,
}: JobMatchInputProps) {
  const [jobText, setJobText] = useState("");

  const handleAnalyzeClick = () => {
    if (jobText.trim() !== "" && !isLoading) {
      onAnalyze(jobText);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Analyze Job Match</CardTitle>
        <CardDescription>
          Paste a job description below to see how well your Roster profile
          aligns with it.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Paste the full job description here..."
          value={jobText}
          onChange={(e) => setJobText(e.target.value)}
          rows={12}
          disabled={isLoading}
          aria-label="Job Description Input"
        />
        <Button
          onClick={handleAnalyzeClick}
          disabled={isLoading || jobText.trim() === ""}
          className="w-full sm:w-auto"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            "Analyze Match"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
