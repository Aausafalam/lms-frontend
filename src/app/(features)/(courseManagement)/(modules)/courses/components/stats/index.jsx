"use client"

import { useState, useEffect } from "react"
import Stats from "@/components/stats"
import { Book, BookOpen, Clock, GraduationCap } from "lucide-react"

/**
 * Course Statistics Component
 * @description Displays course-related statistics and metrics
 */
const CourseStats = ({ className, data }) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const generateData = (statsData) => ({
    grid: isMobile ? 2 : 5,
    gridItems: [
      {
        title: "Total Courses",
        value: statsData?.totalCourses || 156,
        icon: <Book className="h-4 w-4 sm:h-5 sm:w-5" />,
        variant: "orange",
        trend: null,
      },
      {
        title: "Active Courses",
        value: statsData?.activeCourses || 89,
        icon: <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />,
        variant: "blue",
        trend: { value: 12, isPositive: true },
      },
      {
        title: "Ongoing Courses",
        value: statsData?.ongoingCourses || 23,
        icon: <Clock className="h-4 w-4 sm:h-5 sm:w-5" />,
        variant: "purple",
        trend: null,
      },
      {
        title: "Completed Courses",
        value: statsData?.completedCourses || 45,
        icon: <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5" />,
        variant: "green",
        trend: { value: 8, isPositive: true },
      },
      {
        title: "Draft Courses",
        value: statsData?.draftCourses || 12,
        icon: <Book className="h-4 w-4 sm:h-5 sm:w-5" />,
        variant: "gray",
        trend: null,
      },
    ],
    url: "/get-course-stats",
    method: "GET",
  })

  return <Stats generateData={generateData} className={className} data={data} />
}

export default CourseStats
