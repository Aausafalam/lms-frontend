"use client";

import { useState } from "react";
import ExamPatternsTable from "./components/table";
import DeleteExamPattern from "./components/delete";
import useModalHandler from "./hooks/useModalHandler";
import { ErrorBoundary } from "@/components/ErrorBoundary";

/**
 * Main Exam Patterns Page Component
 * @description Landing page for examPattern management with table and modals
 */
const ExamPatterns = () => {
    const { modalType, examPatternId, closeModal, setModalState } = useModalHandler();
    const [refreshTable, setRefreshTable] = useState(false);
    const [selectedExamPattern, setSelectedExamPattern] = useState(null);

    const handleRefreshTable = () => {
        setRefreshTable((prev) => !prev);
    };

    return (
        <ErrorBoundary>
            <ExamPatternsTable setModalState={setModalState} refreshTable={refreshTable} setSelectedExamPattern={setSelectedExamPattern} />
            <DeleteExamPattern modalState={{ delete: modalType === "delete" }} closeModal={closeModal} examPatternId={examPatternId} setRefreshTable={handleRefreshTable} />
        </ErrorBoundary>
    );
};

export default ExamPatterns;
