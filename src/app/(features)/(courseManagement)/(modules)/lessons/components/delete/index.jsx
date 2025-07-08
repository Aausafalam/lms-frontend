"use client";

import { useEffect } from "react";
import GlobalUtils from "@/lib/utils";
import { useLesson } from "@/services/context/lesson";
import { toast } from "@/components/ui/toast";
import { useParams } from "next/navigation";
import { useQueryParams } from "@/lib/hooks/useQuery";

/**
 * Delete Lesson Component
 * @description Handles lesson deletion with confirmation
 */
const DeleteLesson = ({ modalState, lessonId, setRefreshTable, closeModal }) => {
    const { lessonDelete } = useLesson();
    const { moduleId: moduleIdByParams } = useParams();
    const { courseId, moduleId: moduleIdByQuery } = useQueryParams();

    const moduleId = moduleIdByParams || moduleIdByQuery;
    useEffect(() => {
        if (modalState.delete && lessonId) {
            try {
                const deletePayload = {
                    recordId: `/${courseId}/module/${moduleId}/lesson/${lessonId}`,
                    onShowDetails: closeModal,
                    deleteAction: lessonDelete,
                    toggleRefreshData: () => setRefreshTable(),
                    onSuccess: () => {
                        toast.success("Lesson deleted successfully");
                    },
                    onError: (error) => {
                        toast.error(error?.message || "Failed to delete lesson");
                    },
                };

                GlobalUtils.handleDelete(deletePayload);
            } catch (error) {
                console.error("Error deleting lesson:", error);
                toast.error("An error occurred while deleting the lesson");
                closeModal();
            }
        }
    }, [modalState.delete, lessonId, lessonDelete, closeModal, setRefreshTable]);

    return null;
};

export default DeleteLesson;
