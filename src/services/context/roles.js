"use client";

import { createContext, useContext } from "react";
import { useRolesAssignUsers, useRolesAttachPermissions, useRolesDelete, useRolesGetDetails, useRolesGetStats, useRoleUpdate } from "../hooks/roles";

const RolesContext = createContext(null);

export const RolesProvider = ({ children, initialData = { rolesList: [] } }) => {
    const useRoleUpdateState = useRoleUpdate();
    const useRolesGetDetailsState = useRolesGetDetails();
    const useRolesDeleteState = useRolesDelete();
    const useRolesGetStatsState = useRolesGetStats();
    const useRolesAttachPermissionState = useRolesAttachPermissions();
    const useRolesAssignUsersState = useRolesAssignUsers();

    return (
        <RolesContext.Provider
            value={{
                ...useRoleUpdateState,
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
