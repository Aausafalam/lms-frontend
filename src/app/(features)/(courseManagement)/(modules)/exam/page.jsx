"use client";
import { useState } from "react";
import ExamTable from "./components/table";
import useModalHandler from "./hooks/useModalHandler";
import DeleteExam from "./components/delete";

const Exam = () => {
    const { modalType, examId, closeModal, setModalState } = useModalHandler();
    const [refreshTable, setRefreshTable] = useState(false);
    const [selectedExam, setSelectedExam] = useState(null);

    return (
        <div>
            <ExamTable setModalState={setModalState} refreshTable={refreshTable} setSelectedExam={setSelectedExam} />
            {/* Delete Exam Modal */}
            <DeleteExam modalState={{ delete: modalType === "delete" }} closeModal={closeModal} examId={examId} setRefreshTable={setRefreshTable} />
        </div>
    );
};

export default Exam;
