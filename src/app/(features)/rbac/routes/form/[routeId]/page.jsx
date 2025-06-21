"use client"
import { useParams } from "next/navigation"
import RouteFormBase from ".."
import { sampleRouteData } from "../utils/seeds"

const EditRoute = () => {
  const { routeId } = useParams()

  // In a real app, you would fetch the route data here
  // const { routeDetails } = useRouteGetDetails();

  const data = sampleRouteData // Replace with actual API call

  if (!data) {
    return <div className="flex items-center justify-center h-64">Route data not found.</div>
  }

  return <RouteFormBase initialData={data} routeId={routeId} />
}

export default EditRoute
