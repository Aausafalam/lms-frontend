"use client"

import { useState, useEffect } from "react"
import { Clock, ChevronRight, BookOpen } from "lucide-react"
import Image from "next/image"
import { useNavigation } from "@/components/navigation"
import GlobalUtils from "@/lib/utils"
import { useQueryParams } from "@/lib/hooks/useQuery"
import { useParams } from "next/navigation"
import ApiUtils from "@/services/utils"
import apiConstants from "@/services/utils/constants"

export default function LessonCard({ data }) {
  const { navigate } = useNavigation()
  const { courseId } = useQueryParams()
  const { moduleDetailsId } = useParams()
  const [lessonData, setLessonData] = useState({
    id: "101",
    name: "Overview of Web Development",
    summary:
      "Get a comprehensive introduction to web development, covering HTML, CSS, and JavaScript. Learn the fundamentals of building responsive websites.",
    instructors: [
      {
        name: "Sarah Johnson",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
      },
      {
        name: "Michael Chen",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
      },
      {
        name: "Emily Rodriguez",
        image: "https://randomuser.me/api/portraits/women/28.jpg",
      },
    ],
    duration: "1 week",
    topicsCount: "15",
    thumbImage: "https://img.freepik.com/free-vector/website-development-banner-1687.jpg",
    featured: true,
    progress: 65,
  })

  useEffect(() => {
    if (data) {
      setLessonData((prevData) => ({ ...prevData, ...data }))
    }
  }, [data])

  const handleCardClick = () => {
    navigate(`/lessons/details/${lessonData.id}?courseId=${courseId}&moduleId=${moduleDetailsId}`)
  }

  const formatInstructorNames = () => {
    if (lessonData.instructors.length === 1) {
      return lessonData.instructors[0].name
    } else if (lessonData.instructors.length === 2) {
      return `${lessonData.instructors[0].name} & ${lessonData.instructors[1].name}`
    } else {
      return `${lessonData.instructors[0].name} +${lessonData.instructors.length - 1}`
    }
  }

  return (
    <div
      className="group relative w-full h-[300px] overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-300 hover:shadow-xl dark:bg-gray-800/90 dark:hover:bg-gray-800 cursor-pointer flex flex-col"
      onClick={handleCardClick}
    >
      {/* Banner image with gradient overlay */}
      <div className="relative h-36 w-full overflow-hidden">
        <Image
          width={1000}
          height={1000}
          src={
            `${apiConstants.BACKEND_API_BASE_URL || "/placeholder.svg"}/course/${courseId}/module/${moduleDetailsId}/lesson/${lessonData.id}/getImage?type=thumbnailUrl&token=${ApiUtils.getAuthToken()}` ||
            "/placeholder.svg?height=400&width=600"
          }
          alt={lessonData.name}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
      </div>

      {/* Card content */}
      <div className="relative p-4 flex flex-col flex-grow">
        {/* Title and duration */}
        <div className="mb-2 flex items-start justify-between">
          <h3 className="text-sm font-bold leading-tight text-gray-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors duration-200 line-clamp-2">
            {lessonData.name}
          </h3>
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 ml-2 shrink-0">
            <Clock className="mr-1 h-3 w-3" />
            <span>{lessonData.duration} hours</span>
          </div>
        </div>

        {/* Description */}
        <p className="min-h-14 text-xs leading-relaxed text-gray-600 dark:text-gray-300 line-clamp-3">
          {lessonData.summary}
        </p>

        {/* Footer with instructors and actions */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
          {/* Instructors */}
          <div className="flex items-center">
            <div className="flex -space-x-2 mr-2">
              {lessonData.instructors.slice(0, 3).map((instructor, index) => (
                <Image
                  key={index}
                  width={24}
                  height={24}
                  src={instructor.image || "/placeholder.svg?height=24&width=24"}
                  alt={instructor.name}
                  className={GlobalUtils.cn(
                    "h-6 w-6 rounded-full ring-1 ring-white dark:ring-gray-800",
                    lessonData.featured ? "ring-orange-500/50" : "",
                  )}
                />
              ))}
              {lessonData.instructors.length > 3 && (
                <div className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-[10px] font-medium text-gray-600 dark:text-gray-300 ring-1 ring-white dark:ring-gray-800">
                  +{lessonData.instructors.length - 3}
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate max-w-[120px]">
                {formatInstructorNames()}
              </span>
              <span className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <BookOpen className="mr-1 h-3 w-3" />
                {lessonData.topicsCount}
              </span>
            </div>
          </div>

          {/* Continue button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              navigate(`/lessons/details/${lessonData.id}?courseId=${courseId}&moduleId=${moduleDetailsId}`)
            }}
            className="flex items-center justify-center rounded-full h-7 w-7 bg-orange-500 text-white transition-all duration-300 hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/20"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
