"use client";

import { createContext, useContext } from "react";
import { useRolesCreate, useRolesDelete, useRolesGetDetails, useRolesGetStats, useRolesUpdate } from "../hooks/roles";

const RolesContext = createContext(null);

export const RolesProvider = ({ children, initialData = { rolesList: [] } }) => {
    const useRolesCreateState = useRolesCreate();
    const useRolesUpdateState = useRolesUpdate();
    const useRolesGetDetailsState = useRolesGetDetails();
    const useRolesDeleteState = useRolesDelete();
    const useRolesGetStatsState = useRolesGetStats();

    return (
        <RolesContext.Provider
            value={{
                ...useRolesCreateState,
                ...useRolesUpdateState,
                ...useRolesGetDetailsState,
                ...useRolesDeleteState,
                ...useRolesGetStatsState,
            }}
        >
            {children}
        </RolesContext.Provider>
    );
};

export const useRoles = () => {
    const context = useContext(RolesContext);
    if (context === null) {
        throw new Error("useRoles must be used within a RolesProvider");
    }
    return context;
};
