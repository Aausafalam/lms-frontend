"use client"

import { useEffect } from "react"
import GlobalUtils from "@/lib/utils"

const DeletePrivilege = ({ modalState, privilegeId, setRefreshTable, closeModal }) => {
  // Mock delete function - replace with actual API call
  const privilegeDelete = {
    execute: ({ recordId, onSuccess }) => {
      // Simulate API call
      setTimeout(() => {
        console.log(`Deleting privilege with ID: ${recordId}`)
        onSuccess?.()
      }, 1000)
    },
  }

  useEffect(() => {
    if (modalState.delete && privilegeId) {
      const deletePayload = {
        recordId: privilegeId,
        onShowDetails: () => {},
        deleteAction: privilegeDelete,
        toggleRefreshData: setRefreshTable,
      }
      GlobalUtils.handleDelete(deletePayload)
      closeModal()
    }
  }, [modalState.delete, privilegeId])

  return null
}

export default DeletePrivilege
