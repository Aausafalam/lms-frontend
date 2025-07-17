"use client";

import { useEffect } from "react";
import GlobalUtils from "@/lib/utils";
import { useExam } from "@/services/context/exam";
import { toast } from "@/components/ui/toast";
import { useParams } from "next/navigation";
import { useQueryParams } from "@/lib/hooks/useQuery";

/**
 * Delete Exam Component
 * @description Handles exam deletion with confirmation
 */
const DeleteExam = ({ modalState, examId, setRefreshTable, closeModal }) => {
    const { examDelete } = useExam();
    const { courseId: courseIdByParams } = useParams();
    const { courseId: courseIdByQuery } = useQueryParams();
    const courseId = courseIdByParams || courseIdByQuery;
    useEffect(() => {
        if (modalState.delete && examId) {
            try {
                const deletePayload = {
                    recordId: `/${courseId}/exam/${examId}`,
                    onShowDetails: closeModal,
                    deleteAction: examDelete,
                    toggleRefreshData: () => setRefreshTable(),
                    onSuccess: () => {
                        toast.success("Exam deleted successfully");
                    },
                    onError: (error) => {
                        toast.error(error?.message || "Failed to delete exam");
                    },
                };

                GlobalUtils.handleDelete(deletePayload);
            } catch (error) {
                console.error("Error deleting exam:", error);
                toast.error("An error occurred while deleting the exam");
                closeModal();
            }
        }
    }, [modalState.delete, examId, examDelete, closeModal, setRefreshTable]);

    return null;
};

export default DeleteExam;
