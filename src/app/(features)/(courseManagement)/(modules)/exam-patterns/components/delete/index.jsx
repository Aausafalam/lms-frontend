"use client";

import { useEffect } from "react";
import GlobalUtils from "@/lib/utils";
import { useExamPattern } from "@/services/context/exam-pattern";
import { toast } from "@/components/ui/toast";
import { useParams } from "next/navigation";
import { useQueryParams } from "@/lib/hooks/useQuery";

/**
 * Delete ExamPattern Component
 * @description Handles examPattern deletion with confirmation
 */
const DeleteExamPattern = ({ modalState, examPatternId, setRefreshTable, closeModal }) => {
    const { examPatternDelete } = useExamPattern();
    const { courseId: courseIdByParams } = useParams();
    const { courseId: courseIdByQuery } = useQueryParams();
    const courseId = courseIdByParams || courseIdByQuery;
    useEffect(() => {
        if (modalState.delete && examPatternId) {
            try {
                const deletePayload = {
                    recordId: `/${courseId}/exam-pattern/${examPatternId}`,
                    onShowDetails: closeModal,
                    deleteAction: examPatternDelete,
                    toggleRefreshData: () => setRefreshTable(),
                    onSuccess: () => {
                        toast.success("Exam Pattern deleted successfully");
                    },
                    onError: (error) => {
                        toast.error(error?.message || "Failed to delete exam pattern");
                    },
                };

                GlobalUtils.handleDelete(deletePayload);
            } catch (error) {
                console.error("Error deleting exam pattern:", error);
                toast.error("An error occurred while deleting the exam pattern");
                closeModal();
            }
        }
    }, [modalState.delete, examPatternId, examPatternDelete, closeModal, setRefreshTable]);

    return null;
};

export default DeleteExamPattern;
