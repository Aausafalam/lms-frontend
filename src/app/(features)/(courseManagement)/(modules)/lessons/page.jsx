"use client";

import { useState } from "react";
import LessonsTable from "./components/table";
import useModalHandler from "./hooks/useModalHandler";
import DeleteLesson from "./components/delete";

const CourseLessons = ({ onModuleDetailsPage }) => {
    const { modalType, lessonId, closeModal, setModalState } = useModalHandler();
    const [refreshTable, setRefreshTable] = useState(false);
    const [selectedLesson, setSelectedLesson] = useState(null);

    return (
        <div className="min-h-screen">
            <div className="">
                <LessonsTable onModuleDetailsPage={onModuleDetailsPage} setModalState={setModalState} refreshTable={refreshTable} setSelectedLesson={setSelectedLesson} />
                <DeleteLesson modalState={{ delete: modalType === "delete" }} closeModal={closeModal} lessonId={lessonId} setRefreshTable={setRefreshTable} />
            </div>
        </div>
    );
};

export default CourseLessons;
