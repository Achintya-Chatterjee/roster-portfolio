"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X, Edit, Save, Plus } from "lucide-react";
import type { Employer } from "@/types/profile";

interface SkillsSectionProps {
  skills: string[] | undefined;
  employers: Employer[] | undefined;
  onUpdateSkills: (updatedSkills: string[]) => void;
}

export default function SkillsSection({
  skills: initialSkills,
  employers,
  onUpdateSkills,
}: SkillsSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editableSkills, setEditableSkills] = useState<string[]>(
    initialSkills || []
  );
  const [newSkillInput, setNewSkillInput] = useState("");
  const [actionableSuggestedSkills, setActionableSuggestedSkills] = useState<
    string[]
  >([]);

  useEffect(() => {
    if (!isEditing) {
      setEditableSkills(initialSkills || []);
    }
  }, [initialSkills, isEditing]);

  const handleAddSkill = () => {
    const trimmedSkill = newSkillInput.trim();
    if (trimmedSkill === "") return;

    if (
      editableSkills.some(
        (skill) => skill.toLowerCase() === trimmedSkill.toLowerCase()
      )
    ) {
      console.warn("Attempted to add duplicate skill:", trimmedSkill);
      setNewSkillInput("");
      return;
    }
    setEditableSkills([...editableSkills, trimmedSkill]);
    setNewSkillInput("");
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setEditableSkills(
      editableSkills.filter((skill) => skill !== skillToRemove)
    );
  };

  const handleSave = () => {
    onUpdateSkills(editableSkills);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditableSkills(initialSkills || []);
    setNewSkillInput("");
    setActionableSuggestedSkills([]);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setEditableSkills(initialSkills || []);

    const allSuggested = new Set<string>();
    (employers || []).forEach((emp) => {
      (emp.suggestedSkills || []).forEach((skill) => allSuggested.add(skill));
    });

    const currentMainSkillsLower = (initialSkills || []).map((s) =>
      s.toLowerCase()
    );
    const newSuggestions = Array.from(allSuggested).filter(
      (suggestedSkill) =>
        !currentMainSkillsLower.includes(suggestedSkill.toLowerCase())
    );
    setActionableSuggestedSkills(newSuggestions);
    setIsEditing(true);
  };

  const addSuggestedSkillToEditable = (skillToAdd: string) => {
    if (
      !editableSkills.some((s) => s.toLowerCase() === skillToAdd.toLowerCase())
    ) {
      setEditableSkills([...editableSkills, skillToAdd]);
    }
    setActionableSuggestedSkills(
      actionableSuggestedSkills.filter(
        (s) => s.toLowerCase() !== skillToAdd.toLowerCase()
      )
    );
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold">Skills</CardTitle>
        {!isEditing ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleEdit}
            className="h-8 w-8 p-0"
          >
            <Edit className="h-4 w-4" />
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCancel}
              className="h-8 w-8 p-0"
              aria-label="Cancel editing skills"
            >
              <X className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSave}
              className="h-8 w-8 p-0"
              aria-label="Save skills"
            >
              <Save className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="space-y-4">
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="Add a new skill"
                value={newSkillInput}
                onChange={(e) => setNewSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddSkill();
                  }
                }}
                aria-label="New skill input"
              />
              <Button
                onClick={handleAddSkill}
                size="sm"
                aria-label="Add new skill"
              >
                <Plus className="h-4 w-4 mr-1 sm:mr-2" />{" "}
                <span className="hidden sm:inline">Add</span>
              </Button>
            </div>

            {actionableSuggestedSkills.length > 0 && (
              <div className="mt-4 pt-4 border-t">
                <h4 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Quick Add from experiences:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {actionableSuggestedSkills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="default"
                      onClick={() => addSuggestedSkillToEditable(skill)}
                      className="cursor-pointer flex items-center hover:bg-primary/80 transition-colors px-3 py-1 text-sm"
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          addSuggestedSkillToEditable(skill);
                        }
                      }}
                    >
                      {skill} <Plus className="h-3 w-3 ml-1.5" />
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-2 pt-4">
              {" "}
              {editableSkills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="flex items-center group text-sm px-3 py-1"
                >
                  {skill}
                  <button
                    onClick={() => handleRemoveSkill(skill)}
                    className="ml-2 -mr-1 p-0.5 rounded-full opacity-50 group-hover:opacity-100 group-hover:bg-red-200 dark:group-hover:bg-red-700 transition-opacity"
                    aria-label={`Remove skill ${skill}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            {editableSkills.length === 0 && (
              <p className="text-sm text-gray-500 pt-2">
                No skills added yet. Type a skill and click "Add".
              </p>
            )}
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {initialSkills && initialSkills.length > 0 ? (
              initialSkills.map((skill) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="text-sm px-3 py-1"
                >
                  {skill}
                </Badge>
              ))
            ) : (
              <p className="text-sm text-gray-500">
                No skills added yet. Click the edit icon to add your skills.
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
