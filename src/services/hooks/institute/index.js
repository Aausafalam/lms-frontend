import { instituteApiService } from "@/services/api/institute";
import { useLoading } from "@/services/context/loading";
import { useNotification } from "@/services/context/notification";
import apiConstants from "@/services/utils/constants";
import { useCallback, useState } from "react";

/**
 * Custom hook to handle Institute signup functionality with loading and notification states
 * @returns {Object} Object containing Institute signup execution function and related states
 */

export const useInstituteSignup = () => {
    const { showErrorNotification, showSuccessNotification, successMessages, errorMessages } = useNotification();

    const { isLoading, setLoading } = useLoading();

    const SIGNUP_KEY = apiConstants.loadingStateKeys.SIGN_UP;

    /**
     * Handles the Institute signup process with loading states and error handling
     * @param {Object} payload - The signup data
     * @param {Object} params - Additional parameters for the signup request
     * @param {function} onSuccess - Callback to execute on successful signup
     * @param {function} onError - Callback to execute on signup failure
     */

    const executeInstituteSignup = useCallback(
        async ({ payload, onSuccess, onError, options }, params) => {
            setLoading(SIGNUP_KEY, true);
            const controller = new AbortController();

            try {
                const data = await instituteApiService.createSignup(payload, params, controller.signal);

                if (options?.showNotification) {
                    showSuccessNotification({
                        key: SIGNUP_KEY,
                        value: data,
                        hideNotification: true,
                    });
                }

                onSuccess?.();
                return data;
            } catch (error) {
                showErrorNotification({
                    key: SIGNUP_KEY,
                    value: error || "Failed to complete signup",
                });

                onError?.();
                console.error("Signup error:", error);
                throw error;
            } finally {
                setLoading(SIGNUP_KEY, false);
            }
        },
        [SIGNUP_KEY, showErrorNotification, showSuccessNotification, setLoading]
    );
    return {
        instituteSignup: {
            execute: executeInstituteSignup,
            isLoading: isLoading(SIGNUP_KEY) || false,
            successMessages: successMessages?.[SIGNUP_KEY],
            errorMessages: errorMessages?.[SIGNUP_KEY],
        },
    };
};

export const useInstituteVerifyEmail = () => {
    const { showErrorNotification, showSuccessNotification, successMessages, errorMessages } = useNotification();

    const { isLoading, setLoading } = useLoading();

    const Verify_Email_KEY = apiConstants.loadingStateKeys.VERIFY_EMAIL;

    /**
     * Handles the Institute verify email process with loading states and error handling
     * @param {Object} payload - The verify email data
     * @param {Object} params - Additional parameters for the verify email request
     * @param {function} onSuccess - Callback to execute on successful verify email
     * @param {function} onError - Callback to execute on verify email failure
     */

    const executeInstituteVerifyEmail = useCallback(
        async ({ payload, onSuccess, onError, options }, params) => {
            setLoading(Verify_Email_KEY, true);
            const controller = new AbortController();

            try {
                const data = await instituteApiService.verifyEmail(payload, params, controller.signal);
                if (data?.data?.token) {
                    localStorage.setItem("institute_token", data.data.token);
                }
                showSuccessNotification({
                    key: Verify_Email_KEY,
                    value: data,
                    hideNotification: true,
                });
                if (onSuccess) onSuccess();
            } catch (error) {
                showErrorNotification({
                    key: Verify_Email_KEY,
                    value: error || "Failed to complete verify email",
                });
                if (onError) onError();
                console.error("verify email error:", error);
            } finally {
                setLoading(Verify_Email_KEY, false);
            }
        },
        [Verify_Email_KEY, showErrorNotification, showSuccessNotification, setLoading]
    );

    return {
        instituteVerifyEmail: {
            execute: executeInstituteVerifyEmail,
            isLoading: isLoading(Verify_Email_KEY) || false,
            successMessages: successMessages?.[Verify_Email_KEY],
            errorMessages: errorMessages?.[Verify_Email_KEY],
        },
    };
};

