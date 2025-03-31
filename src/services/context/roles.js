"use client";

import { createContext, useContext } from "react";
import { useRolesAssignUsers, useRolesAttachPermissions, useRolesDelete, useRolesGetDetails, useRolesGetStats, useRolesUpdate } from "../hooks/roles";

const RolesContext = createContext(null);

export const RolesProvider = ({ children, initialData = { rolesList: [] } }) => {
    const useRolesUpdateState = useRolesUpdate();
    const useRolesGetDetailsState = useRolesGetDetails();
    const useRolesDeleteState = useRolesDelete();
    const useRolesGetStatsState = useRolesGetStats();
    const useRolesAttachPermissionState = useRolesAttachPermissions();
    const useRolesAssignUsersState = useRolesAssignUsers();

    return (
        <RolesContext.Provider
            value={{
                ...useRolesUpdateState,
                ...useRolesGetDetailsState,
                ...useRolesDeleteState,
                ...useRolesGetStatsState,
                ...useRolesAttachPermissionState,
                ...useRolesAssignUsersState,
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
