"use client";

import { useState } from "react";
import ExamsTable from "./components/table";
import DeleteExam from "./components/delete";
import useModalHandler from "./hooks/useModalHandler";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { useParams } from "next/navigation";

/**
 * Main Exams Page Component
 * @description Landing page for exam management with table and modals
 */
const Exams = () => {
    const { modalType, examId, closeModal, setModalState } = useModalHandler();
    const [refreshTable, setRefreshTable] = useState(false);
    const [selectedExam, setSelectedExam] = useState(null);

    const handleRefreshTable = () => {
        setRefreshTable((prev) => !prev);
    };

    return (
        <ErrorBoundary>
            <ExamsTable setModalState={setModalState} refreshTable={refreshTable} setSelectedExam={setSelectedExam} />
            <DeleteExam modalState={{ delete: modalType === "delete" }} closeModal={closeModal} examId={examId} setRefreshTable={handleRefreshTable} />
        </ErrorBoundary>
    );
};

export default Exams;