export const useInstituteOnboardedUser = () => {
    const [user, setUser] = useState({});
    const { showErrorNotification, successMessages, errorMessages } = useNotification();
    const { isLoading, setLoading } = useLoading();
    const LOADING_KEY = apiConstants.loadingStateKeys.CURRENT_ONBOARDED_USER;

    const fetchUser = useCallback(
        async ({ onSuccess, onError, options }, params) => {
            setLoading(LOADING_KEY, true);
            const controller = new AbortController();

            try {
                const { data } = await instituteApiService.currentOnboardedUser(params, controller.signal);
                setUser(data);
                onSuccess?.(data);
            } catch (error) {
                showErrorNotification({
                    key: LOADING_KEY,
                    value: error || "Failed to fetch onboarded user",
                    hideNotification: true,
                });
                onError?.(error);
                console.error("Failed to fetch onboarded user:", error);
            } finally {
                setLoading(LOADING_KEY, false);
            }
        },
        [LOADING_KEY, showErrorNotification, setLoading]
    );

    return {
        onboardedUser: {
            data: user,
            fetch: fetchUser,
            isLoading: isLoading(LOADING_KEY) || false,
            successMessages: successMessages?.[LOADING_KEY],
            errorMessages: errorMessages?.[LOADING_KEY],
        },
    };
};

export const useInstituteSetupBasicInfo = () => {
    const { showErrorNotification, showSuccessNotification, successMessages, errorMessages } = useNotification();
    const { isLoading, setLoading } = useLoading();

    const SETUP_INSTITUTE_BASIC_INFO = apiConstants.loadingStateKeys.SETUP_BASE_INFO;

    /**
     * Handles the Institute basic details process with loading states and error handling
     * @param {Object} payload - The institute basic info data
     * @param {Object} queryParams - Additional parameters for the setup request
     * @param {function} onSuccess - Callback to execute on successful setup
     * @param {function} onError - Callback to execute on setup failure
     */

    const setupInstituteBasicInfo = useCallback(
        async ({ payload, onSuccess, onError, options }, queryParams) => {
            setLoading(SETUP_INSTITUTE_BASIC_INFO, true);
            const controller = new AbortController();

            try {
                const data = await instituteApiService.setupInstituteBasicInfo(payload, queryParams, controller.signal);
                showSuccessNotification({
                    key: SETUP_INSTITUTE_BASIC_INFO,
                    value: data,
                    hideNotification: options?.hideNotification || false,
                });
                onSuccess?.();
                return data;
            } catch (error) {
                console.log(error);

                const errors = {
                    success: false,
                    message: "An institute with the name 'kareem duke test.....' already exists. Please choose a different name.",
                    statusCode: 409,
                };

                const joiErrors = {
                    success: false,
                    message: "Validation Failed",
                    statusCode: 400,
                    errors: [
                        {
                            message: "Owner name must be at least 2 characters long.",
                            path: ["ownerName"],
                        },
                        {
                            message: "Owner phone number must be exactly 10 digits.",
                            path: ["ownerPhone"],
                        },
                    ],
                };

                showErrorNotification({
                    key: SETUP_INSTITUTE_BASIC_INFO,
                    value: error || "Failed to complete setup institute Basic Info ",
                });
                onError?.();
                console.error("Setup Institute Basic Info error:", error);
                throw error;
            } finally {
                setLoading(SETUP_INSTITUTE_BASIC_INFO, false);
            }
        },
        [SETUP_INSTITUTE_BASIC_INFO, showErrorNotification, showSuccessNotification, setLoading]
    );

    return {
        instituteSetupBasicInfo: {
            execute: setupInstituteBasicInfo,
            isLoading: isLoading(SETUP_INSTITUTE_BASIC_INFO) || false,
            successMessages: successMessages?.[SETUP_INSTITUTE_BASIC_INFO],
            errorMessages: errorMessages?.[SETUP_INSTITUTE_BASIC_INFO],
        },
    };
};

