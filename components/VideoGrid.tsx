"use client"

import { useState } from "react"
import type { Video } from "@/types/profile"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Play, Edit2, Trash2, Save, X } from "lucide-react"
import Image from "next/image"

interface VideoGridProps {
  videos: Video[]
  onUpdateVideo: (videoId: string, video: Video) => void
  onDeleteVideo: (videoId: string) => void
}

export default function VideoGrid({ videos, onUpdateVideo, onDeleteVideo }: VideoGridProps) {
  const [editingVideo, setEditingVideo] = useState<string | null>(null)
  const [editData, setEditData] = useState<Partial<Video>>({})

  const startEditing = (video: Video) => {
    setEditingVideo(video.id)
    setEditData({
      title: video.title,
      url: video.url,
      thumbnail: video.thumbnail,
      duration: video.duration,
    })
  }

  const saveVideo = (videoId: string) => {
    const video = videos.find((v) => v.id === videoId)
    if (video) {
      onUpdateVideo(videoId, { ...video, ...editData })
    }
    setEditingVideo(null)
    setEditData({})
  }

  const cancelEditing = () => {
    setEditingVideo(null)
    setEditData({})
  }

  if (videos.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
        <Play className="h-8 w-8 mx-auto mb-2 text-gray-400" />
        <p>No videos added yet.</p>
        <p className="text-sm mt-1">Click "Add Video" to showcase your work.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {videos.map((video) => (
        <Card key={video.id} className="overflow-hidden">
          <div className="relative aspect-video bg-gray-100">
            <Image src={video.thumbnail || "/placeholder.svg"} alt={video.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
              <Button variant="secondary" size="sm" className="opacity-0 hover:opacity-100 transition-opacity">
                <Play className="h-4 w-4 mr-2" />
                Play
              </Button>
            </div>
            {video.duration && (
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                {video.duration}
              </div>
            )}
          </div>

          <CardContent className="p-4">
            {editingVideo === video.id ? (
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="videoTitle">Title</Label>
                  <Input
                    id="videoTitle"
                    value={editData.title || ""}
                    onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="videoDuration">Duration</Label>
                  <Input
                    id="videoDuration"
                    value={editData.duration || ""}
                    onChange={(e) => setEditData({ ...editData, duration: e.target.value })}
                    placeholder="e.g., 2:30"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="ghost" size="sm" onClick={cancelEditing}>
                    <X className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => saveVideo(video.id)}>
                    <Save className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <h4 className="font-medium text-gray-900 text-sm leading-tight">{video.title}</h4>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm" onClick={() => startEditing(video)} className="h-6 w-6 p-0">
                      <Edit2 className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDeleteVideo(video.id)}
                      className="h-6 w-6 p-0 text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
