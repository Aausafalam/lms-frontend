import { contentApiService } from "@/services/api/content";
import { useLoading } from "@/services/context/loading";
import { useNotification } from "@/services/context/notification";
import apiConstants from "@/services/utils/constants";
import { useCallback, useState } from "react";

/**
 * Custom hook to handle Content creation
 */
export const useContentCreate = () => {
    const { showErrorNotification, showSuccessNotification, successMessages, errorMessages } = useNotification();
    const { isLoading, setLoading } = useLoading();
    const CREATE_COURSE_KEY = apiConstants.loadingStateKeys.CREATE_COURSE;

    const executeContentCreate = useCallback(
        async ({ dynamicRoute, payload, onSuccess, onError, options }, params) => {
            setLoading(CREATE_COURSE_KEY, true);
            const controller = new AbortController();

            try {
                const data = await contentApiService.create(dynamicRoute, payload, params, controller.signal);
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
                    value: error?.message || "Failed to create content",
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
        contentCreate: {
            execute: executeContentCreate,
            isLoading: isLoading(CREATE_COURSE_KEY),
            successMessages: successMessages?.[CREATE_COURSE_KEY],
            errorMessages: errorMessages?.[CREATE_COURSE_KEY],
        },
    };
};

/**
 * Custom hook to handle Content updates
 */
export const useContentUpdate = () => {
    const { showErrorNotification, showSuccessNotification, successMessages, errorMessages } = useNotification();
    const { isLoading, setLoading } = useLoading();
    const UPDATE_COURSE_KEY = apiConstants.loadingStateKeys.UPDATE_COURSE;

    const executeContentUpdate = useCallback(
        async ({ payload, onSuccess, onError, options, params }) => {
            setLoading(UPDATE_COURSE_KEY, true);
            const controller = new AbortController();

            try {
                const data = await contentApiService.update(payload, params, controller.signal);
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
                    value: error?.message || "Failed to update content",
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
        contentUpdate: {
            execute: executeContentUpdate,
            isLoading: isLoading(UPDATE_COURSE_KEY),
            successMessages: successMessages?.[UPDATE_COURSE_KEY],
            errorMessages: errorMessages?.[UPDATE_COURSE_KEY],
        },
    };
};

/**
 * Custom hook to fetch Content details
 */
export const useContentGetDetails = () => {
    const [details, setDetails] = useState(undefined);
    const { showErrorNotification } = useNotification();
    const { isLoading, setLoading } = useLoading();
    const GET_COURSE_DETAILS_KEY = apiConstants.loadingStateKeys.GET_COURSE_DETAILS;

    const fetchDetails = useCallback(
        async ({ dynamicRoute, onSuccess, onError, params }) => {
            setLoading(GET_COURSE_DETAILS_KEY, true);
            const controller = new AbortController();

            try {
                const data = await contentApiService.getDetails(dynamicRoute, params, controller.signal);
                setDetails(data.data);
                onSuccess?.(data);
            } catch (error) {
                showErrorNotification({
                    key: GET_COURSE_DETAILS_KEY,
                    value: error?.message || "Failed to fetch content details",
                });
                onError?.(error);
            } finally {
                setLoading(GET_COURSE_DETAILS_KEY, false);
            }
        },
        [GET_COURSE_DETAILS_KEY, showErrorNotification, setLoading]
    );

    return {
        contentDetails: {
            data: details,
            fetch: fetchDetails,
            isLoading: isLoading(GET_COURSE_DETAILS_KEY),
        },
    };
};

/**
 * Custom hook to delete Content
 */
export const useContentDelete = () => {
    const { showErrorNotification, showSuccessNotification } = useNotification();
    const { isLoading, setLoading } = useLoading();
    const DELETE_COURSE_KEY = apiConstants.loadingStateKeys.DELETE_COURSE;

    const executeContentDeletion = useCallback(
        async ({ dynamicRoute, onSuccess, onError, options, params }) => {
            setLoading(DELETE_COURSE_KEY, true);
            const controller = new AbortController();

            try {
                const data = await contentApiService.delete(dynamicRoute, params, controller.signal);
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
                    value: error?.message || "Failed to delete content",
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
        contentDelete: {
            execute: executeContentDeletion,
            isLoading: isLoading(DELETE_COURSE_KEY),
        },
    };
};

/**
 * Custom hook to fetch Content statistics
 */
export const useContentGetStats = () => {
    const [stats, setStats] = useState({});
    const { showErrorNotification } = useNotification();
    const { isLoading, setLoading } = useLoading();
    const GET_COURSE_STATS_KEY = apiConstants.loadingStateKeys.GET_COURSE_STATS;

    const fetchStats = useCallback(
        async ({ onSuccess, onError }, params) => {
            setLoading(GET_COURSE_STATS_KEY, true);
            const controller = new AbortController();

            try {
                const data = await contentApiService.getStats(params, controller.signal);
                setStats(data);
                onSuccess?.(data);
            } catch (error) {
                showErrorNotification({
                    key: GET_COURSE_STATS_KEY,
                    value: error?.message || "Failed to fetch content stats",
                });
                onError?.(error);
            } finally {
                setLoading(GET_COURSE_STATS_KEY, false);
            }
        },
        [GET_COURSE_STATS_KEY, showErrorNotification, setLoading]
    );

    return {
        contentStats: {
            data: stats,
            fetch: fetchStats,
            isLoading: isLoading(GET_COURSE_STATS_KEY),
        },
    };
};
