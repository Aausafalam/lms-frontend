"use client";
import { useEffect } from "react";
import GlobalUtils from "@/lib/utils";
import { useCourse } from "@/services/context/course";

const DeleteContent = ({ modalState, contentId, setRefreshTable, closeModal }) => {
    const { contentDelete } = useCourse();

    useEffect(() => {
        if (modalState.delete && contentId) {
            const deletePayload = {
                recordId: contentId,
                onShowDetails: () => {},
                deleteAction: contentDelete,
                toggleRefreshData: setRefreshTable,
            };
            GlobalUtils.handleDelete(deletePayload);
            closeModal();
        }
    }, [modalState.delete, contentId]);

    return null;
};

export default DeleteContent;
