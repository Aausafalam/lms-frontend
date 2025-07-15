"use client";

import { createContext, useContext } from "react";
import { useExamPatternCreate, useExamPatternDelete, useExamPatternGetDetails, useExamPatternGetStats, useExamPatternUpdate } from "../hooks/exam-pattern";

const ExamPatternContext = createContext(null);

export const ExamPatternProvider = ({ children, initialData = { examPatternList: [] } }) => {
    const useExamPatternCreateState = useExamPatternCreate();
    const useExamPatternUpdateState = useExamPatternUpdate();
    const useExamPatternGetDetailsState = useExamPatternGetDetails();
    const useExamPatternDeleteState = useExamPatternDelete();
    const useExamPatternGetStatsState = useExamPatternGetStats();

    return (
        <ExamPatternContext.Provider
            value={{
                ...useExamPatternCreateState,
                ...useExamPatternUpdateState,
                ...useExamPatternGetDetailsState,
                ...useExamPatternDeleteState,
                ...useExamPatternGetStatsState,
            }}
        >
            {children}
        </ExamPatternContext.Provider>
    );
};

export const useExamPattern = () => {
    const context = useContext(ExamPatternContext);
    if (context === null) {
        throw new Error("useExamPattern must be used within a ExamPatternProvider");
    }
    return context;
};
