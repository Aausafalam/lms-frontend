"use client"

import { useEffect } from "react"
import GlobalUtils from "@/lib/utils"

const DeleteRole = ({ modalState, roleId, setRefreshTable, closeModal }) => {
  // Mock delete function - replace with actual API call
  const roleDelete = {
    execute: ({ recordId, onSuccess }) => {
      // Simulate API call
      setTimeout(() => {
        console.log(`Deleting role with ID: ${recordId}`)
        onSuccess?.()
      }, 1000)
    },
  }

  useEffect(() => {
    if (modalState.delete && roleId) {
      const deletePayload = {
        recordId: roleId,
        onShowDetails: () => {},
        deleteAction: roleDelete,
        toggleRefreshData: setRefreshTable,
      }
      GlobalUtils.handleDelete(deletePayload)
      closeModal()
    }
  }, [modalState.delete, roleId])

  return null
}

export default DeleteRole
