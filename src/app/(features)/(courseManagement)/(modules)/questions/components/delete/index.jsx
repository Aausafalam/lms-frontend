"use client";

import { useEffect } from "react";
import GlobalUtils from "@/lib/utils";
import { useQuestion } from "@/services/context/question";
import { toast } from "@/components/ui/toast";
import { useParams } from "next/navigation";
import { useQueryParams } from "@/lib/hooks/useQuery";

/**
 * Delete Question Component
 * @description Handles question deletion with confirmation
 */
const DeleteQuestion = ({ modalState, questionId, setRefreshTable, closeModal }) => {
    const { questionDelete } = useQuestion();
    const { examId: examIdByParams } = useParams();
    const { courseId, examId: examIdByQuery } = useQueryParams();

    const examId = examIdByParams || examIdByQuery;
    useEffect(() => {
        if (modalState.delete && questionId) {
            try {
                const deletePayload = {
                    recordId: `/${courseId}/exam/${examId}/question/${questionId}`,
                    onShowDetails: closeModal,
                    deleteAction: questionDelete,
                    toggleRefreshData: () => setRefreshTable(),
                    onSuccess: () => {
                        toast.success("Question deleted successfully");
                    },
                    onError: (error) => {
                        toast.error(error?.message || "Failed to delete question");
                    },
                };

                GlobalUtils.handleDelete(deletePayload);
            } catch (error) {
                console.error("Error deleting question:", error);
                toast.error("An error occurred while deleting the question");
                closeModal();
            }
        }
    }, [modalState.delete, questionId, questionDelete, closeModal, setRefreshTable]);

    return null;
};

export default DeleteQuestion;
