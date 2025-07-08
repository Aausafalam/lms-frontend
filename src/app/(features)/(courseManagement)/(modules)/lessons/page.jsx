"use client";

import { useState } from "react";
import LessonsTable from "./components/table";
import DeleteLesson from "./components/delete";
import useModalHandler from "./hooks/useModalHandler";
import { ErrorBoundary } from "@/components/ErrorBoundary";

/**
 * Main Lessons Page Component
 * @description Landing page for lesson management with table and modals
 */
const Lessons = () => {
    const { modalType, lessonId, closeModal, setModalState } = useModalHandler();
    const [refreshTable, setRefreshTable] = useState(false);
    const [selectedLesson, setSelectedLesson] = useState(null);

    const handleRefreshTable = () => {
        setRefreshTable((prev) => !prev);
    };

    return (
        <ErrorBoundary>
            <LessonsTable setModalState={setModalState} refreshTable={refreshTable} setSelectedLesson={setSelectedLesson} />
            <DeleteLesson modalState={{ delete: modalType === "delete" }} closeModal={closeModal} lessonId={lessonId} setRefreshTable={handleRefreshTable} />
        </ErrorBoundary>
    );
};

export default Lessons;
