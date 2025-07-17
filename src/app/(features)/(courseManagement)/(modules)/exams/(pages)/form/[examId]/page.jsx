"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import ExamFormBase from "..";
import { useExam } from "@/services/context/exam";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ErrorMessage } from "@/components/ui/error-message";
import { useQueryParams } from "@/lib/hooks/useQuery";

/**
 * Edit Exam Page Component
 * @description Page for editing existing exams
 */
const EditExam = () => {
    const { examId } = useParams();
    const { examDetails } = useExam();
    const { courseId } = useQueryParams();

    useEffect(() => {
        if (examId && examDetails.fetch) {
            examDetails.fetch({ dynamicRoute: `/${courseId}/exam/${examId}` });
        }
    }, [examId]);

    if (examDetails.isLoading) {
        return (
            <div className="flex  items-center justify-center h-64">
                <LoadingSpinner size="lg" />
                <span className="ml-2">Loading exam data...</span>
            </div>
        );
    }

    if (examDetails.error) {
        return <ErrorMessage title="Failed to load exam" message={examDetails.error || "Unable to fetch exam data"} onRetry={() => examDetails.fetch({ dynamicRoute: examId })} />;
    }

    if (!examDetails.data?.data) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-gray-500">Exam data not found</p>
            </div>
        );
    }

    return <ExamFormBase initialData={examDetails.data.data} examId={examId} />;
};

export default EditExam;
