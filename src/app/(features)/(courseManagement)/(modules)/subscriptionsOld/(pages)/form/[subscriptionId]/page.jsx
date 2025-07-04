"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import SubscriptionFormBase from ".."
import { sampleSubscriptionData } from "../utils/seeds"

const EditSubscription = () => {
  const { subscriptionId } = useParams()
  const [initialData, setInitialData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchSubscriptionData() {
      setLoading(true)
      try {
        const data = sampleSubscriptionData
        setInitialData(data)
      } catch (error) {
        console.error("Failed to fetch subscription data:", error)
      } finally {
        setLoading(false)
      }
    }

    if (subscriptionId) {
      fetchSubscriptionData()
    }
  }, [subscriptionId])

  if (loading) return <div className="flex items-center justify-center h-64">Loading subscription data...</div>
  if (!initialData) return <div className="flex items-center justify-center h-64">Subscription data not found.</div>

  return <SubscriptionFormBase initialData={initialData} subscriptionId={subscriptionId} />
}

export default EditSubscription
