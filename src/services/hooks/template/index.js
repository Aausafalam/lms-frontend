import { templateApiService } from "@/services/api/template";
import { useLoading } from "@/services/context/loading";
import { useNotification } from "@/services/context/notification";
import apiConstants from "@/services/utils/constants";
import { useCallback, useState } from "react";

/**
 * Custom hook to handle Template List  with loading and notification states
 * @returns {Object} Object containing Template List execution function and related states
 */

export const useTemplateList = () => {
    const [templateList, setTemplateList] = useState([]);
    const { showErrorNotification, successMessages, errorMessages } = useNotification();
    const { isLoading, setLoading } = useLoading();
    const LOADING_KEY = apiConstants.loadingStateKeys.GET_TEMPLATE_LIST;

    const fetchTemplateList = useCallback(
        async ({ onSuccess, onError, options }, params) => {
            setLoading(LOADING_KEY, true);
            const controller = new AbortController();

            try {
                const { data } = await templateApiService.getTemplateList(params, controller.signal);
                setTemplateList(data);
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
        templateList: {
            data: templateList,
            fetch: fetchTemplateList,
            isLoading: isLoading(LOADING_KEY) || false,
            successMessages: successMessages?.[LOADING_KEY],
            errorMessages: errorMessages?.[LOADING_KEY],
        },
    };
};
