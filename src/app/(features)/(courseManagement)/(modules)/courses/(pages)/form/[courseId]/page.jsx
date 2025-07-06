"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CourseFormBase from "..";
import { sampleCourseData } from "../utils/seeds";
import { useCourse } from "@/services/context/course";

const EditCourse = () => {
    const { courseId } = useParams();
    const { courseDetails } = useCourse();
    const data = { ...courseDetails.data.data };

    useEffect(() => {
        courseDetails.fetch?.({ dynamicRoute: courseId });
    }, [courseId]);

    if (courseDetails.isLoading) return <div>Loading course data...</div>;
    if (!data) return <div>Course data not found.</div>;

    if (courseDetails.data.data) return <CourseFormBase initialData={data} courseId={courseId} />;
};

export default EditCourse;
