"use client";

import { useQueryParams } from "@/lib/hooks/useQuery";
import ExamPatternFormBase from "..";
import { ErrorBoundary } from "@/components/ErrorBoundary";

/**
 * Add ExamPattern Page Component
 * @description Page for creating new examPatterns
 */
const AddExamPattern = () => {
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
            <ExamPatternFormBase initialData={parsedData} />
        </ErrorBoundary>
    );
};

export default AddExamPattern;
