"use client";
import { useEffect } from "react";
import GlobalUtils from "@/lib/utils";
import { useCourse } from "@/services/context/course";

const DeleteExamPattern = ({ modalState, examPatternId, setRefreshTable, closeModal }) => {
    const { examPatternDelete } = useCourse();

    useEffect(() => {
        if (modalState.delete && examPatternId) {
            const deletePayload = {
                recordId: examPatternId,
                onShowDetails: () => {},
                deleteAction: examPatternDelete,
                toggleRefreshData: setRefreshTable,
            };
            GlobalUtils.handleDelete(deletePayload);
            closeModal();
        }
    }, [modalState.delete, examPatternId]);

    return null;
};

export default DeleteExamPattern;
