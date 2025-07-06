"use client";

import { useEffect } from "react";
import GlobalUtils from "@/lib/utils";
import { useCourse } from "@/services/context/course";
import { toast } from "@/components/ui/toast";

/**
 * Delete Course Component
 * @description Handles course deletion with confirmation
 */
const DeleteCourse = ({ modalState, courseId, setRefreshTable, closeModal }) => {
    const { courseDelete } = useCourse();

    useEffect(() => {
        if (modalState.delete && courseId) {
            try {
                const deletePayload = {
                    recordId: courseId,
                    onShowDetails: closeModal,
                    deleteAction: courseDelete,
                    toggleRefreshData: () => setRefreshTable(),
                    onSuccess: () => {
                        toast.success("Course deleted successfully");
                    },
                    onError: (error) => {
                        toast.error(error?.message || "Failed to delete course");
                    },
                };

                GlobalUtils.handleDelete(deletePayload);
            } catch (error) {
                console.error("Error deleting course:", error);
                toast.error("An error occurred while deleting the course");
                closeModal();
            }
        }
    }, [modalState.delete, courseId, courseDelete, closeModal, setRefreshTable]);

    return null;
};

export default DeleteCourse;
