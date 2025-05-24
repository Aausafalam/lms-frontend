"use client";
import { useEffect } from "react";
import GlobalUtils from "@/lib/utils";
import { useCourse } from "@/services/context/course";

const DeleteCourse = ({ modalState, courseId, setRefreshTable, closeModal }) => {
    const { courseDelete } = useCourse();

    useEffect(() => {
        if (modalState.delete && courseId) {
            const deletePayload = {
                recordId: courseId,
                onShowDetails: () => {},
                deleteAction: courseDelete,
                toggleRefreshData: setRefreshTable,
            };
            GlobalUtils.handleDelete(deletePayload);
            closeModal();
        }
    }, [modalState.delete, courseId]);

    return null;
};

export default DeleteCourse;
