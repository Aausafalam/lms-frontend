"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import CourseFormBase from "..";
import { useCourse } from "@/services/context/course";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ErrorMessage } from "@/components/ui/error-message";

/**
 * Edit Course Page Component
 * @description Page for editing existing courses
 */
const EditCourse = () => {
    const { courseId } = useParams();
    const { courseDetails } = useCourse();

    useEffect(() => {
        if (courseId && courseDetails.fetch) {
            courseDetails.fetch({ dynamicRoute: courseId });
        }
    }, [courseId]);

    if (courseDetails.isLoading) {
        return (
            <div className="flex  items-center justify-center h-64">
                <LoadingSpinner size="lg" />
                <span className="ml-2">Loading course data...</span>
            </div>
        );
    }

    if (courseDetails.error) {
        return <ErrorMessage title="Failed to load course" message={courseDetails.error || "Unable to fetch course data"} onRetry={() => courseDetails.fetch({ dynamicRoute: courseId })} />;
    }

    if (!courseDetails.data?.data) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-gray-500">Course data not found</p>
            </div>
        );
    }

    return <CourseFormBase initialData={courseDetails.data.data} courseId={courseId} />;
};

export default EditCourse;
