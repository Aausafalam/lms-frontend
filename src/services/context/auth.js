"use client";

import { createContext, useContext } from "react";
import { useAuthenticate } from "../hooks/auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children, initialData = { usersList: [] } }) => {
    const useAuthenticateSate = useAuthenticate();
    return (
        <AuthContext.Provider
            value={{
                ...useAuthenticateSate,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === null) {
        throw new Error("useAuth must be used within a Auth Provider");
    }
    return context;
};
