"use client"
import { useEffect } from "react"
import GlobalUtils from "@/lib/utils"
import { useCourse } from "@/services/context/course"

const DeleteExamBuilder = ({ modalState, examBuilderId, setRefreshTable, closeModal }) => {
  const { examBuilderDelete } = useCourse()

  useEffect(() => {
    if (modalState.delete && examBuilderId) {
      const deletePayload = {
        recordId: examBuilderId,
        onShowDetails: () => {},
        deleteAction: examBuilderDelete,
        toggleRefreshData: setRefreshTable,
      }
      GlobalUtils.handleDelete(deletePayload)
      closeModal()
    }
  }, [modalState.delete, examBuilderId])

  return null
}

export default DeleteExamBuilder
