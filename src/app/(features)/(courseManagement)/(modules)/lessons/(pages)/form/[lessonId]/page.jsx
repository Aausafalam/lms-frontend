"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import LessonFormBase from ".."
import { sampleLessonData } from "../utils/seeds"

const EditLesson = () => {
  const { lessonId } = useParams()
  const [initialData, setInitialData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchLessonData() {
      setLoading(true)
      try {
        const data = sampleLessonData
        setInitialData(data)
      } catch (error) {
        console.error("Failed to fetch lesson data:", error)
      } finally {
        setLoading(false)
      }
    }

    if (lessonId) {
      fetchLessonData()
    }
  }, [lessonId])

  if (loading) return <div className="flex items-center justify-center h-64">Loading lesson data...</div>
  if (!initialData) return <div className="flex items-center justify-center h-64">Lesson data not found.</div>

  return <LessonFormBase initialData={initialData} lessonId={lessonId} />
}

export default EditLesson
