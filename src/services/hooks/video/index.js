import { videoApiService } from "@/services/api/video";
import { useLoading } from "@/services/context/loading";
import { useNotification } from "@/services/context/notification";
import apiConstants from "@/services/utils/constants";
import { useCallback, useState } from "react";

/**
 * Custom hook to handle Video creation
 */
export const useVideoCreate = () => {
    const { showErrorNotification, showSuccessNotification, successMessages, errorMessages } = useNotification();
    const { isLoading, setLoading } = useLoading();
    const CREATE_COURSE_KEY = apiConstants.loadingStateKeys.CREATE_COURSE;

    const executeVideoCreate = useCallback(
        async ({ dynamicRoute, payload, onSuccess, onError, options }, params) => {
            setLoading(CREATE_COURSE_KEY, true);
            const controller = new AbortController();

            try {
                const data = await videoApiService.create(dynamicRoute, payload, params, controller.signal);
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
                    value: error?.message || "Failed to create video",
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
        videoCreate: {
            execute: executeVideoCreate,
            isLoading: isLoading(CREATE_COURSE_KEY),
            successMessages: successMessages?.[CREATE_COURSE_KEY],
            errorMessages: errorMessages?.[CREATE_COURSE_KEY],
        },
    };
};

/**
 * Custom hook to handle Video updates
 */
export const useVideoUpdate = () => {
    const { showErrorNotification, showSuccessNotification, successMessages, errorMessages } = useNotification();
    const { isLoading, setLoading } = useLoading();
    const UPDATE_COURSE_KEY = apiConstants.loadingStateKeys.UPDATE_COURSE;

    const executeVideoUpdate = useCallback(
        async ({ dynamicRoute, payload, onSuccess, onError, options, params }) => {
            setLoading(UPDATE_COURSE_KEY, true);
            const controller = new AbortController();

            try {
                const data = await videoApiService.update(dynamicRoute, payload, params, controller.signal);
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
                    value: error?.message || "Failed to update video",
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
        videoUpdate: {
            execute: executeVideoUpdate,
            isLoading: isLoading(UPDATE_COURSE_KEY),
            successMessages: successMessages?.[UPDATE_COURSE_KEY],
            errorMessages: errorMessages?.[UPDATE_COURSE_KEY],
        },
    };
};

/**
 * Custom hook to fetch Video details
 */
export const useVideoGetDetails = () => {
    const [details, setDetails] = useState(undefined);
    const { showErrorNotification, errorMessages, successMessages } = useNotification();
    const { isLoading, setLoading } = useLoading();
    const GET_COURSE_DETAILS_KEY = apiConstants.loadingStateKeys.GET_COURSE_DETAILS;

    const fetchDetails = useCallback(
        async ({ dynamicRoute, onSuccess, onError, params }) => {
            setLoading(GET_COURSE_DETAILS_KEY, true);
            const controller = new AbortController();

            try {
                let data = await videoApiService.getDetails(dynamicRoute, params, controller.signal);
                data = {
                    ...data,
                    data: {
                        ...data.data,
                        instructorIds: data?.data?.instructors?.map((item) => item.id?.toString()) || [],
                    },
                };
                setDetails(data);
                onSuccess?.(data);
            } catch (error) {
                showErrorNotification({
                    key: GET_COURSE_DETAILS_KEY,
                    value: error?.message || "Failed to fetch video details",
                });
                onError?.(error);
            } finally {
                setLoading(GET_COURSE_DETAILS_KEY, false);
            }
        },
        [GET_COURSE_DETAILS_KEY, showErrorNotification, setLoading]
    );

    return {
        videoDetails: {
            data: details,
            fetch: fetchDetails,
            isLoading: isLoading(GET_COURSE_DETAILS_KEY),
            success: successMessages?.[GET_COURSE_DETAILS_KEY],
            error: errorMessages?.[GET_COURSE_DETAILS_KEY],
        },
    };
};

/**
 * Custom hook to delete Video
 */
export const useVideoDelete = () => {
    const { showErrorNotification, showSuccessNotification } = useNotification();
    const { isLoading, setLoading } = useLoading();
    const DELETE_COURSE_KEY = apiConstants.loadingStateKeys.DELETE_COURSE;

    const executeVideoDeletion = useCallback(
        async ({ dynamicRoute, onSuccess, onError, options, params }) => {
            setLoading(DELETE_COURSE_KEY, true);
            const controller = new AbortController();

            try {
                const data = await videoApiService.delete(dynamicRoute, params, controller.signal);
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
                    value: error?.message || "Failed to delete video",
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
        videoDelete: {
            execute: executeVideoDeletion,
            isLoading: isLoading(DELETE_COURSE_KEY),
        },
    };
};

/**
 * Custom hook to fetch Video statistics
 */
export const useVideoGetStats = () => {
    const [stats, setStats] = useState({});
    const { showErrorNotification } = useNotification();
    const { isLoading, setLoading } = useLoading();
    const GET_COURSE_STATS_KEY = apiConstants.loadingStateKeys.GET_COURSE_STATS;

    const fetchStats = useCallback(
        async ({ onSuccess, onError }, params) => {
            setLoading(GET_COURSE_STATS_KEY, true);
            const controller = new AbortController();

            try {
                const data = await videoApiService.getStats(params, controller.signal);
                setStats(data);
                onSuccess?.(data);
            } catch (error) {
                showErrorNotification({
                    key: GET_COURSE_STATS_KEY,
                    value: error?.message || "Failed to fetch video stats",
                });
                onError?.(error);
            } finally {
                setLoading(GET_COURSE_STATS_KEY, false);
            }
        },
        [GET_COURSE_STATS_KEY, showErrorNotification, setLoading]
    );

    return {
        videoStats: {
            data: stats,
            fetch: fetchStats,
            isLoading: isLoading(GET_COURSE_STATS_KEY),
        },
    };
};
