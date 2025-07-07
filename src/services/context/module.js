"use client";

import { createContext, useContext } from "react";
import { useModuleCreate, useModuleDelete, useModuleGetDetails, useModuleGetStats, useModuleUpdate } from "../hooks/module";

const ModuleContext = createContext(null);

export const ModuleProvider = ({ children, initialData = { moduleList: [] } }) => {
    const useModuleCreateState = useModuleCreate();
    const useModuleUpdateState = useModuleUpdate();
    const useModuleGetDetailsState = useModuleGetDetails();
    const useModuleDeleteState = useModuleDelete();
    const useModuleGetStatsState = useModuleGetStats();

    return (
        <ModuleContext.Provider
            value={{
                ...useModuleCreateState,
                ...useModuleUpdateState,
                ...useModuleGetDetailsState,
                ...useModuleDeleteState,
                ...useModuleGetStatsState,
            }}
        >
            {children}
        </ModuleContext.Provider>
    );
};

export const useModule = () => {
    const context = useContext(ModuleContext);
    if (context === null) {
        throw new Error("useModule must be used within a ModuleProvider");
    }
    return context;
};
