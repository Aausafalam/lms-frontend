"use client"
import { useState } from "react"
import ExamBuilderTable from "./components/table"
import useModalHandler from "./hooks/useModalHandler"
import DeleteExamBuilder from "./components/delete"

const ExamBuilder = () => {
  const { modalType, examBuilderId, closeModal, setModalState } = useModalHandler()
  const [refreshTable, setRefreshTable] = useState(false)
  const [selectedExamBuilder, setSelectedExamBuilder] = useState(null)

  return (
    <div>
      <ExamBuilderTable
        setModalState={setModalState}
        refreshTable={refreshTable}
        setSelectedExamBuilder={setSelectedExamBuilder}
      />
      {/* Delete Exam Builder Modal */}
      <DeleteExamBuilder
        modalState={{ delete: modalType === "delete" }}
        closeModal={closeModal}
        examBuilderId={examBuilderId}
        setRefreshTable={setRefreshTable}
      />
    </div>
  )
}

export default ExamBuilder
