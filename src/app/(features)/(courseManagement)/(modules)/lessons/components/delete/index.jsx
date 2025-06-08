"use client"

import { useEffect } from "react"
import GlobalUtils from "@/lib/utils"
import { useCourse } from "@/services/context/course"

const DeleteLesson = ({ modalState, lessonId, setRefreshTable, closeModal }) => {
  const { lessonDelete } = useCourse()

  useEffect(() => {
    if (modalState.delete && lessonId) {
      const deletePayload = {
        recordId: lessonId,
        onShowDetails: () => {},
        deleteAction: lessonDelete,
        toggleRefreshData: setRefreshTable,
      }
      GlobalUtils.handleDelete(deletePayload)
      closeModal()
    }
  }, [modalState.delete, lessonId, lessonDelete, setRefreshTable, closeModal])

  return null
}

export default DeleteLesson
