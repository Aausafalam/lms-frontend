"use client";
import { useState, useEffect } from "react";
import { sampleHistoryData } from "../utils/seeds";

export function useExamHistory() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({});

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        setLoading(true);
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // In a real app, you would fetch from an API
            const data = sampleHistoryData;
            setHistory(data.history);
            setStats(data.stats);
        } catch (error) {
            console.error("Error fetching exam history:", error);
        } finally {
            setLoading(false);
        }
    };

    return {
        history,
        loading,
        stats,
    };
}
