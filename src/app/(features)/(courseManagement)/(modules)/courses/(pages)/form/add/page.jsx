"use client"

import { useQueryParams } from "@/lib/hooks/useQuery"
import CourseFormBase from ".."
import { ErrorBoundary } from "@/components/ErrorBoundary"

/**
 * Add Course Page Component
 * @description Page for creating new courses
 */
const AddCourse = () => {
  const { initialData } = useQueryParams()

  let parsedData = {}

  if (initialData) {
    try {
      parsedData = JSON.parse(decodeURIComponent(initialData))
    } catch (error) {
      console.error("Error parsing initial data:", error)
    }
  }

  return (
    <ErrorBoundary>
      <CourseFormBase initialData={parsedData} />
    </ErrorBoundary>
  )
}

export default AddCourse
