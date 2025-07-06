"use client";

import { useState } from "react";
import CoursesTable from "./components/table";
import DeleteCourse from "./components/delete";
import useModalHandler from "./hooks/useModalHandler";
import { ErrorBoundary } from "@/components/ErrorBoundary";

/**
 * Main Courses Page Component
 * @description Landing page for course management with table and modals
 */
const Courses = () => {
    const { modalType, courseId, closeModal, setModalState } = useModalHandler();
    const [refreshTable, setRefreshTable] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

    const handleRefreshTable = () => {
        setRefreshTable((prev) => !prev);
    };

    return (
        <ErrorBoundary>
            <CoursesTable setModalState={setModalState} refreshTable={refreshTable} setSelectedCourse={setSelectedCourse} />
            <DeleteCourse modalState={{ delete: modalType === "delete" }} closeModal={closeModal} courseId={courseId} setRefreshTable={handleRefreshTable} />
        </ErrorBoundary>
    );
};

export default Courses;
