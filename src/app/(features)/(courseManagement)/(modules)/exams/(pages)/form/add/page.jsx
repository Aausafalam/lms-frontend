"use client";

import { useQueryParams } from "@/lib/hooks/useQuery";
import ExamFormBase from "..";
import { ErrorBoundary } from "@/components/ErrorBoundary";

/**
 * Add Exam Page Component
 * @description Page for creating new exams
 */
const AddExam = () => {
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
            <ExamFormBase initialData={parsedData} />
        </ErrorBoundary>
    );
};

export default AddExam;
