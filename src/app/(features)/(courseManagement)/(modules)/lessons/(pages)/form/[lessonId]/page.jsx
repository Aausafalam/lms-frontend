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
        // const res = await fetch(`/api/lessons/${lessonId}`);
        // if (!res.ok) throw new Error("Failed to fetch lesson data");
        // const data = await res.json();
        const data = sampleLessonData
        setInitialData(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    if (lessonId) {
      fetchLessonData()
    }
  }, [lessonId])

  if (loading) return <div>Loading lesson data...</div>
  if (!initialData) return <div>Lesson data not found.</div>

  return <LessonFormBase initialData={initialData} lessonId={lessonId} />
}

export default EditLesson
