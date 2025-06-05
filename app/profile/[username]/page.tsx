"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { ProfileData } from "@/types/profile";
import ProfileHeader from "@/components/ProfileHeader";
import BasicInfoSection from "@/components/BasicInfoSection";
import EmployersSection from "@/components/EmployersSection";
import SkillsSection from "@/components/SkillsSection";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Share2,
  ChevronDown,
  ChevronUp,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";
import JobMatchInput from "@/components/JobMatchInput";
import JobMatchResults from "@/components/JobMatchResults";
import { mockAnalyzeJobMatch } from "@/lib/api";
import type { MatchResult } from "@/types/job";
import { Card, CardContent } from "@/components/ui/card";

export default function ProfilePage() {
  const params = useParams();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [jobMatchResult, setJobMatchResult] = useState<MatchResult | null>(
    null
  );
  const [isAnalyzingMatch, setIsAnalyzingMatch] = useState(false);
  const [showJobMatchAnalyzer, setShowJobMatchAnalyzer] = useState(false);

  useEffect(() => {
    // In a real app, this would fetch from an API using the username
    const storedData = localStorage.getItem("profileData");
    if (storedData) {
      const data = JSON.parse(storedData);
      setProfileData(data);
    }
    setIsLoading(false);
  }, [params.username]);

  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Link copied!",
        description: "Profile link has been copied to clipboard.",
      });
    } catch (err) {
      toast({
        title: "Share",
        description: `Share this profile: ${url}`,
      });
    }
  };

  const updateProfileData = (updatedData: ProfileData) => {
    setProfileData(updatedData);
    localStorage.setItem("profileData", JSON.stringify(updatedData));
  };

  const handleUpdateSkills = (updatedSkills: string[]) => {
    if (!profileData) return;

    const newProfileData: ProfileData = {
      ...profileData,
      skills: updatedSkills,
    };
    setProfileData(newProfileData);
    localStorage.setItem("profileData", JSON.stringify(newProfileData));
  };

  const handleStartAnalysis = async (jobText: string) => {
    if (!profileData) {
      console.error("Profile data is not available for analysis.");
      toast({
        title: "Error",
        description: "Profile data not loaded. Cannot start analysis.",
        variant: "destructive",
      });
      setIsAnalyzingMatch(false);
      return;
    }
    setIsAnalyzingMatch(true);
    setJobMatchResult(null);
    try {
      const result = await mockAnalyzeJobMatch(profileData, jobText);
      setJobMatchResult(result);
    } catch (error) {
      console.error("Error during job match analysis:", error);
      toast({
        title: "Analysis Failed",
        description: "An error occurred during analysis. Please try again.",
        variant: "destructive",
      });
      setJobMatchResult({
        overallScore: 0,
        matchingSkills: [],
        missingSkills: [],
        matchingExperienceKeywords: [],
        notes: "An error occurred during analysis. Please try again.",
      });
    } finally {
      setIsAnalyzingMatch(false);
    }
  };

  const handleClearJobMatchResults = () => {
    setJobMatchResult(null);
  };

  const toggleJobMatchAnalyzer = () => {
    const newState = !showJobMatchAnalyzer;
    setShowJobMatchAnalyzer(newState);
    if (!newState) {
      setJobMatchResult(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Profile not found
          </h1>
          <p className="text-gray-600">
            The profile you're looking for doesn't exist.
          </p>
          <Link href="/">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">Back to Home</span>
            </Link>

            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">R</span>
              </div>
              <span className="font-semibold text-gray-900">Roster</span>
            </div>

            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </nav>

      {/* Profile Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <ProfileHeader profileData={profileData} />

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-8">
              {" "}
              <BasicInfoSection
                profileData={profileData}
                onUpdate={updateProfileData}
              />
              {/* Add SkillsSection here */}
              {profileData && (
                <SkillsSection
                  skills={profileData.skills}
                  employers={profileData.employers}
                  onUpdateSkills={handleUpdateSkills}
                />
              )}
            </div>

            <div className="lg:col-span-2">
              <EmployersSection
                profileData={profileData}
                onUpdate={updateProfileData}
              />
            </div>
          </div>

          {/* Job Match Analyzer Section */}
          <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center mb-6">
              <Button
                onClick={toggleJobMatchAnalyzer}
                variant="outline"
                size="lg"
              >
                {showJobMatchAnalyzer
                  ? "Hide Job Analyzer"
                  : "Analyze Profile Against Job Description"}
                {showJobMatchAnalyzer ? (
                  <ChevronUp className="ml-2 h-5 w-5" />
                ) : (
                  <ChevronDown className="ml-2 h-5 w-5" />
                )}
              </Button>
            </div>

            {showJobMatchAnalyzer && (
              <div className="mt-6 space-y-6 rounded-lg bg-white dark:bg-gray-800 p-6 shadow">
                {" "}
                {/* Added Card like container */}
                <JobMatchInput
                  onAnalyze={handleStartAnalysis}
                  isLoading={isAnalyzingMatch}
                />
                {isAnalyzingMatch && (
                  <Card>
                    <CardContent className="pt-6 flex flex-col items-center justify-center space-y-2">
                      <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
                      <p className="text-gray-600 dark:text-gray-300">
                        Analyzing your profile, please wait...
                      </p>
                    </CardContent>
                  </Card>
                )}
                {jobMatchResult && !isAnalyzingMatch && (
                  <JobMatchResults
                    matchResult={jobMatchResult}
                    onClearResults={handleClearJobMatchResults}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
