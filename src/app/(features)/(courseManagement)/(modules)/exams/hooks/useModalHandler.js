"use client";

import { useQueryParams } from "@/lib/hooks/useQuery";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

/**
 * Custom hook for managing modal state via URL parameters
 * @description Provides reusable modal state management functionality
 * @returns {Object} Modal state and handlers
 */
const useModalHandler = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { courseId: courseIdBYParams } = useParams();
    const { courseId: courseIdByQuery } = useQueryParams();
    const modalType = searchParams.get("modal");
    const examId = searchParams.get("id");
    const courseId = courseIdBYParams || courseIdByQuery;
    /**
     * Close modal by removing URL parameters
     */
    const closeModal = useCallback(() => {
        try {
            const params = new URLSearchParams(window.location.search);
            params.delete("modal");
            params.delete("id");
            router.push(`/courses/details/${courseId}?${params.toString()}`, { shallow: true });
        } catch (error) {
            console.error("Error closing modal:", error);
            router.push(`/courses/details/${courseId}`);
        }
    }, [router]);

    /**
     * Set modal state by updating URL parameters
     * @param {string} modal - Modal type
     * @param {string} id - Record ID
     */
    const setModalState = useCallback(
        (modal, id) => {
            try {
                const params = new URLSearchParams(window.location.search);

                if (id) params.set("id", id);
                if (modal) params.set("modal", modal);

                router.push(`/courses/details/${courseId}?${params.toString()}`, { shallow: true });
            } catch (error) {
                console.error("Error setting modal state:", error);
            }
        },
        [router]
    );

    return {
        modalType,
        examId,
        closeModal,
        setModalState,
    };
};

export default useModalHandler;
