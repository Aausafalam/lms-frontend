"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ExamFormBase from "..";
import { sampleExamData } from "../utils/seeds";

const EditExam = () => {
    const { examId } = useParams();
    const [initialData, setInitialData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchExamData() {
            setLoading(true);
            try {
                // In a real app, you would fetch from an API
                // const res = await fetch(`/api/exam/${examId}`);
                // if (!res.ok) throw new Error("Failed to fetch exam builder data");
                // const data = await res.json();
                const data = sampleExamData;
                setInitialData(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        if (examId) {
            fetchExamData();
        }
    }, [examId]);

    if (loading) return <div>Loading exam builder data...</div>;
    if (!initialData) return <div>Exam builder data not found.</div>;

    return <ExamFormBase initialData={initialData} examId={examId} />;
};

export default EditExam;
