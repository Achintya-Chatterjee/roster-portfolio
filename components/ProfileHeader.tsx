import type { ProfileData } from "@/types/profile"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, ExternalLink } from "lucide-react"

interface ProfileHeaderProps {
  profileData: ProfileData
}

export default function ProfileHeader({ profileData }: ProfileHeaderProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Cover Image */}
      <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600"></div>

      {/* Profile Info */}
      <div className="px-6 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6">
          {/* Avatar */}
          <div className="relative -mt-16 mb-4 sm:mb-0">
            <div className="w-24 h-24 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center">
              <span className="text-2xl font-bold text-indigo-600">
                {profileData.firstName.charAt(0)}
                {profileData.lastName.charAt(0)}
              </span>
            </div>
          </div>

          {/* Name and Details */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {profileData.firstName} {profileData.lastName}
                </h1>
                <p className="text-lg text-gray-600 mt-1">{profileData.title || "Creative Professional"}</p>
              </div>

              <div className="mt-4 sm:mt-0">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Available for work
                </Badge>
              </div>
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-600">
              {profileData.location && (
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{profileData.location}</span>
                </div>
              )}
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>Joined {new Date().getFullYear()}</span>
              </div>
              {profileData.originalUrl && (
                <a
                  href={profileData.originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Original Portfolio</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
