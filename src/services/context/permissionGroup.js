"use client";

import { createContext, useContext } from "react";
import {
    usePermissionGroupCreate,
    usePermissionGroupDelete,
    usePermissionGroupGetDetails,
    usePermissionGroupGetList,
    usePermissionGroupGetStats,
    usePermissionGroupUpdate,
} from "../hooks/permissionGroup";

const PermissionGroupContext = createContext(null);

export const PermissionGroupProvider = ({ children, initialData = { permissionGroupList: [] } }) => {
    const usePermissionGroupCreateState = usePermissionGroupCreate();
    const usePermissionGroupUpdateState = usePermissionGroupUpdate();
    const usePermissionGroupGetDetailsState = usePermissionGroupGetDetails();
    const usePermissionGroupDeleteState = usePermissionGroupDelete();
    const usePermissionGroupGetStatsState = usePermissionGroupGetStats();
    const usePermissionGroupGetStatsList = usePermissionGroupGetList();

    return (
        <PermissionGroupContext.Provider
            value={{
                ...usePermissionGroupCreateState,
                ...usePermissionGroupUpdateState,
                ...usePermissionGroupGetDetailsState,
                ...usePermissionGroupDeleteState,
                ...usePermissionGroupGetStatsState,
                ...usePermissionGroupGetStatsList,
            }}
        >
            {children}
        </PermissionGroupContext.Provider>
    );
};

export const usePermissionGroup = () => {
    const context = useContext(PermissionGroupContext);
    if (context === null) {
        throw new Error("usePermissionGroup must be used within a PermissionGroupProvider");
    }
    return context;
};
