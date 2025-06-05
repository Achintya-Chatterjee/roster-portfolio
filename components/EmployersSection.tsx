"use client"

import { useState } from "react"
import type { ProfileData, Employer } from "@/types/profile"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import EmployerCard from "./EmployerCard"

interface EmployersSectionProps {
  profileData: ProfileData
  onUpdate: (data: ProfileData) => void
}

export default function EmployersSection({ profileData, onUpdate }: EmployersSectionProps) {
  const [employers, setEmployers] = useState<Employer[]>(profileData.employers || [])
  const [newlyAddedEmployerId, setNewlyAddedEmployerId] = useState<string | null>(null)

  const addNewEmployer = () => {
    const newEmployer: Employer = {
      id: Date.now().toString(),
      name: "New Client",
      jobTitle: "",
      duration: "",
      employmentType: "contract",
      summary: "",
      videos: [],
    }

    const updatedEmployers = [...employers, newEmployer]
    setEmployers(updatedEmployers)
    setNewlyAddedEmployerId(newEmployer.id) // Keep track of the new employer

    const updatedProfile = {
      ...profileData,
      employers: updatedEmployers,
    }
    onUpdate(updatedProfile)
  }

  const updateEmployer = (employerId: string, updatedEmployer: Employer) => {
    const updatedEmployers = employers.map((emp) => (emp.id === employerId ? updatedEmployer : emp))
    setEmployers(updatedEmployers)

    const updatedProfile = {
      ...profileData,
      employers: updatedEmployers,
    }
    onUpdate(updatedProfile)
  }

  const deleteEmployer = (employerId: string) => {
    const updatedEmployers = employers.filter((emp) => emp.id !== employerId)
    setEmployers(updatedEmployers)

    const updatedProfile = {
      ...profileData,
      employers: updatedEmployers,
    }
    onUpdate(updatedProfile)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold">Employers & Clients</CardTitle>
        <Button variant="outline" size="sm" onClick={addNewEmployer} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Client</span>
        </Button>
      </CardHeader>

      <CardContent className="space-y-6">
        {employers.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No employers or clients added yet.</p>
            <p className="text-sm mt-1">Click "Add Client" to get started.</p>
          </div>
        ) : (
          employers.map((employer) => (
            <EmployerCard
              key={employer.id}
              employer={employer}
              onUpdate={(updatedEmployer) => {
                updateEmployer(employer.id, updatedEmployer)
                if (newlyAddedEmployerId === employer.id) {
                  setNewlyAddedEmployerId(null) // Reset after first save
                }
              }}
              onDelete={() => deleteEmployer(employer.id)}
              startInEditMode={newlyAddedEmployerId === employer.id}
            />
          ))
        )}
      </CardContent>
    </Card>
  )
}
