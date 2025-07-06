"use client"

import { useState } from "react"
import { Play, Star, Users, Clock, Hash, CheckCircle, Flame, TrendingUp, Heart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import apiConstants from "@/services/utils/constants"
import ApiUtils from "@/services/utils"

/**
 * Compact Hero Section Component for Course Preview
 * Clean, aesthetic design with orange theme
 */
export function HeroSection({ data, isMobile, instructors, isTablet, isDesktop }) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  // Mock course stats
  const courseStats = {
    rating: 4.8,
    reviewCount: "2.1K",
    studentCount: "12.5K",
    lastUpdated: new Date("2024-01-15"),
  }

  return (
    <div
      className={`relative w-full bg-cover bg-center overflow-hidden ${isDesktop ? "rounded-2xl" : isMobile ? "rounded-lg" : "rounded-xl"}`}
      style={{
        backgroundImage: data.bannerImagePreview
          ? `url('${data.bannerImagePreview}')`
          : `url('${apiConstants.BACKEND_API_BASE_URL}/course/${data.id}/getImage?type=bannerImage&token=${ApiUtils.getAuthToken()}')` ||
            "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop')",
      }}
    >
      {/* Animated Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/95 via-purple-900/90 to-pink-900/95">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fillRule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fillOpacity=%220.05%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-10 h-10 sm:w-20 sm:h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-20 sm:top-40 right-10 sm:right-20 w-16 h-16 sm:w-32 sm:h-32 bg-purple-400/20 rounded-full blur-2xl animate-bounce"></div>
        <div className="absolute bottom-10 sm:bottom-20 left-1/4 w-8 h-8 sm:w-16 sm:h-16 bg-pink-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 mx-auto">
        <div className={`${isDesktop ? "grid grid-cols-5 gap-8 items-center" : "space-y-4 sm:space-y-6"}`}>
          {/* Left Content */}
          <div className={`${isDesktop ? "col-span-3" : ""} space-y-3 sm:space-y-4`}>
            {/* Compact Badges */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {data.status === "published" && (
                <Badge className="bg-emerald-500/90 hover:bg-emerald-600 text-white border-0 px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-medium">
                  <CheckCircle className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" />
                  Live
                </Badge>
              )}
              {data.isFeatured && (
                <Badge className="bg-orange-500/90 hover:bg-orange-600 text-white border-0 px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-medium">
                  <Flame className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" />
                  Featured
                </Badge>
              )}
              {data.tags?.includes("trending") && (
                <Badge className="bg-orange-500/90 hover:bg-orange-600 text-white border-0 px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-medium">
                  <TrendingUp className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" />
                  Trending
                </Badge>
              )}
            </div>

            {/* Course Title & Summary */}
            <div className="space-y-2">
              <h1
                className={`font-bold text-white leading-tight ${isMobile ? "text-lg sm:text-xl" : isTablet ? "text-xl sm:text-2xl" : "text-2xl lg:text-3xl"}`}
              >
                {data.name || "Course Title"}
              </h1>
              <p
                className={`text-white/85 font-light leading-relaxed line-clamp-2 sm:line-clamp-3 ${isMobile ? "text-sm" : "text-sm sm:text-base"}`}
              >
                {data.summary || "Course summary will appear here"}
              </p>
            </div>

            {/* Compact Stats */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              {/* Rating */}
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1 sm:py-1.5 border border-white/20">
                <div className="flex items-center mr-1 sm:mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-2.5 w-2.5 sm:h-3 sm:w-3 ${i < Math.floor(courseStats.rating) ? "text-orange-400 fill-orange-400" : "text-white/40"}`}
                    />
                  ))}
                </div>
                <span className="text-white font-medium text-xs">
                  {courseStats.rating} ({courseStats.reviewCount})
                </span>
              </div>

              {/* Students */}
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1 sm:py-1.5 border border-white/20">
                <Users className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1 sm:mr-2 text-orange-400" />
                <span className="text-white font-medium text-xs">{courseStats.studentCount}</span>
              </div>

              {/* Duration */}
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1 sm:py-1.5 border border-white/20">
                <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1 sm:mr-2 text-orange-400" />
                <span className="text-white font-medium text-xs">{data.duration || "8"}h</span>
              </div>

              {/* Course Code - Hide on mobile if too many items */}
              {data.code && !isMobile && (
                <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1 sm:py-1.5 border border-white/20">
                  <Hash className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1 sm:mr-2 text-orange-400" />
                  <span className="text-white font-medium text-xs">{data.code}</span>
                </div>
              )}
            </div>

            {/* Compact Instructors */}
            {data.instructorIds?.length > 0 && (
              <div className="flex items-center space-x-2 sm:space-x-3 bg-white/5 backdrop-blur-sm rounded-xl p-2 sm:p-3 border border-white/10">
                <div className="flex -space-x-1 sm:-space-x-2">
                  {instructors?.slice(0, isMobile ? 1 : 2).map((instructor, index) => (
                    <Avatar key={index} className="border-2 border-orange-400 h-6 w-6 sm:h-8 sm:w-8">
                      <AvatarImage src={instructor.avatar || "/placeholder.svg"} alt={instructor.name} />
                      <AvatarFallback className="bg-orange-500 text-white text-xs font-semibold">
                        {instructor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-white font-medium text-xs sm:text-sm truncate">
                    {instructors
                      .slice(0, isMobile ? 1 : 2)
                      .map((instructor) => instructor.name)
                      .join(" & ")}
                  </p>
                  <p className="text-orange-300 text-xs">Expert Instructor{instructors.length > 1 ? "s" : ""}</p>
                </div>
              </div>
            )}

            {/* Compact CTA Buttons */}
            <div className="flex flex-wrap gap-2 sm:gap-3 pt-2">
              <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg border-0 transition-all duration-300 hover:scale-105 px-4 sm:px-6 py-2 text-xs sm:text-sm font-semibold">
                Enroll Now
              </Button>

              <Button
                variant="outline"
                className="bg-white/10 text-white hover:bg-orange-500/20 backdrop-blur-sm border-orange-400/50 hover:border-orange-400 transition-all duration-300 hover:scale-105 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium"
                onClick={() => setIsVideoPlaying(true)}
              >
                <Play className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                Preview
              </Button>

              {!isMobile && (
                <Button
                  variant="outline"
                  className="bg-white/10 text-white hover:bg-orange-500/20 backdrop-blur-sm border-white/30 hover:border-orange-400 transition-all duration-300 hover:scale-105 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium"
                >
                  <Heart className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                  Save
                </Button>
              )}
            </div>
          </div>

          {/* Right Content - Desktop Only */}
          {isDesktop && (
            <div className="col-span-2">
              <div className="bg-white/15 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl">
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-500/20 rounded-full mb-2 border border-orange-400/30">
                    <Play className="h-6 w-6 text-orange-400" />
                  </div>
                  <h3 className="text-white font-bold text-lg">Start Learning</h3>
                  <p className="text-white/80 text-sm">Join {courseStats.studentCount} students</p>
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg border-0 py-2.5 font-semibold text-sm">
                    Get Access Now
                  </Button>
                  <div className="flex items-center justify-center space-x-3 text-orange-300 text-xs">
                    <span>✓ Lifetime Access</span>
                    <span>✓ Certificate</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
