"use client"

import Stats from "@/components/stats"
import { Users, UserCheck, UserX, Clock, UserPlus } from "lucide-react"

const UserStats = ({ className }) => {
  const generateData = (data) => {
    return {
      grid: 5,
      gridItems: [
        {
          title: "Total Users",
          value: data?.totalUsers || 1247,
          icon: <Users className="h-5 w-5" />,
          variant: "orange",
          trend: null,
        },
        {
          title: "Active Users",
          value: data?.activeUsers || 1089,
          icon: <UserCheck className="h-5 w-5" />,
          variant: "green",
          trend: { value: 15, isPositive: true },
        },
        {
          title: "Inactive Users",
          value: data?.inactiveUsers || 98,
          icon: <UserX className="h-5 w-5" />,
          variant: "red",
          trend: { value: 3, isPositive: false },
        },
        {
          title: "Recent Logins",
          value: data?.recentLogins || 456,
          icon: <Clock className="h-5 w-5" />,
          variant: "blue",
          trend: { value: 8, isPositive: true },
        },
        {
          title: "New Users",
          value: data?.newUsers || 23,
          icon: <UserPlus className="h-5 w-5" />,
          variant: "purple",
          trend: { value: 12, isPositive: true },
        },
      ],
      url: "/get-user-stats",
      method: "GET",
    }
  }

  return <Stats generateData={generateData} className={className} />
}

export default UserStats
