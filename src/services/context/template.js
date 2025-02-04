"use client";

import { createContext, useContext } from "react";
import { useTemplateList } from "../hooks/template";

const TemplateContext = createContext(null);

export const TemplateProvider = ({ children }) => {
    const templateListState = useTemplateList();

    return (
        <TemplateContext.Provider
            value={{
                ...templateListState,
            }}
        >
            {children}
        </TemplateContext.Provider>
    );
};

export const useTemplate = () => {
    const context = useContext(TemplateContext);
    if (context === null) {
        throw new Error("useTemplate must be used within a UserProvider");
    }
    return context;
};
