"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import ExamBuilderFormBase from ".."
import { sampleExamBuilderData } from "../utils/seeds"

const EditExamBuilder = () => {
  const { examBuilderId } = useParams()
  const [initialData, setInitialData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchExamBuilderData() {
      setLoading(true)
      try {
        // In a real app, you would fetch from an API
        // const res = await fetch(`/api/exam-builder/${examBuilderId}`);
        // if (!res.ok) throw new Error("Failed to fetch exam builder data");
        // const data = await res.json();
        const data = sampleExamBuilderData
        setInitialData(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    if (examBuilderId) {
      fetchExamBuilderData()
    }
  }, [examBuilderId])

  if (loading) return <div>Loading exam builder data...</div>
  if (!initialData) return <div>Exam builder data not found.</div>

  return <ExamBuilderFormBase initialData={initialData} examBuilderId={examBuilderId} />
}

export default EditExamBuilder
