"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Users, Calendar, Play, Heart, Sparkles, Flame, TrendingUp, Clock } from "lucide-react"
import { useDevice, devicePresets } from "./device-context"
import type { CourseType } from "./course-data"

interface CourseHeaderProps {
  course: CourseType
}

export function CourseHeader({ course }: CourseHeaderProps) {
  const { activeDevice, previewWidth } = useDevice()

  // Determine device type based on viewport width
  const isMobile = previewWidth <= devicePresets.mobile
  const isTablet = previewWidth > devicePresets.mobile && previewWidth <= devicePresets.tablet

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  // Calculate discount percentage
  const discountPercentage = Math.round(((course.price - course.discountPrice) / course.price) * 100)

  return (
    <div
      className="w-full bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop')",
        height: isMobile ? "auto" : isTablet ? "auto" : "auto",
      }}
    >
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-purple-900/90 to-orange-900/90"></div>

      {/* Content */}
      <div className="relative z-10 px-4 py-8 md:py-10 lg:py-12 max-w-7xl mx-auto">
        <div className="lg:flex items-start gap-8">
          {/* Left content */}
          <div className="lg:w-2/3 mb-8 lg:mb-0">
            {/* Top Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg">
                <Flame className="h-3.5 w-3.5 mr-1" /> Bestseller
              </Badge>
              <Badge className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-lg">
                <TrendingUp className="h-3.5 w-3.5 mr-1" /> Top Rated
              </Badge>
              <Badge
                variant="outline"
                className="bg-white/10 text-white backdrop-blur-sm border-white/20 shadow-lg hover:bg-white/20"
              >
                {course.level}
              </Badge>
            </div>

            {/* Title and Subtitle */}
            <h1
              className={`font-bold text-white mb-3 tracking-tight ${
                isMobile ? "text-2xl" : isTablet ? "text-3xl" : "text-4xl"
              }`}
            >
              {course.title}
            </h1>
            <p className={`text-white/90 font-light mb-4 ${isMobile ? "text-sm" : "text-base"}`}>{course.subtitle}</p>

            {/* Stats Row */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(course.rating) ? "text-yellow-400" : "text-white/30"}`}
                      fill={i < Math.floor(course.rating) ? "currentColor" : "none"}
                    />
                  ))}
                </div>
                <span className="ml-2 text-white font-medium text-sm">
                  {course.rating} ({course.reviewCount.toLocaleString()})
                </span>
              </div>
              <div className="flex items-center text-white/90 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5">
                <Users className="h-4 w-4 mr-1.5" />
                <span className="text-sm">{course.studentCount.toLocaleString()} students</span>
              </div>
              <div className="flex items-center text-white/90 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5">
                <Calendar className="h-4 w-4 mr-1.5" />
                <span className="text-sm">Updated {course.lastUpdated.toLocaleDateString()}</span>
              </div>
            </div>

            {/* Instructors */}
            <div className="flex items-center mb-6">
              <div className="flex -space-x-2 mr-3">
                {course.instructors.map((instructor) => (
                  <Avatar key={instructor.id} className="border-2 border-white h-10 w-10">
                    <AvatarImage src={getInstructorImage(instructor.id) || "/placeholder.svg"} alt={instructor.name} />
                    <AvatarFallback className="bg-orange-100 text-orange-600 text-xs">
                      {instructor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <div>
                <p className="text-white text-sm font-medium">
                  Created by {course.instructors.map((i) => i.name).join(" & ")}
                </p>
                <p className="text-white/70 text-xs">
                  {course.instructors[0].role} & {course.instructors[1].role}
                </p>
              </div>
            </div>

            {/* Course Quick Info */}
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="flex items-center text-white/90 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                <Clock className="h-4 w-4 mr-1.5 text-orange-300" />
                <span className="text-sm">{course.duration} hours</span>
              </div>
              <div className="flex items-center text-white/90 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                <Play className="h-4 w-4 mr-1.5 text-orange-300" />
                <span className="text-sm">{course.lectureCount} lectures</span>
              </div>
              <div className="flex items-center text-white/90 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                <Calendar className="h-4 w-4 mr-1.5 text-orange-300" />
                <span className="text-sm">{course.accessType} access</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button
                size={isMobile ? "sm" : "default"}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg border-0 transition-all duration-300 transform hover:scale-105"
              >
                <Sparkles className="mr-2 h-4 w-4" /> Enroll Now
              </Button>
              <Button
                variant="outline"
                size={isMobile ? "sm" : "default"}
                className="bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border-white/20 shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <Play className="mr-2 h-4 w-4" /> Watch Preview
              </Button>
              <Button
                variant="outline"
                size={isMobile ? "sm" : "default"}
                className="bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border-white/20 shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <Heart className="mr-2 h-4 w-4" /> Wishlist
              </Button>
            </div>
          </div>

          {/* Right content - Price card (desktop only) */}
          {!isMobile && !isTablet && (
            <div className="lg:w-1/3 bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-white">{formatPrice(course.discountPrice)}</span>
                  <span className="text-lg text-white/70 line-through">{formatPrice(course.price)}</span>
                </div>
                <Badge className="bg-orange-500 hover:bg-orange-600 text-white">{discountPercentage}% off</Badge>
              </div>

              <p className="text-white/80 text-sm mb-4">
                <span className="font-medium text-orange-300">Sale ends in</span>{" "}
                {Math.ceil((course.discountEnds.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
              </p>

              <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg border-0 h-12 text-base mb-3">
                Buy Now
              </Button>

              <p className="text-white/80 text-xs text-center">30-Day Money-Back Guarantee</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Helper function to get real instructor images
function getInstructorImage(id: string): string {
  const images = {
    "1": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
    "2": "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop",
    default: "/placeholder.svg?height=100&width=100",
  }

  return images[id as keyof typeof images] || images.default
}
