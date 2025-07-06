"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"

/**
 * Custom hook for managing modal state via URL parameters
 * @description Provides reusable modal state management functionality
 * @returns {Object} Modal state and handlers
 */
const useModalHandler = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const modalType = searchParams.get("modal")
  const courseId = searchParams.get("id")

  /**
   * Close modal by removing URL parameters
   */
  const closeModal = useCallback(() => {
    try {
      const params = new URLSearchParams(window.location.search)
      params.delete("modal")
      params.delete("id")
      router.push(`/courses?${params.toString()}`, { shallow: true })
    } catch (error) {
      console.error("Error closing modal:", error)
      router.push("/courses")
    }
  }, [router])

  /**
   * Set modal state by updating URL parameters
   * @param {string} modal - Modal type
   * @param {string} id - Record ID
   */
  const setModalState = useCallback(
    (modal, id) => {
      try {
        const params = new URLSearchParams(window.location.search)

        if (id) params.set("id", id)
        if (modal) params.set("modal", modal)

        router.push(`/courses?${params.toString()}`, { shallow: true })
      } catch (error) {
        console.error("Error setting modal state:", error)
      }
    },
    [router],
  )

  return {
    modalType,
    courseId,
    closeModal,
    setModalState,
  }
}

export default useModalHandler
