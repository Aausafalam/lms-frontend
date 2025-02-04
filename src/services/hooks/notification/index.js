import { notifyError, notifySuccess } from "@/components/Notification";
import { useState, useCallback } from "react";

/**
 * Custom hook for handling success notifications and messages
 * @returns {Object} Object containing success message state and notification handler
 */
export const useSuccessNotification = () => {
    const [successMessages, setSuccessMessages] = useState({});

    const showSuccessNotification = useCallback(({ key, value, message, hideNotification = false }) => {
        try {
            const notificationMessage = value?.message || message;

            setSuccessMessages((prevMessages) => ({
                ...prevMessages,
                [key]: notificationMessage,
            }));

            if (!hideNotification) {
                notifySuccess(notificationMessage);
            }
        } catch (error) {
            console.error("Failed to display success notification:", error);
        }
    }, []);

    return {
        successMessages,
        setSuccessMessages,
        showSuccessNotification,
    };
};

/**
 * Custom hook for handling error notifications and messages
 * @returns {Object} Object containing error message state and notification handler
 */
export const useErrorNotification = () => {
    const [errorMessages, setErrorMessages] = useState({});

    const showErrorNotification = useCallback(({ key, value, message, hideNotification = false }) => {
        try {
            const notificationMessage = value?.response?.data?.message || message || "An unexpected error occurred";

            setErrorMessages((prevMessages) => ({
                ...prevMessages,
                [key]: value?.response?.data?.errors || [],
            }));

            if (!hideNotification && notificationMessage !== "Validation Failed") {
                notifyError(notificationMessage);
            }
        } catch (error) {
            console.error("Failed to display error notification:", error);
        }
    }, []);

    return {
        errorMessages,
        setErrorMessages,
        showErrorNotification,
    };
};
