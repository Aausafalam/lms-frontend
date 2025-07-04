"use client";
import { useState, useEffect, useCallback } from "react";
import { useNavigation } from "@/components/navigation";
import { sampleExamData, sampleQuestions } from "../utils/seeds";

export function useExamTaking(examId) {
    const { navigate } = useNavigation();
    const [exam, setExam] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [markedForReview, setMarkedForReview] = useState(new Set());
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchExamData();
    }, [examId]);

    useEffect(() => {
        if (exam && timeRemaining > 0) {
            const timer = setInterval(() => {
                setTimeRemaining((prev) => {
                    if (prev <= 1) {
                        handleSubmitExam();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [exam, timeRemaining]);

    const fetchExamData = async () => {
        setLoading(true);
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // In a real app, you would fetch from an API
            const examData = sampleExamData;
            const questionsData = sampleQuestions;

            setExam(examData);
            setQuestions(questionsData);
            setTimeRemaining(examData.duration * 60); // Convert minutes to seconds
        } catch (err) {
            setError("Failed to load exam data");
        } finally {
            setLoading(false);
        }
    };

    const handleAnswerChange = useCallback((questionId, answer) => {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: answer,
        }));
    }, []);

    const handleQuestionNavigation = useCallback(
        (index) => {
            if (index >= 0 && index < questions.length) {
                setCurrentQuestionIndex(index);
            }
        },
        [questions.length]
    );

    const handleSaveAndNext = useCallback(() => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
        }
    }, [currentQuestionIndex, questions.length]);

    const handleMarkForReview = useCallback((index) => {
        setMarkedForReview((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(index)) {
                newSet.delete(index);
            } else {
                newSet.add(index);
            }
            return newSet;
        });
    }, []);

    const handleSubmitExam = useCallback(async () => {
        try {
            // In a real app, you would submit to an API
            console.log("Submitting exam:", { examId, answers, timeSpent: exam.duration * 60 - timeRemaining });

            // Navigate to results page
            navigate(`/exam-panel/results/${examId}`);
        } catch (err) {
            setError("Failed to submit exam");
        }
    }, [examId, answers, exam, timeRemaining, navigate]);

    const isQuestionAnswered = useCallback(
        (index) => {
            const questionId = questions[index]?.id;
            return questionId && answers[questionId] !== undefined && answers[questionId] !== "";
        },
        [questions, answers]
    );

    const isQuestionMarkedForReview = useCallback(
        (index) => {
            return markedForReview.has(index);
        },
        [markedForReview]
    );

    return {
        exam,
        questions,
        currentQuestionIndex,
        answers,
        timeRemaining,
        loading,
        error,
        handleAnswerChange,
        handleQuestionNavigation,
        handleSubmitExam,
        handleSaveAndNext,
        handleMarkForReview,
        isQuestionAnswered,
        isQuestionMarkedForReview,
    };
}
