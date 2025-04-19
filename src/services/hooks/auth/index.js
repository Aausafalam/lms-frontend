import { authApiService } from "@/services/api/auth";
import { useLoading } from "@/services/context/loading";
import { useNotification } from "@/services/context/notification";
import apiConstants from "@/services/utils/constants";
import { useCallback, useState } from "react";

/**
 * Custom hook to handle Authenticate
 */
export const useAuthenticate = () => {
    const { showErrorNotification, showSuccessNotification, successMessages, errorMessages } = useNotification();
    const { isLoading, setLoading } = useLoading();
    const AUTHENTICATE_KEY = apiConstants.loadingStateKeys.AUTHENTICATE;
    const [data, setDate] = useState({});

    const executeAuthenticate = useCallback(
        async ({ onSuccess, onError, options, params }) => {
            setLoading(AUTHENTICATE_KEY, true);
            const controller = new AbortController();

            try {
                const data = await authApiService.authenticate(params, controller.signal);
                showSuccessNotification({
                    key: AUTHENTICATE_KEY,
                    value: data,
                    hideNotification: !options?.showNotification,
                });
                setDate(data.data);
                onSuccess?.(data);
                return data;
            } catch (error) {
                showErrorNotification({
                    key: AUTHENTICATE_KEY,
                    value: error?.message || "Failed to create users",
                });
                onError?.(error);
                throw error;
            } finally {
                setLoading(AUTHENTICATE_KEY, false);
            }
        },
        [AUTHENTICATE_KEY, showErrorNotification, showSuccessNotification, setLoading]
    );

    return {
        authenticate: {
            data,
            execute: executeAuthenticate,
            isLoading: isLoading(AUTHENTICATE_KEY),
            successMessages: successMessages?.[AUTHENTICATE_KEY],
            errorMessages: errorMessages?.[AUTHENTICATE_KEY],
        },
    };
};
