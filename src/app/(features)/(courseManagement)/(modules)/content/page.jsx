"use client";
import React from "react";
import ContentTable from "./components/table";
import useModalHandler from "./hooks/useModalHandler";
import DeleteContent from "./components/delete";

const CourseContent = ({ onModuleDetailsPage }) => {
    const { modalType, contentId, closeModal, setModalState } = useModalHandler();
    const [refreshTable, setRefreshTable] = React.useState(false);
    const [selectedContent, setSelectedContent] = React.useState(null);

    return (
        <div>
            <ContentTable setModalState={setModalState} refreshTable={refreshTable} setSelectedContent={setSelectedContent} />
            {/* Delete Content Modal */}
            <DeleteContent modalState={{ delete: modalType === "delete" }} closeModal={closeModal} contentId={contentId} setRefreshTable={setRefreshTable} />
        </div>
    );
};

export default CourseContent;
