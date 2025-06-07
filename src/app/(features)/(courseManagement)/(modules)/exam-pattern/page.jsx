"use client";
import React from "react";
import ExamPatterTable from "./components/table";
import useModalHandler from "./hooks/useModalHandler";
import DeleteLesson from "./components/delete";

const ExamPattern = () => {
    const { modalType, examPatternId, closeModal, setModalState } = useModalHandler();
    const [refreshTable, setRefreshTable] = React.useState(false);
    const [selectedLesson, setSelectedLesson] = React.useState(null);

    return (
        <div>
            <ExamPatterTable setModalState={setModalState} refreshTable={refreshTable} setSelectedLesson={setSelectedLesson} />
            {/* Delete Lesson Modal */}
            <DeleteLesson modalState={{ delete: modalType === "delete" }} closeModal={closeModal} examPatternId={examPatternId} setRefreshTable={setRefreshTable} />
        </div>
    );
};

export default ExamPattern;
