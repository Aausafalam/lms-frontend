"use client";

import { createContext, useContext } from "react";
import { useRoutesCreate, useRoutesDelete, useRoutesGetDetails, useRoutesGetDropdown, useRoutesGetStats, useRoutesUpdate } from "../hooks/routes";

const RoutesContext = createContext(null);

export const RoutesProvider = ({ children, initialData = { routesList: [] } }) => {
    const useRoutesCreateState = useRoutesCreate();
    const useRoutesUpdateState = useRoutesUpdate();
    const useRoutesGetDetailsState = useRoutesGetDetails();
    const useRoutesDeleteState = useRoutesDelete();
    const useRoutesGetStatsState = useRoutesGetStats();
    const useRoutesGetDropdownState = useRoutesGetDropdown();

    return (
        <RoutesContext.Provider
            value={{
                ...useRoutesCreateState,
                ...useRoutesUpdateState,
                ...useRoutesGetDetailsState,
                ...useRoutesDeleteState,
                ...useRoutesGetStatsState,
                ...useRoutesGetDropdownState,
            }}
        >
            {children}
        </RoutesContext.Provider>
    );
};

export const useRoutes = () => {
    const context = useContext(RoutesContext);
    if (context === null) {
        throw new Error("useRoutes must be used within a Routes Provider");
    }
    return context;
};
