"use client"

import { useEffect } from "react"
import GlobalUtils from "@/lib/utils"

const DeleteRoute = ({ modalState, routeId, setRefreshTable, closeModal }) => {
  // Mock delete function - replace with actual API call
  const routeDelete = {
    execute: ({ recordId, onSuccess }) => {
      // Simulate API call
      setTimeout(() => {
        console.log(`Deleting route with ID: ${recordId}`)
        onSuccess?.()
      }, 1000)
    },
  }

  useEffect(() => {
    if (modalState.delete && routeId) {
      const deletePayload = {
        recordId: routeId,
        onShowDetails: () => {},
        deleteAction: routeDelete,
        toggleRefreshData: setRefreshTable,
      }
      GlobalUtils.handleDelete(deletePayload)
      closeModal()
    }
  }, [modalState.delete, routeId])

  return null
}

export default DeleteRoute
