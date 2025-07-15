"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import ExamPatternFormBase from "..";
import { useExamPattern } from "@/services/context/exam-pattern";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ErrorMessage } from "@/components/ui/error-message";
import { useQueryParams } from "@/lib/hooks/useQuery";

/**
 * Edit ExamPattern Page Component
 * @description Page for editing existing examPatterns
 */
const EditExamPattern = () => {
    const { examPatternId } = useParams();
    const { examPatternDetails } = useExamPattern();
    const { courseId } = useQueryParams();

    useEffect(() => {
        if (examPatternId && examPatternDetails.fetch) {
            examPatternDetails.fetch({ dynamicRoute: `/${courseId}/exam-pattern/${examPatternId}` });
        }
    }, [examPatternId]);

    if (examPatternDetails.isLoading) {
        return (
            <div className="flex  items-center justify-center h-64">
                <LoadingSpinner size="lg" />
                <span className="ml-2">Loading exam pattern data...</span>
            </div>
        );
    }

    if (examPatternDetails.error) {
        return (
            <ErrorMessage
                title="Failed to load exam pattern"
                message={examPatternDetails.error || "Unable to fetch exam pattern data"}
                onRetry={() => examPatternDetails.fetch({ dynamicRoute: examPatternId })}
            />
        );
    }

    if (!examPatternDetails.data?.data) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-gray-500">Exam Pattern data not found</p>
            </div>
        );
    }

    return <ExamPatternFormBase initialData={examPatternDetails.data.data} examPatternId={examPatternId} />;
};

export default EditExamPattern;
