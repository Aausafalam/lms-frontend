"use client";

import { useState } from "react";
import QuestionsTable from "./components/table";
import DeleteQuestion from "./components/delete";
import useModalHandler from "./hooks/useModalHandler";
import { ErrorBoundary } from "@/components/ErrorBoundary";

/**
 * Main Questions Page Component
 * @description Landing page for question management with table and modals
 */
const Questions = () => {
    const { modalType, questionId, closeModal, setModalState } = useModalHandler();
    const [refreshTable, setRefreshTable] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState(null);

    const handleRefreshTable = () => {
        setRefreshTable((prev) => !prev);
    };

    return (
        <ErrorBoundary>
            <QuestionsTable setModalState={setModalState} refreshTable={refreshTable} setSelectedQuestion={setSelectedQuestion} />
            <DeleteQuestion modalState={{ delete: modalType === "delete" }} closeModal={closeModal} questionId={questionId} setRefreshTable={handleRefreshTable} />
        </ErrorBoundary>
    );
};

export default Questions;
