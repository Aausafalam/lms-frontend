"use client";
import React, { useState } from "react";
import ExamPatterTable from "./components/table";
import useModalHandler from "./hooks/useModalHandler";
import DeleteLesson from "./components/delete";

const ExamPattern = () => {
    const { modalType, examPatternId, closeModal, setModalState } = useModalHandler();
    const [refreshTable, setRefreshTable] = useState(false);
    const [selectedExamPattern, setSelectedExamPatter] = useState(null);

    return (
        <div>
            <ExamPatterTable setModalState={setModalState} refreshTable={refreshTable} setSelectedExamPatter={setSelectedExamPatter} />
            {/* Delete Lesson Modal */}
            <DeleteLesson modalState={{ delete: modalType === "delete" }} closeModal={closeModal} examPatternId={examPatternId} setRefreshTable={setRefreshTable} />
        </div>
    );
};

export default ExamPattern;
