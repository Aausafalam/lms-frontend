"use client";

import { createContext, useContext } from "react";
import {
    useInstituteOnboardedUser,
    useInstituteSetupBasicInfo,
    useInstituteSetupDetails,
    useInstituteSetupPassword,
    useInstituteSetupPayment,
    useInstituteSetupTheme,
    useInstituteSignup,
    useInstituteVerifyEmail,
} from "../hooks/institute";

const InstituteContext = createContext(null);

export const InstituteProvider = ({ children, initialData = { instituteList: [] } }) => {
    const instituteSignupState = useInstituteSignup();
    const instituteVerifyEmailState = useInstituteVerifyEmail();
    const instituteOnboardedUserState = useInstituteOnboardedUser();
    const instituteSetupBasicInfoState = useInstituteSetupBasicInfo();
    const instituteSetupPaymentState = useInstituteSetupPayment();
    const instituteSetupDetailsState = useInstituteSetupDetails();
    const instituteSetupThemeState = useInstituteSetupTheme();
    const instituteSetupPasswordState = useInstituteSetupPassword();

    return (
        <InstituteContext.Provider
            value={{
                ...instituteSignupState,
                ...instituteVerifyEmailState,
                ...instituteSetupBasicInfoState,
                ...instituteSetupPaymentState,
                ...instituteSetupDetailsState,
                ...instituteOnboardedUserState,
                ...instituteSetupThemeState,
                ...instituteSetupPasswordState,
            }}
        >
            {children}
        </InstituteContext.Provider>
    );
};

export const useInstitute = () => {
    const context = useContext(InstituteContext);
    if (context === null) {
        throw new Error("useInstitute must be used within a UserProvider");
    }
    return context;
};
