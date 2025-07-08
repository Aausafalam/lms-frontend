"use client";

import { useQueryParams } from "@/lib/hooks/useQuery";
import LessonFormBase from "..";
import { ErrorBoundary } from "@/components/ErrorBoundary";

/**
 * Add Lesson Page Component
 * @description Page for creating new lessons
 */
const AddLesson = () => {
    const { initialData } = useQueryParams();

    let parsedData = {};

    if (initialData) {
        try {
            parsedData = JSON.parse(decodeURIComponent(initialData));
        } catch (error) {
            console.error("Error parsing initial data:", error);
        }
    }

    return (
        <ErrorBoundary>
            <LessonFormBase initialData={parsedData} />
        </ErrorBoundary>
    );
};

export default AddLesson;
