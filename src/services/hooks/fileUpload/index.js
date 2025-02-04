import fileUploadApiService from "@/services/api/fileUpload";
import { useLoading } from "@/services/context/loading";
import { useNotification } from "@/services/context/notification";
import apiConstants from "@/services/utils/constants";
import { useCallback } from "react";

/**
 * Custom hook to handle file Upload with loading and notification states
 * @returns {Object} Object containing file Upload execution function and related states
 */

export const useFileUpload = () => {
    const { showErrorNotification, showSuccessNotification, successMessages, errorMessages } = useNotification();
    const { isLoading, setLoading } = useLoading();
    const FILE_UPLOAD_KEY = apiConstants.loadingStateKeys.FILE_UPLOAD;

    /**
     * Converts payload object to FormData
     * @param {Object} payload - Object containing file data with keys
     * @returns {FormData}
     */

    const createFormData = useCallback((payload) => {
        const formData = new FormData();

        Object.entries(payload).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach((file) => formData.append(`${key}[]`, file));
            } else if (value instanceof File || value instanceof Blob) {
                formData.append(key, value);
            } else if (value !== null && value !== undefined) {
                formData.append(key, value.toString());
            }
        });

        return formData;
    }, []);

    /**
     * Handles the file upload process with loading states and error handling
     * @param {Object} config - Upload configuration object
     * @param {string} config.url - Upload endpoint URL
     * @param {Object} config.payload - The file data object
     * @param {Function} config.onSuccess - Success callback
     * @param {Function} config.onError - Error callback
     * @param {Object} config.options - Additional options
     * @param {Object} [params] - Query parameters
     */

    const executeFileUpload = useCallback(
        async ({ url, payload, onSuccess, onError, options }, params) => {
            setLoading(FILE_UPLOAD_KEY, true);
            const controller = new AbortController();

            try {
                // Convert payload to FormData
                const formData = createFormData(payload);

                const data = await fileUploadApiService.uploadFile(url, formData, {
                    params,
                    signal: controller.signal,
                    onProgress: options?.onProgress,
                });

                if (options?.showNotification) {
                    showSuccessNotification({
                        key: FILE_UPLOAD_KEY,
                        value: data,
                        hideNotification: options?.hideNotification,
                    });
                }

                onSuccess?.(data.data);
                return data;
            } catch (error) {
                showErrorNotification({
                    key: FILE_UPLOAD_KEY,
                    value: error || "Failed to complete file upload",
                });
                onError?.(error);
                console.error("FileUpload error:", error);
                throw error;
            } finally {
                setLoading(FILE_UPLOAD_KEY, false);
            }
        },
        [FILE_UPLOAD_KEY, showErrorNotification, showSuccessNotification, setLoading, createFormData]
    );

    return {
        fileUpload: {
            execute: executeFileUpload,
            isLoading: isLoading(FILE_UPLOAD_KEY) || false,
            successMessage: successMessages?.[FILE_UPLOAD_KEY],
            errorMessage: errorMessages?.[FILE_UPLOAD_KEY],
        },
    };
};
