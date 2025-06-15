"use client"
import { useEffect } from "react"
import GlobalUtils from "@/lib/utils"
import { useCourse } from "@/services/context/course"

const DeleteQuestion = ({ modalState, questionId, setRefreshTable, closeModal }) => {
  const { questionDelete } = useCourse()

  useEffect(() => {
    if (modalState.delete && questionId) {
      const deletePayload = {
        recordId: questionId,
        onShowDetails: () => {},
        deleteAction: questionDelete,
        toggleRefreshData: setRefreshTable,
      }
      GlobalUtils.handleDelete(deletePayload)
      closeModal()
    }
  }, [modalState.delete, questionId])

  return null
}

export default DeleteQuestion
