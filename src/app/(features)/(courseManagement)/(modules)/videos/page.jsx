"use client";
import React from "react";
import VideosTable from "./components/table";
import useModalHandler from "./hooks/useModalHandler";
import DeleteVideos from "./components/delete";

const CourseVideos = ({ onModuleDetailsPage }) => {
    const { modalType, videosId, closeModal, setModalState } = useModalHandler();
    const [refreshTable, setRefreshTable] = React.useState(false);
    const [selectedVideos, setSelectedVideos] = React.useState(null);

    return (
        <div>
            <VideosTable setModalState={setModalState} refreshTable={refreshTable} setSelectedVideos={setSelectedVideos} />
            {/* Delete Videos Modal */}
            <DeleteVideos modalState={{ delete: modalType === "delete" }} closeModal={closeModal} videosId={videosId} setRefreshTable={setRefreshTable} />
        </div>
    );
};

export default CourseVideos;
