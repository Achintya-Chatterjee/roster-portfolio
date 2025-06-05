"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import type { ProfileData } from "@/types/profile"
import ProfileHeader from "@/components/ProfileHeader"
import BasicInfoSection from "@/components/BasicInfoSection"
import EmployersSection from "@/components/EmployersSection"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Share2 } from "lucide-react"
import Link from "next/link"
import { toast } from "@/hooks/use-toast"

export default function ProfilePage() {
  const params = useParams()
  const [profileData, setProfileData] = useState<ProfileData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would fetch from an API using the username
    const storedData = localStorage.getItem("profileData")
    if (storedData) {
      const data = JSON.parse(storedData)
      setProfileData(data)
    }
    setIsLoading(false)
  }, [params.username])

  const handleShare = async () => {
    const url = window.location.href
    try {
      await navigator.clipboard.writeText(url)
      toast({
        title: "Link copied!",
        description: "Profile link has been copied to clipboard.",
      })
    } catch (err) {
      toast({
        title: "Share",
        description: `Share this profile: ${url}`,
      })
    }
  }

  const updateProfileData = (updatedData: ProfileData) => {
    setProfileData(updatedData)
    localStorage.setItem("profileData", JSON.stringify(updatedData))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (!profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">Profile not found</h1>
          <p className="text-gray-600">The profile you're looking for doesn't exist.</p>
          <Link href="/">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    )
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
            <div className="lg:col-span-1">
              <BasicInfoSection profileData={profileData} onUpdate={updateProfileData} />
            </div>

            <div className="lg:col-span-2">
              <EmployersSection profileData={profileData} onUpdate={updateProfileData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
