"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import QuestionFormBase from ".."
import { sampleQuestionData } from "../utils/seeds"

const EditQuestion = () => {
  const { questionId } = useParams()
  const [initialData, setInitialData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchQuestionData() {
      setLoading(true)
      try {
        // In a real app, you would fetch from an API
        // const res = await fetch(`/api/questions/${questionId}`);
        // if (!res.ok) throw new Error("Failed to fetch question data");
        // const data = await res.json();
        const data = sampleQuestionData
        setInitialData(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    if (questionId) {
      fetchQuestionData()
    }
  }, [questionId])

  if (loading) return <div>Loading question data...</div>
  if (!initialData) return <div>Question data not found.</div>

  return <QuestionFormBase initialData={initialData} questionId={questionId} />
}

export default EditQuestion
