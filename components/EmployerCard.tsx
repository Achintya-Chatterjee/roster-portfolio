"use client"

import { useState } from "react"
import type { Employer, Video } from "@/types/profile"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Edit2, Save, X, Trash2, Plus } from "lucide-react"
import VideoGrid from "./VideoGrid"

interface EmployerCardProps {
  employer: Employer
  onUpdate: (employer: Employer) => void
  onDelete: () => void
}

export default function EmployerCard({ employer, onUpdate, onDelete }: EmployerCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    name: employer.name,
    jobTitle: employer.jobTitle || "",
    duration: employer.duration || "",
    employmentType: employer.employmentType || "contract",
    summary: employer.summary || "",
  })

  const handleSave = () => {
    const updatedEmployer = {
      ...employer,
      ...editData,
    }
    onUpdate(updatedEmployer)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData({
      name: employer.name,
      jobTitle: employer.jobTitle || "",
      duration: employer.duration || "",
      employmentType: employer.employmentType || "contract",
      summary: employer.summary || "",
    })
    setIsEditing(false)
  }

  const addVideo = () => {
    const newVideo: Video = {
      id: Date.now().toString(),
      title: "New Video",
      url: "/placeholder.svg?height=200&width=300",
      thumbnail: "/placeholder.svg?height=200&width=300",
      duration: "0:30",
    }

    const updatedEmployer = {
      ...employer,
      videos: [...(employer.videos || []), newVideo],
    }
    onUpdate(updatedEmployer)
  }

  const updateVideo = (videoId: string, updatedVideo: Video) => {
    const updatedVideos = (employer.videos || []).map((video) => (video.id === videoId ? updatedVideo : video))

    const updatedEmployer = {
      ...employer,
      videos: updatedVideos,
    }
    onUpdate(updatedEmployer)
  }

  const deleteVideo = (videoId: string) => {
    const updatedVideos = (employer.videos || []).filter((video) => video.id !== videoId)

    const updatedEmployer = {
      ...employer,
      videos: updatedVideos,
    }
    onUpdate(updatedEmployer)
  }

  const getEmploymentTypeColor = (type: string) => {
    switch (type) {
      case "full-time":
        return "bg-green-100 text-green-800"
      case "contract":
        return "bg-blue-100 text-blue-800"
      case "freelance":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="border border-gray-200">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
        <div className="flex-1">
          {isEditing ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="employerName">Company/Client Name</Label>
                <Input
                  id="employerName"
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input
                    id="jobTitle"
                    value={editData.jobTitle}
                    onChange={(e) => setEditData({ ...editData, jobTitle: e.target.value })}
                    placeholder="e.g., Video Editor"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={editData.duration}
                    onChange={(e) => setEditData({ ...editData, duration: e.target.value })}
                    placeholder="e.g., Jan 2023 - Present"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="employmentType">Employment Type</Label>
                <Select
                  value={editData.employmentType}
                  onValueChange={(value) => setEditData({ ...editData, employmentType: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="freelance">Freelance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="summary">Role Summary</Label>
                <Textarea
                  id="summary"
                  value={editData.summary}
                  onChange={(e) => setEditData({ ...editData, summary: e.target.value })}
                  placeholder="Describe your contributions and achievements in this role..."
                  rows={3}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{employer.name}</h3>
                  {employer.jobTitle && <p className="text-gray-600 mt-1">{employer.jobTitle}</p>}
                </div>
                <div className="flex items-center space-x-2">
                  {employer.employmentType && (
                    <Badge className={getEmploymentTypeColor(employer.employmentType)}>
                      {employer.employmentType.charAt(0).toUpperCase() + employer.employmentType.slice(1)}
                    </Badge>
                  )}
                </div>
              </div>

              {employer.duration && <p className="text-sm text-gray-600">{employer.duration}</p>}

              {employer.summary && <p className="text-gray-700 leading-relaxed">{employer.summary}</p>}
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2 ml-4">
          {!isEditing ? (
            <>
              <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)} className="h-8 w-8 p-0">
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onDelete}
                className="h-8 w-8 p-0 text-red-600 hover:text-red-800"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={handleCancel} className="h-8 w-8 p-0">
                <X className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleSave} className="h-8 w-8 p-0">
                <Save className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-gray-900">Portfolio Videos</h4>
          <Button variant="outline" size="sm" onClick={addVideo} className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Video</span>
          </Button>
        </div>

        <VideoGrid videos={employer.videos || []} onUpdateVideo={updateVideo} onDeleteVideo={deleteVideo} />
      </CardContent>
    </Card>
  )
}
