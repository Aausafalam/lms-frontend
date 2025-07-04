"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import UserDetailsSidebar from "./components/sidebar"
import UserDetailsContent from "./components/content"
import { mockUserDetails } from "./utils/seeds"

const UserDetailsPage = () => {
  const params = useParams()
  const userId = params.userId
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchUser = async () => {
      try {
        setLoading(true)
        // Replace with actual API call
        const userData = mockUserDetails.find((u) => u.id === Number.parseInt(userId))
        setUser(userData)
      } catch (error) {
        console.error("Error fetching user:", error)
      } finally {
        setLoading(false)
      }
    }

    if (userId) {
      fetchUser()
    }
  }, [userId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading user details...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">User Not Found</h2>
          <p className="text-gray-600 mb-4">The user you're looking for doesn't exist.</p>
          <a
            href="/rbac/users"
            className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            Back to Users
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="">
      <div className="flex">
        <UserDetailsSidebar user={user} />
        <UserDetailsContent user={user} />
      </div>
    </div>
  )
}

export default UserDetailsPage
