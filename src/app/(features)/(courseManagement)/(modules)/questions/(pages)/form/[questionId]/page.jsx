"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import QuestionFormBase from "..";
import { useQuestion } from "@/services/context/question";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ErrorMessage } from "@/components/ui/error-message";
import { useQueryParams } from "@/lib/hooks/useQuery";

/**
 * Edit Question Page Component
 * @description Page for editing existing questions
 */
const EditQuestion = () => {
    const { questionId } = useParams();
    const { questionDetails } = useQuestion();
    const { courseId, examId } = useQueryParams();

    useEffect(() => {
        if (questionId && questionDetails.fetch) {
            questionDetails.fetch({ dynamicRoute: `/${courseId}/exam/${examId}/question/${questionId}` });
        }
    }, [questionId]);

    if (questionDetails.isLoading) {
        return (
            <div className="flex  items-center justify-center h-64">
                <LoadingSpinner size="lg" />
                <span className="ml-2">Loading question data...</span>
            </div>
        );
    }

    if (questionDetails.error) {
        return <ErrorMessage title="Failed to load question" message={questionDetails.error || "Unable to fetch question data"} onRetry={() => questionDetails.fetch({ dynamicRoute: questionId })} />;
    }

    if (!questionDetails.data?.data) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-gray-500">Question data not found</p>
            </div>
        );
    }

    return <QuestionFormBase initialData={questionDetails.data.data} questionId={questionId} />;
};

export default EditQuestion;
