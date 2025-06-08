"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import ModuleFormBase from ".."
import { sampleModuleData } from "../utils/seeds"

const EditModule = () => {
  const { moduleId } = useParams()
  const [initialData, setInitialData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchModuleData() {
      setLoading(true)
      try {
        const data = sampleModuleData
        setInitialData(data)
      } catch (error) {
        console.error("Failed to fetch module data:", error)
      } finally {
        setLoading(false)
      }
    }

    if (moduleId) {
      fetchModuleData()
    }
  }, [moduleId])

  if (loading) return <div className="flex items-center justify-center h-64">Loading module data...</div>
  if (!initialData) return <div className="flex items-center justify-center h-64">Module data not found.</div>

  return <ModuleFormBase initialData={initialData} moduleId={moduleId} />
}

export default EditModule
