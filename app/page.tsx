"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Loader2, ExternalLink, User, Briefcase } from "lucide-react"
import { useRouter } from "next/navigation"
import { mockExtractPortfolioData } from "@/lib/api"

export default function HomePage() {
  const [portfolioUrl, setPortfolioUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!portfolioUrl.trim()) {
      setError("Please enter a valid portfolio URL")
      return
    }

    // Basic URL validation
    try {
      new URL(portfolioUrl)
    } catch {
      setError("Please enter a valid URL")
      return
    }

    setIsLoading(true)

    try {
      // Mock API call to extract portfolio data
      const profileData = await mockExtractPortfolioData(portfolioUrl)

      // Store the profile data in localStorage for demo purposes
      localStorage.setItem("profileData", JSON.stringify(profileData))

      // Navigate to the profile page
      router.push(`/profile/${profileData.username}`)
    } catch (err) {
      setError("Failed to extract portfolio data. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Roster</h1>
          </div>
          <p className="text-lg text-gray-600">Transform your portfolio into a professional profile</p>
        </div>

        {/* Main Card */}
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-gray-900">Add Your Portfolio</CardTitle>
            <CardDescription className="text-base">
              Submit your portfolio link and we'll create a structured profile showcasing your creative work
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="portfolio-url" className="text-sm font-medium">
                  Portfolio URL
                </Label>
                <Input
                  id="portfolio-url"
                  type="url"
                  placeholder="https://your-portfolio-site.com"
                  value={portfolioUrl}
                  onChange={(e) => setPortfolioUrl(e.target.value)}
                  className="h-12"
                  disabled={isLoading}
                />
                {error && <p className="text-sm text-red-600">{error}</p>}
              </div>

              <Button type="submit" className="w-full h-12 text-base font-medium" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Extracting Portfolio Data...
                  </>
                ) : (
                  "Create Profile"
                )}
              </Button>
            </form>

            {/* Example Links */}
            <div className="pt-4 border-t">
              <p className="text-sm text-gray-600 mb-3">Try with these example portfolios:</p>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setPortfolioUrl("https://sonuchoudhary.my.canva.site/portfolio")}
                  className="flex items-center space-x-2 text-sm text-indigo-600 hover:text-indigo-800 transition-colors"
                  disabled={isLoading}
                >
                  <ExternalLink className="h-3 w-3" />
                  <span>Sonu's Creative Portfolio</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPortfolioUrl("https://dellinzhang.com/video-edit")}
                  className="flex items-center space-x-2 text-sm text-indigo-600 hover:text-indigo-800 transition-colors"
                  disabled={isLoading}
                >
                  <ExternalLink className="h-3 w-3" />
                  <span>Dellin's Video Portfolio</span>
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Preview */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="border-0 bg-white/50">
            <CardContent className="p-4 flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Professional Profile</h3>
                <p className="text-sm text-gray-600">Structured display of your info</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/50">
            <CardContent className="p-4 flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Work Experience</h3>
                <p className="text-sm text-gray-600">Showcase your client projects</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
