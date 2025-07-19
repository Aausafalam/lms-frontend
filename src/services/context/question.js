"use client";

import { createContext, useContext } from "react";
import { useQuestionCreate, useQuestionDelete, useQuestionGetDetails, useQuestionGetStats, useQuestionUpdate } from "../hooks/question";

const QuestionContext = createContext(null);

export const QuestionProvider = ({ children, initialData = { questionList: [] } }) => {
    const useQuestionCreateState = useQuestionCreate();
    const useQuestionUpdateState = useQuestionUpdate();
    const useQuestionGetDetailsState = useQuestionGetDetails();
    const useQuestionDeleteState = useQuestionDelete();
    const useQuestionGetStatsState = useQuestionGetStats();

    return (
        <QuestionContext.Provider
            value={{
                ...useQuestionCreateState,
                ...useQuestionUpdateState,
                ...useQuestionGetDetailsState,
                ...useQuestionDeleteState,
                ...useQuestionGetStatsState,
            }}
        >
            {children}
        </QuestionContext.Provider>
    );
};

export const useQuestion = () => {
    const context = useContext(QuestionContext);
    if (context === null) {
        throw new Error("useQuestion must be used within a QuestionProvider");
    }
    return context;
};
