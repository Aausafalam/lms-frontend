"use client";
import { useEffect } from "react";
import GlobalUtils from "@/lib/utils";
import { useCourse } from "@/services/context/course";

const DeleteVideos = ({ modalState, videosId, setRefreshTable, closeModal }) => {
    const { videosDelete } = useCourse();

    useEffect(() => {
        if (modalState.delete && videosId) {
            const deletePayload = {
                recordId: videosId,
                onShowDetails: () => {},
                deleteAction: videosDelete,
                toggleRefreshData: setRefreshTable,
            };
            GlobalUtils.handleDelete(deletePayload);
            closeModal();
        }
    }, [modalState.delete, videosId]);

    return null;
};

export default DeleteVideos;
