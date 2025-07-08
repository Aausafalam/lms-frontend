"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import LessonFormBase from "..";
import { useLesson } from "@/services/context/lesson";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ErrorMessage } from "@/components/ui/error-message";
import { useQueryParams } from "@/lib/hooks/useQuery";

/**
 * Edit Lesson Page Component
 * @description Page for editing existing lessons
 */
const EditLesson = () => {
    const { lessonId } = useParams();
    const { lessonDetails } = useLesson();
    const { courseId, moduleId } = useQueryParams();

    useEffect(() => {
        if (lessonId && lessonDetails.fetch) {
            lessonDetails.fetch({ dynamicRoute: `/${courseId}/module/${moduleId}/lesson/${lessonId}` });
        }
    }, [lessonId]);

    if (lessonDetails.isLoading) {
        return (
            <div className="flex  items-center justify-center h-64">
                <LoadingSpinner size="lg" />
                <span className="ml-2">Loading lesson data...</span>
            </div>
        );
    }

    if (lessonDetails.error) {
        return <ErrorMessage title="Failed to load lesson" message={lessonDetails.error || "Unable to fetch lesson data"} onRetry={() => lessonDetails.fetch({ dynamicRoute: lessonId })} />;
    }

    if (!lessonDetails.data?.data) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-gray-500">Lesson data not found</p>
            </div>
        );
    }

    return <LessonFormBase initialData={lessonDetails.data.data} lessonId={lessonId} />;
};

export default EditLesson;
