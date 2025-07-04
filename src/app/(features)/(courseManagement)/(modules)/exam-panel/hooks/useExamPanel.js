"use client";
import { useState, useEffect } from "react";
import { useNavigation } from "@/components/navigation";
import { sampleExamPanelData } from "../utils/seeds";

export function useExamPanel() {
    const { navigate } = useNavigation();
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({});

    useEffect(() => {
        fetchExams();
    }, []);

    const fetchExams = async () => {
        setLoading(true);
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // In a real app, you would fetch from an API
            const data = sampleExamPanelData;
            setExams(data.exams);
            setStats(data.stats);
        } catch (error) {
            console.error("Error fetching exams:", error);
        } finally {
            setLoading(false);
        }
    };

    const refreshData = () => {
        fetchExams();
    };

    const handleExamStart = (examId) => {
        navigate(`/exam-panel/take-exam/${examId}`);
    };

    const handleExamResume = (examId) => {
        navigate(`/exam-panel/take-exam/${examId}`);
    };

    return {
        exams,
        loading,
        stats,
        refreshData,
        handleExamStart,
        handleExamResume,
    };
}
