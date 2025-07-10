"use client";

import { useState } from "react";
import VideosTable from "./components/table";
import DeleteVideo from "./components/delete";
import useModalHandler from "./hooks/useModalHandler";
import { ErrorBoundary } from "@/components/ErrorBoundary";

/**
 * Main Videos Page Component
 * @description Landing page for video management with table and modals
 */
const Videos = () => {
    const { modalType, videoId, closeModal, setModalState } = useModalHandler();
    const [refreshTable, setRefreshTable] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);

    const handleRefreshTable = () => {
        setRefreshTable((prev) => !prev);
    };

    return (
        <ErrorBoundary>
            <VideosTable setModalState={setModalState} refreshTable={refreshTable} setSelectedVideo={setSelectedVideo} />
            <DeleteVideo modalState={{ delete: modalType === "delete" }} closeModal={closeModal} videoId={videoId} setRefreshTable={handleRefreshTable} />
        </ErrorBoundary>
    );
};

export default Videos;
