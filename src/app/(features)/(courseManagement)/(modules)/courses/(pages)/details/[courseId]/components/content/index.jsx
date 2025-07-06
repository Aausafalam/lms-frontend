"use client"

import { useParams } from "next/navigation"
import { CourseDetailPreview } from "../../../../form/components/preview/course-detail-preview"
import ExamPattern from "@/app/(features)/(courseManagement)/(modules)/exam-pattern/page"
import Exam from "@/app/(features)/(courseManagement)/(modules)/exam/page"
import { sampleCourseData } from "../../../../form/utils/seeds"
import CourseModules from "@/app/(features)/(courseManagement)/(modules)/modules/page"

/**
 * Course Details Content Component
 * @description Renders different content based on active tab
 */
const CourseDetailsContent = ({ activeTab }) => {
  const { courseId } = useParams()

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <CourseDetailPreview initialData={sampleCourseData} onDetailsPage={true} />
      case "modules":
        return <CourseModules onCourseDetailsPage={courseId} />
      case "exam-pattern":
        return <ExamPattern onCourseDetailsPage={courseId} />
      case "exam":
        return <Exam onCourseDetailsPage={courseId} />
      default:
        return <CourseDetailPreview initialData={sampleCourseData} onDetailsPage={true} />
    }
  }

  return <div className="course-details-content">{renderContent()}</div>
}

export default CourseDetailsContent
