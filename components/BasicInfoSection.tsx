"use client"

import { useState } from "react"
import type { ProfileData } from "@/types/profile"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Edit2, Save, X } from "lucide-react"

interface BasicInfoSectionProps {
  profileData: ProfileData
  onUpdate: (data: ProfileData) => void
}

export default function BasicInfoSection({ profileData, onUpdate }: BasicInfoSectionProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    firstName: profileData.firstName,
    lastName: profileData.lastName,
    title: profileData.title || "",
    summary: profileData.summary || "",
    location: profileData.location || "",
  })

  const handleSave = () => {
    const updatedProfile = {
      ...profileData,
      ...editData,
    }
    onUpdate(updatedProfile)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData({
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      title: profileData.title || "",
      summary: profileData.summary || "",
      location: profileData.location || "",
    })
    setIsEditing(false)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold">Basic Information</CardTitle>
        {!isEditing ? (
          <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)} className="h-8 w-8 p-0">
            <Edit2 className="h-4 w-4" />
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" onClick={handleCancel} className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleSave} className="h-8 w-8 p-0">
              <Save className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {isEditing ? (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={editData.firstName}
                  onChange={(e) => setEditData({ ...editData, firstName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={editData.lastName}
                  onChange={(e) => setEditData({ ...editData, lastName: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Professional Title</Label>
              <Input
                id="title"
                value={editData.title}
                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                placeholder="e.g., Creative Director, Video Editor"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={editData.location}
                onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                placeholder="e.g., New York, NY"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="summary">Summary</Label>
              <Textarea
                id="summary"
                value={editData.summary}
                onChange={(e) => setEditData({ ...editData, summary: e.target.value })}
                placeholder="Tell us about yourself and your creative work..."
                rows={4}
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <h3 className="font-medium text-gray-900 mb-1">Name</h3>
              <p className="text-gray-700">
                {profileData.firstName} {profileData.lastName}
              </p>
            </div>

            {profileData.title && (
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Title</h3>
                <p className="text-gray-700">{profileData.title}</p>
              </div>
            )}

            {profileData.location && (
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Location</h3>
                <p className="text-gray-700">{profileData.location}</p>
              </div>
            )}

            {profileData.summary && (
              <div>
                <h3 className="font-medium text-gray-900 mb-1">About</h3>
                <p className="text-gray-700 leading-relaxed">{profileData.summary}</p>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}
