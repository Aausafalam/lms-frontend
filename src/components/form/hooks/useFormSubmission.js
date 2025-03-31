import apiClient from "@/services/api/config";
import { useLoading } from "@/services/context/loading";
import { useNotification } from "@/services/context/notification";
import { useCallback } from "react";

export const useFormSubmission = (formId) => {
    const { showErrorNotification, showSuccessNotification, successMessages, errorMessages } = useNotification();
    const { isLoading, setLoading } = useLoading();
    const FORM_KEY = formId;

    const executeFormSubmission = useCallback(
        async ({ method = "post", route, payload, params, onSuccess, onError, options }) => {
            setLoading(FORM_KEY, true);
            const controller = new AbortController();

            try {
                const data = method === "put" ? await putData(route, payload, params, controller.signal) : await postData(route, payload, params, controller.signal);
                showSuccessNotification({
                    key: FORM_KEY,
                    value: data,
                    hideNotification: !options?.showNotification,
                });
                onSuccess?.(data);
                return data;
            } catch (error) {
                console.log(error);
                showErrorNotification({
                    key: FORM_KEY,
                    value: error,
                });
                onError?.(error);
                throw error;
            } finally {
                setLoading(FORM_KEY, false);
            }
        },
        [FORM_KEY, showErrorNotification, showSuccessNotification, setLoading]
    );

    return {
        formSubmission: {
            execute: executeFormSubmission,
            isLoading: isLoading(FORM_KEY),
            successMessages: successMessages?.[FORM_KEY],
            errorMessages: errorMessages?.[FORM_KEY],
        },
    };
};

async function postData(route, payload, params, signal) {
    const response = await apiClient.post(route, payload, { params, signal });
    return response.data;
}

async function putData(route, payload, params, signal) {
    const response = await apiClient.put(route, payload, { params, signal });
    return response.data;
}
