"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import ContentFormBase from ".."
import { sampleContentData } from "../utils/seeds"

const EditContent = () => {
  const { contentId } = useParams()
  const [initialData, setInitialData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchContentData() {
      setLoading(true)
      try {
        // const res = await fetch(`/api/content/${contentId}`);
        // if (!res.ok) throw new Error("Failed to fetch content data");
        // const data = await res.json();
        const data = sampleContentData
        setInitialData(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    if (contentId) {
      fetchContentData()
    }
  }, [contentId])

  if (loading) return <div>Loading content data...</div>
  if (!initialData) return <div>Content data not found.</div>

  return <ContentFormBase initialData={initialData} contentId={contentId} />
}

export default EditContent
