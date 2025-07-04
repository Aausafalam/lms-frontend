"use client"

import { useEffect } from "react"
import GlobalUtils from "@/lib/utils"

const DeleteSubscription = ({ modalState, subscriptionId, setRefreshTable, closeModal }) => {
  // Mock delete function - replace with actual API call
  const subscriptionDelete = {
    execute: ({ recordId, onSuccess }) => {
      console.log("Deleting subscription:", recordId)
      setTimeout(() => {
        onSuccess?.()
      }, 1000)
    },
  }

  useEffect(() => {
    if (modalState.delete && subscriptionId) {
      const deletePayload = {
        recordId: subscriptionId,
        onShowDetails: () => {},
        deleteAction: subscriptionDelete,
        toggleRefreshData: setRefreshTable,
      }
      GlobalUtils.handleDelete(deletePayload)
      closeModal()
    }
  }, [modalState.delete, subscriptionId, setRefreshTable, closeModal])

  return null
}

export default DeleteSubscription
