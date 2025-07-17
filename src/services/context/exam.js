"use client";

import { createContext, useContext } from "react";
import { useExamCreate, useExamDelete, useExamGetDetails, useExamGetStats, useExamUpdate } from "../hooks/exam";

const ExamContext = createContext(null);

export const ExamProvider = ({ children, initialData = { examList: [] } }) => {
    const useExamCreateState = useExamCreate();
    const useExamUpdateState = useExamUpdate();
    const useExamGetDetailsState = useExamGetDetails();
    const useExamDeleteState = useExamDelete();
    const useExamGetStatsState = useExamGetStats();

    return (
        <ExamContext.Provider
            value={{
                ...useExamCreateState,
                ...useExamUpdateState,
                ...useExamGetDetailsState,
                ...useExamDeleteState,
                ...useExamGetStatsState,
            }}
        >
            {children}
        </ExamContext.Provider>
    );
};

export const useExam = () => {
    const context = useContext(ExamContext);
    if (context === null) {
        throw new Error("useExam must be used within a ExamProvider");
    }
    return context;
};
