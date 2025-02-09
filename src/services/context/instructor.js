"use client";

import { createContext, useContext } from "react";
import { useInstructorCreate, useInstructorDelete, useInstructorGetDetails, useInstructorGetStats, useInstructorUpdate } from "../hooks/instructor";

const InstructorContext = createContext(null);

export const InstructorProvider = ({ children, initialData = { instructorList: [] } }) => {
    const useInstructorCreateState = useInstructorCreate();
    const useInstructorUpdateState = useInstructorUpdate();
    const useInstructorGetDetailsState = useInstructorGetDetails();
    const useInstructorDeleteState = useInstructorDelete();
    const useInstructorGetStatsState = useInstructorGetStats();

    return (
        <InstructorContext.Provider
            value={{
                ...useInstructorCreateState,
                ...useInstructorUpdateState,
                ...useInstructorGetDetailsState,
                ...useInstructorDeleteState,
                ...useInstructorGetStatsState,
            }}
        >
            {children}
        </InstructorContext.Provider>
    );
};

export const useInstructor = () => {
    const context = useContext(InstructorContext);
    if (context === null) {
        throw new Error("useInstructor must be used within a InstructorProvider");
    }
    return context;
};
