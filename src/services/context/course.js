"use client";

import { createContext, useContext } from "react";
import { useCourseCreate, useCourseDelete, useCourseGetDetails, useCourseGetStats, useCourseUpdate } from "../hooks/course";

const CourseContext = createContext(null);

export const CourseProvider = ({ children, initialData = { courseList: [] } }) => {
    const useCourseCreateState = useCourseCreate();
    const useCourseUpdateState = useCourseUpdate();
    const useCourseGetDetailsState = useCourseGetDetails();
    const useCourseDeleteState = useCourseDelete();
    const useCourseGetStatsState = useCourseGetStats();

    return (
        <CourseContext.Provider
            value={{
                ...useCourseCreateState,
                ...useCourseUpdateState,
                ...useCourseGetDetailsState,
                ...useCourseDeleteState,
                ...useCourseGetStatsState,
            }}
        >
            {children}
        </CourseContext.Provider>
    );
};

export const useCourse = () => {
    const context = useContext(CourseContext);
    if (context === null) {
        throw new Error("useCourse must be used within a CourseProvider");
    }
    return context;
};
