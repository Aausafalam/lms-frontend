"use client";
import { useState, useEffect } from "react";
import { sampleResultsData } from "../utils/seeds";

export function useExamResults(examId) {
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchResults();
    }, [examId]);

    const fetchResults = async () => {
        setLoading(true);
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // In a real app, you would fetch from an API
            const data = sampleResultsData;
            setResults(data);
        } catch (err) {
            setError("Failed to load exam results");
        } finally {
            setLoading(false);
        }
    };

    return {
        results,
        loading,
        error,
    };
}
