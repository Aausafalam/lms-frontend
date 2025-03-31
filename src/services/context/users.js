"use client";

import { createContext, useContext } from "react";
import { useUsersCreate, useUsersDelete, useUsersGetDetails, useUsersGetStats, useUsersList, useUsersUpdate } from "../hooks/users";

const UsersContext = createContext(null);

export const UsersProvider = ({ children, initialData = { usersList: [] } }) => {
    const useUsersCreateState = useUsersCreate();
    const useUsersUpdateState = useUsersUpdate();
    const useUsersGetDetailsState = useUsersGetDetails();
    const useUsersDeleteState = useUsersDelete();
    const useUsersGetStatsState = useUsersGetStats();
    const useUsersGetListState = useUsersList();

    return (
        <UsersContext.Provider
            value={{
                ...useUsersCreateState,
                ...useUsersUpdateState,
                ...useUsersGetDetailsState,
                ...useUsersDeleteState,
                ...useUsersGetStatsState,
                ...useUsersGetListState,
            }}
        >
            {children}
        </UsersContext.Provider>
    );
};

export const useUsers = () => {
    const context = useContext(UsersContext);
    if (context === null) {
        throw new Error("useUsers must be used within a Users Provider");
    }
    return context;
};
