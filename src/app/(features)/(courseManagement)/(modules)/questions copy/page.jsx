"use client";
import { useState } from "react";
import QuestionPanelTable from "./components/table";
import useModalHandler from "./hooks/useModalHandler";
import DeleteQuestion from "./components/delete";

const QuestionPanel = ({ onDetailsPage }) => {
    const { modalType, questionId, closeModal, setModalState } = useModalHandler();
    const [refreshTable, setRefreshTable] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState(null);

    return (
        <div>
            <QuestionPanelTable setModalState={setModalState} refreshTable={refreshTable} setSelectedQuestion={setSelectedQuestion} onDetailsPage={onDetailsPage} />
            {/* Delete Question Modal */}
            <DeleteQuestion modalState={{ delete: modalType === "delete" }} closeModal={closeModal} questionId={questionId} setRefreshTable={setRefreshTable} />
        </div>
    );
};

export default QuestionPanel;
