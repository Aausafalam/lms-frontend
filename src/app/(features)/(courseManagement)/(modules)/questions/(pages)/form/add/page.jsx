"use client";

import { useQueryParams } from "@/lib/hooks/useQuery";
import QuestionFormBase from "..";
import { ErrorBoundary } from "@/components/ErrorBoundary";

/**
 * Add Question Page Component
 * @description Page for creating new questions
 */
const AddQuestion = () => {
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
            <QuestionFormBase initialData={parsedData} />
        </ErrorBoundary>
    );
};

export default AddQuestion;
