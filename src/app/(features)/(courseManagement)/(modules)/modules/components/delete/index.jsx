"use client";
import { useEffect } from "react";
import GlobalUtils from "@/lib/utils";
import { useCourse } from "@/services/context/course";

const DeleteModule = ({ modalState, moduleId, setRefreshTable, closeModal }) => {
    const { moduleDelete } = useCourse();

    useEffect(() => {
        if (modalState.delete && moduleId) {
            const deletePayload = {
                recordId: moduleId,
                onShowDetails: () => {},
                deleteAction: moduleDelete,
                toggleRefreshData: setRefreshTable,
            };
            GlobalUtils.handleDelete(deletePayload);
            closeModal();
        }
    }, [modalState.delete, moduleId]);

    return null;
};

export default DeleteModule;
