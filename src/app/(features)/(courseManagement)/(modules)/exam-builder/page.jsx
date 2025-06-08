"use client";
import React from "react";
import LessonsTable from "./components/table";
import useModalHandler from "./hooks/useModalHandler";
import DeleteLesson from "./components/delete";

const CourseLessons = ({ onModuleDetailsPage }) => {
    const { modalType, lessonId, closeModal, setModalState } = useModalHandler();
    const [refreshTable, setRefreshTable] = React.useState(false);
    const [selectedLesson, setSelectedLesson] = React.useState(null);

    return (
        <div className="w-full">
            <LessonsTable onModuleDetailsPage={onModuleDetailsPage} setModalState={setModalState} refreshTable={refreshTable} setSelectedLesson={setSelectedLesson} />
            {/* Delete Lesson Modal */}
            <DeleteLesson modalState={{ delete: modalType === "delete" }} closeModal={closeModal} lessonId={lessonId} setRefreshTable={setRefreshTable} />
        </div>
    );
};

export default CourseLessons;
