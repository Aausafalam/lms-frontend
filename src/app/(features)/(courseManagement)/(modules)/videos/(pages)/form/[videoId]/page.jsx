"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import VideoFormBase from ".."
import { sampleVideoData } from "../utils/seeds"

const EditVideo = () => {
  const { videoId } = useParams()
  const [initialData, setInitialData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchVideoData() {
      setLoading(true)
      try {
        // const res = await fetch(`/api/video/${videoId}`);
        // if (!res.ok) throw new Error("Failed to fetch video data");
        // const data = await res.json();
        const data = sampleVideoData
        setInitialData(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    if (videoId) {
      fetchVideoData()
    }
  }, [videoId])

  if (loading) return <div>Loading video data...</div>
  if (!initialData) return <div>Video data not found.</div>

  return <VideoFormBase initialData={initialData} videoId={videoId} />
}

export default EditVideo
