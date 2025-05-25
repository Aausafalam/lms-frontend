"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CourseFormBase from "..";
import { sampleCourseData } from "../utils/seeds";

const EditCourse = () => {
    const { courseId } = useParams();
    const [initialData, setInitialData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Replace with actual data fetch
        async function fetchCourseData() {
            setLoading(true);
            try {
                // const res = await fetch(`/api/courses/${courseId}`);
                // if (!res.ok) throw new Error("Failed to fetch course data");
                // const data = await res.json();
                const data = sampleCourseData;
                setInitialData(data);
            } catch (error) {
                console.error(error);
                // handle error state
            } finally {
                setLoading(false);
            }
        }
        if (courseId) {
            fetchCourseData();
        }
    }, [courseId]);

    if (loading) return <div>Loading course data...</div>;
    if (!initialData) return <div>Course data not found.</div>;

    return <CourseFormBase initialData={initialData} courseId={courseId} />;
};

export default EditCourse;
