"use client";
import { useEffect } from "react";
import GlobalUtils from "@/lib/utils";
import { useCourse } from "@/services/context/course";

const DeleteExam = ({ modalState, examId, setRefreshTable, closeModal }) => {
    const { examDelete } = useCourse();

    useEffect(() => {
        if (modalState.delete && examId) {
            const deletePayload = {
                recordId: examId,
                onShowDetails: () => {},
                deleteAction: examDelete,
                toggleRefreshData: setRefreshTable,
            };
            GlobalUtils.handleDelete(deletePayload);
            closeModal();
        }
    }, [modalState.delete, examId]);

    return null;
};

export default DeleteExam;
