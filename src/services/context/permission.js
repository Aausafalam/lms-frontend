"use client";

import { createContext, useContext } from "react";
import { usePermissionCreate, usePermissionDelete, usePermissionGetDetails, usePermissionGetStats, usePermissionList, usePermissionUpdate } from "../hooks/permission";

const PermissionContext = createContext(null);

export const PermissionProvider = ({ children, initialData = { permissionList: [] } }) => {
    const usePermissionCreateState = usePermissionCreate();
    const usePermissionUpdateState = usePermissionUpdate();
    const usePermissionGetDetailsState = usePermissionGetDetails();
    const usePermissionDeleteState = usePermissionDelete();
    const usePermissionGetStatsState = usePermissionGetStats();
    const usePermissionGetListState = usePermissionList();

    return (
        <PermissionContext.Provider
            value={{
                ...usePermissionCreateState,
                ...usePermissionUpdateState,
                ...usePermissionGetDetailsState,
                ...usePermissionDeleteState,
                ...usePermissionGetStatsState,
                ...usePermissionGetListState,
            }}
        >
            {children}
        </PermissionContext.Provider>
    );
};

export const usePermission = () => {
    const context = useContext(PermissionContext);
    if (context === null) {
        throw new Error("usePermission must be used within a Permission Provider");
    }
    return context;
};
