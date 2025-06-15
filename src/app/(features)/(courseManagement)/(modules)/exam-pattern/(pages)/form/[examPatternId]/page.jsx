"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ExamFormBase from "..";
import { sampleExamPatternData } from "../utils/seeds";

const EditExamPattern = () => {
    const { examPatternId } = useParams();
    const [initialData, setInitialData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchExamData() {
            setLoading(true);
            try {
                // In a real app, you would fetch from an API
                // const res = await fetch(`/api/exams/${examPatternId}`);
                // if (!res.ok) throw new Error("Failed to fetch exam data");
                // const data = await res.json();
                const data = sampleExamPatternData;
                setInitialData(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        if (examPatternId) {
            fetchExamData();
        }
    }, [examPatternId]);

    if (loading) return <div>Loading exam data...</div>;
    if (!initialData) return <div>Exam data not found.</div>;

    return <ExamFormBase initialData={initialData} examPatternId={examPatternId} />;
};

export default EditExamPattern;