export const useInstituteSetupPayment = () => {
    const { showErrorNotification, showSuccessNotification, successMessages, errorMessages } = useNotification();
    const { isLoading, setLoading } = useLoading();

    const SETUP_INSTITUTE_PAYMENT = apiConstants.loadingStateKeys.SETUP_PAYMENT;

    /**
     * Handles the Institute payment process with loading states and error handling
     * @param {Object} payload - The institute payment data
     * @param {Object} queryParams - Additional parameters for the setup request
     * @param {function} onSuccess - Callback to execute on successful setup
     * @param {function} onError - Callback to execute on setup failure
     */

    const setupInstitutePayment = useCallback(
        async ({ payload, onSuccess, onError, options }, queryParams) => {
            setLoading(SETUP_INSTITUTE_PAYMENT, true);
            const controller = new AbortController();

            try {
                const data = await instituteApiService.setupInstitutePayment(payload, queryParams, controller.signal);
                showSuccessNotification({
                    key: SETUP_INSTITUTE_PAYMENT,
                    value: data,
                    hideNotification: options?.hideNotification || false,
                });
                onSuccess?.();
                return data;
            } catch (error) {
                console.log(error);
                showErrorNotification({
                    key: SETUP_INSTITUTE_PAYMENT,
                    value: error || "Failed to complete setup institute payment ",
                });
                onError?.();
                console.error("Setup Institute payment error:", error);
                throw error;
            } finally {
                setLoading(SETUP_INSTITUTE_PAYMENT, false);
            }
        },
        [SETUP_INSTITUTE_PAYMENT, showErrorNotification, showSuccessNotification, setLoading]
    );

    return {
        instituteSetupPayment: {
            execute: setupInstitutePayment,
            isLoading: isLoading(SETUP_INSTITUTE_PAYMENT) || false,
            successMessages: successMessages?.[SETUP_INSTITUTE_PAYMENT],
            errorMessages: errorMessages?.[SETUP_INSTITUTE_PAYMENT],
        },
    };
};

export const useInstituteSetupDetails = () => {
    const { showErrorNotification, showSuccessNotification, successMessages, errorMessages } = useNotification();
    const { isLoading, setLoading } = useLoading();

    const SETUP_INSTITUTE_DETAILS = apiConstants.loadingStateKeys.SETUP_DETAILS;

    /**
     * Handles the Institute Details process with loading states and error handling
     * @param {Object} payload - The institute Details data
     * @param {Object} queryParams - Additional parameters for the setup request
     * @param {function} onSuccess - Callback to execute on successful setup
     * @param {function} onError - Callback to execute on setup failure
     */

    const setupInstituteDetails = useCallback(
        async ({ payload, onSuccess, onError, options }, queryParams) => {
            setLoading(SETUP_INSTITUTE_DETAILS, true);
            const controller = new AbortController();

            try {
                const data = await instituteApiService.setupInstituteDetails(payload, queryParams, controller.signal);
                showSuccessNotification({
                    key: SETUP_INSTITUTE_DETAILS,
                    value: data,
                    hideNotification: options?.hideNotification || false,
                });
                onSuccess?.();
                return data;
            } catch (error) {
                console.log(error);
                showErrorNotification({
                    key: SETUP_INSTITUTE_DETAILS,
                    value: error || "Failed to complete setup institute Details ",
                });
                onError?.();
                console.error("Setup Institute Details error:", error);
                throw error;
            } finally {
                setLoading(SETUP_INSTITUTE_DETAILS, false);
            }
        },
        [SETUP_INSTITUTE_DETAILS, showErrorNotification, showSuccessNotification, setLoading]
    );

    return {
        instituteSetupDetails: {
            execute: setupInstituteDetails,
            isLoading: isLoading(SETUP_INSTITUTE_DETAILS) || false,
            successMessages: successMessages?.[SETUP_INSTITUTE_DETAILS],
            errorMessages: errorMessages?.[SETUP_INSTITUTE_DETAILS],
        },
    };
};

