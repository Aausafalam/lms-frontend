import { questionApiService } from "@/services/api/question";
import { useLoading } from "@/services/context/loading";
import { useNotification } from "@/services/context/notification";
import apiConstants from "@/services/utils/constants";
import { useCallback, useState } from "react";

/**
 * Custom hook to handle Question creation
 */
export const useQuestionCreate = () => {
    const { showErrorNotification, showSuccessNotification, successMessages, errorMessages } = useNotification();
    const { isLoading, setLoading } = useLoading();
    const CREATE_COURSE_KEY = apiConstants.loadingStateKeys.CREATE_COURSE;

    const executeQuestionCreate = useCallback(
        async ({ dynamicRoute, payload, onSuccess, onError, options }, params) => {
            setLoading(CREATE_COURSE_KEY, true);
            const controller = new AbortController();

            try {
                const data = await questionApiService.create(dynamicRoute, payload, params, controller.signal);
                showSuccessNotification({
                    key: CREATE_COURSE_KEY,
                    value: data,
                    hideNotification: !options?.showNotification,
                });
                onSuccess?.(data);
                return data;
            } catch (error) {
                showErrorNotification({
                    key: CREATE_COURSE_KEY,
                    value: error?.message || "Failed to create question",
                });
                onError?.(error);
                throw error;
            } finally {
                setLoading(CREATE_COURSE_KEY, false);
            }
        },
        [CREATE_COURSE_KEY, showErrorNotification, showSuccessNotification, setLoading]
    );

    return {
        questionCreate: {
            execute: executeQuestionCreate,
            isLoading: isLoading(CREATE_COURSE_KEY),
            successMessages: successMessages?.[CREATE_COURSE_KEY],
            errorMessages: errorMessages?.[CREATE_COURSE_KEY],
        },
    };
};

/**
 * Custom hook to handle Question updates
 */
export const useQuestionUpdate = () => {
    const { showErrorNotification, showSuccessNotification, successMessages, errorMessages } = useNotification();
    const { isLoading, setLoading } = useLoading();
    const UPDATE_COURSE_KEY = apiConstants.loadingStateKeys.UPDATE_COURSE;

    const executeQuestionUpdate = useCallback(
        async ({ dynamicRoute, payload, onSuccess, onError, options, params }) => {
            setLoading(UPDATE_COURSE_KEY, true);
            const controller = new AbortController();

            try {
                const data = await questionApiService.update(dynamicRoute, payload, params, controller.signal);
                showSuccessNotification({
                    key: UPDATE_COURSE_KEY,
                    value: data,
                    hideNotification: !options?.showNotification,
                });
                onSuccess?.(data);
                return data;
            } catch (error) {
                showErrorNotification({
                    key: UPDATE_COURSE_KEY,
                    value: error?.message || "Failed to update question",
                });
                onError?.(error);
                throw error;
            } finally {
                setLoading(UPDATE_COURSE_KEY, false);
            }
        },
        [UPDATE_COURSE_KEY, showErrorNotification, showSuccessNotification, setLoading]
    );

    return {
        questionUpdate: {
            execute: executeQuestionUpdate,
            isLoading: isLoading(UPDATE_COURSE_KEY),
            successMessages: successMessages?.[UPDATE_COURSE_KEY],
            errorMessages: errorMessages?.[UPDATE_COURSE_KEY],
        },
    };
};

/**
 * Custom hook to fetch Question details
 */
export const useQuestionGetDetails = () => {
    const [details, setDetails] = useState(undefined);
    const { showErrorNotification, successMessages, errorMessages } = useNotification();
    const { isLoading, setLoading } = useLoading();
    const GET_COURSE_DETAILS_KEY = apiConstants.loadingStateKeys.GET_COURSE_DETAILS;

    const fetchDetails = useCallback(
        async ({ dynamicRoute, onSuccess, onError, params }) => {
            setLoading(GET_COURSE_DETAILS_KEY, true);
            const controller = new AbortController();

            try {
                const data = await questionApiService.getDetails(dynamicRoute, params, controller.signal);
                const question = data.data.question;
                delete question.id;
                setDetails({ data: { ...question, id: data.data.id } });
                onSuccess?.(data);
            } catch (error) {
                showErrorNotification({
                    key: GET_COURSE_DETAILS_KEY,
                    value: error?.message || "Failed to fetch question details",
                });
                onError?.(error);
            } finally {
                setLoading(GET_COURSE_DETAILS_KEY, false);
            }
        },
        [GET_COURSE_DETAILS_KEY, showErrorNotification, setLoading]
    );

    return {
        questionDetails: {
            data: details,
            fetch: fetchDetails,
            isLoading: isLoading(GET_COURSE_DETAILS_KEY),
            success: successMessages?.[GET_COURSE_DETAILS_KEY],
            error: errorMessages?.[GET_COURSE_DETAILS_KEY],
        },
    };
};

/**
 * Custom hook to delete Question
 */
export const useQuestionDelete = () => {
    const { showErrorNotification, showSuccessNotification } = useNotification();
    const { isLoading, setLoading } = useLoading();
    const DELETE_COURSE_KEY = apiConstants.loadingStateKeys.DELETE_COURSE;

    const executeQuestionDeletion = useCallback(
        async ({ dynamicRoute, onSuccess, onError, options, params }) => {
            setLoading(DELETE_COURSE_KEY, true);
            const controller = new AbortController();

            try {
                const data = await questionApiService.delete(dynamicRoute, params, controller.signal);
                showSuccessNotification({
                    key: DELETE_COURSE_KEY,
                    value: data,
                    hideNotification: !options?.showNotification,
                });
                onSuccess?.(data);
                return data;
            } catch (error) {
                showErrorNotification({
                    key: DELETE_COURSE_KEY,
                    value: error?.message || "Failed to delete question",
                });
                onError?.(error);
                throw error;
            } finally {
                setLoading(DELETE_COURSE_KEY, false);
            }
        },
        [DELETE_COURSE_KEY, showErrorNotification, showSuccessNotification, setLoading]
    );

    return {
        questionDelete: {
            execute: executeQuestionDeletion,
            isLoading: isLoading(DELETE_COURSE_KEY),
        },
    };
};

/**
 * Custom hook to fetch Question statistics
 */
export const useQuestionGetStats = () => {
    const [stats, setStats] = useState({});
    const { showErrorNotification } = useNotification();
    const { isLoading, setLoading } = useLoading();
    const GET_COURSE_STATS_KEY = apiConstants.loadingStateKeys.GET_COURSE_STATS;

    const fetchStats = useCallback(
        async ({ onSuccess, onError }, params) => {
            setLoading(GET_COURSE_STATS_KEY, true);
            const controller = new AbortController();

            try {
                const data = await questionApiService.getStats(params, controller.signal);
                setStats(data);
                onSuccess?.(data);
            } catch (error) {
                showErrorNotification({
                    key: GET_COURSE_STATS_KEY,
                    value: error?.message || "Failed to fetch question stats",
                });
                onError?.(error);
            } finally {
                setLoading(GET_COURSE_STATS_KEY, false);
            }
        },
        [GET_COURSE_STATS_KEY, showErrorNotification, setLoading]
    );

    return {
        questionStats: {
            data: stats,
            fetch: fetchStats,
            isLoading: isLoading(GET_COURSE_STATS_KEY),
        },
    };
};
