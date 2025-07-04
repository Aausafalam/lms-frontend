"use client";
import { useMemo } from "react";

export function useExamFiltering(exams, activeFilter, searchQuery) {
    return useMemo(() => {
        let filtered = exams;

        // Filter by status
        if (activeFilter !== "all") {
            filtered = filtered.filter((exam) => exam.status === activeFilter);
        }

        // Filter by search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter((exam) => exam.name.toLowerCase().includes(query) || exam.description.toLowerCase().includes(query) || exam.examCode?.toLowerCase().includes(query));
        }

        return filtered;
    }, [exams, activeFilter, searchQuery]);
}