export const useInstituteSetupTheme = () => {
    const { showErrorNotification, showSuccessNotification, successMessages, errorMessages } = useNotification();
    const { isLoading, setLoading } = useLoading();

    const SETUP_TEMPLATE = apiConstants.loadingStateKeys.SETUP_TEMPLATE;

    /**
     * Handles the Institute Theme process with loading states and error handling
     * @param {Object} payload - The institute Theme data
     * @param {Object} queryParams - Additional parameters for the setup request
     * @param {function} onSuccess - Callback to execute on successful setup
     * @param {function} onError - Callback to execute on setup failure
     */

    const setupInstituteTheme = useCallback(
        async ({ payload, onSuccess, onError, options }, queryParams) => {
            setLoading(SETUP_TEMPLATE, true);
            const controller = new AbortController();

            try {
                const data = await instituteApiService.setupInstituteTheme(payload, queryParams, controller.signal);
                showSuccessNotification({
                    key: SETUP_TEMPLATE,
                    value: data,
                    hideNotification: options?.hideNotification || false,
                });
                onSuccess?.(data);
            } catch (error) {
                console.log(error);
                showErrorNotification({
                    key: SETUP_TEMPLATE,
                    value: error || "Failed to complete setup institute Theme ",
                });
                onError?.(error);
                console.error("Setup Institute Theme error:", error);
                throw error;
            } finally {
                setLoading(SETUP_TEMPLATE, false);
            }
        },
        [SETUP_TEMPLATE, showErrorNotification, showSuccessNotification, setLoading]
    );

    return {
        instituteSetupTheme: {
            execute: setupInstituteTheme,
            isLoading: isLoading(SETUP_TEMPLATE) || false,
            successMessages: successMessages?.[SETUP_TEMPLATE],
            errorMessages: errorMessages?.[SETUP_TEMPLATE],
        },
    };
};

export const useInstituteSetupPassword = () => {
    const { showErrorNotification, showSuccessNotification, successMessages, errorMessages } = useNotification();
    const { isLoading, setLoading } = useLoading();

    const SETUP_PASSWORD = apiConstants.loadingStateKeys.SETUP_PASSWORD;

    /**
     * Handles the Institute Theme process with loading states and error handling
     * @param {Object} payload - The institute Theme data
     * @param {Object} queryParams - Additional parameters for the setup request
     * @param {function} onSuccess - Callback to execute on successful setup
     * @param {function} onError - Callback to execute on setup failure
     */

    const setupInstitutePassword = useCallback(
        async ({ payload, onSuccess, onError, options }, queryParams) => {
            setLoading(SETUP_PASSWORD, true);
            const controller = new AbortController();

            try {
                const data = await instituteApiService.setupInstitutePassword(payload, queryParams, controller.signal);
                showSuccessNotification({
                    key: SETUP_PASSWORD,
                    value: data,
                    hideNotification: options?.hideNotification || false,
                });
                onSuccess?.(data);
            } catch (error) {
                console.log(error);
                showErrorNotification({
                    key: SETUP_PASSWORD,
                    value: error || "Failed to complete setup institute Password ",
                });
                onError?.(error);
                console.error("Setup Institute Password error:", error);
                throw error;
            } finally {
                setLoading(SETUP_PASSWORD, false);
            }
        },
        [SETUP_PASSWORD, showErrorNotification, showSuccessNotification, setLoading]
    );

    return {
        instituteSetupPassword: {
            execute: setupInstitutePassword,
            isLoading: isLoading(SETUP_PASSWORD) || false,
            successMessages: successMessages?.[SETUP_PASSWORD],
            errorMessages: errorMessages?.[SETUP_PASSWORD],
        },
    };
};
