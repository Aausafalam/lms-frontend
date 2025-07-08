"use client";

import { createContext, useContext } from "react";
import { useLessonCreate, useLessonDelete, useLessonGetDetails, useLessonGetStats, useLessonUpdate } from "../hooks/lesson";

const LessonContext = createContext(null);

export const LessonProvider = ({ children, initialData = { lessonList: [] } }) => {
    const useLessonCreateState = useLessonCreate();
    const useLessonUpdateState = useLessonUpdate();
    const useLessonGetDetailsState = useLessonGetDetails();
    const useLessonDeleteState = useLessonDelete();
    const useLessonGetStatsState = useLessonGetStats();

    return (
        <LessonContext.Provider
            value={{
                ...useLessonCreateState,
                ...useLessonUpdateState,
                ...useLessonGetDetailsState,
                ...useLessonDeleteState,
                ...useLessonGetStatsState,
            }}
        >
            {children}
        </LessonContext.Provider>
    );
};

export const useLesson = () => {
    const context = useContext(LessonContext);
    if (context === null) {
        throw new Error("useLesson must be used within a LessonProvider");
    }
    return context;
};
