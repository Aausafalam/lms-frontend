import { instructorApiService } from "@/services/api/instructor";
import { useLoading } from "@/services/context/loading";
import { useNotification } from "@/services/context/notification";
import apiConstants from "@/services/utils/constants";
import { useCallback, useState } from "react";

/**
 * Custom hook to handle Instructor creation
 */
export const useInstructorCreate = () => {
    const { showErrorNotification, showSuccessNotification, successMessages, errorMessages } = useNotification();
    const { isLoading, setLoading } = useLoading();
    const CREATE_INSTRUCTOR_KEY = apiConstants.loadingStateKeys.CREATE_INSTRUCTOR;

    const executeInstructorCreate = useCallback(
        async ({ payload, onSuccess, onError, options }, params) => {
            setLoading(CREATE_INSTRUCTOR_KEY, true);
            const controller = new AbortController();

            try {
                const data = await instructorApiService.create(payload, params, controller.signal);
                showSuccessNotification({
                    key: CREATE_INSTRUCTOR_KEY,
                    value: data,
                    hideNotification: !options?.showNotification,
                });
                onSuccess?.(data);
                return data;
            } catch (error) {
                showErrorNotification({
                    key: CREATE_INSTRUCTOR_KEY,
                    value: error?.message || "Failed to create instructor",
                });
                onError?.(error);
                throw error;
            } finally {
                setLoading(CREATE_INSTRUCTOR_KEY, false);
            }
        },
        [CREATE_INSTRUCTOR_KEY, showErrorNotification, showSuccessNotification, setLoading]
    );

    return {
        instructorCreate: {
            execute: executeInstructorCreate,
            isLoading: isLoading(CREATE_INSTRUCTOR_KEY),
            successMessages: successMessages?.[CREATE_INSTRUCTOR_KEY],
            errorMessages: errorMessages?.[CREATE_INSTRUCTOR_KEY],
        },
    };
};

/**
 * Custom hook to handle Instructor updates
 */
export const useInstructorUpdate = () => {
    const { showErrorNotification, showSuccessNotification, successMessages, errorMessages } = useNotification();
    const { isLoading, setLoading } = useLoading();
    const UPDATE_INSTRUCTOR_KEY = apiConstants.loadingStateKeys.UPDATE_INSTRUCTOR;

    const executeInstructorUpdate = useCallback(
        async ({ payload, onSuccess, onError, options, params }) => {
            setLoading(UPDATE_INSTRUCTOR_KEY, true);
            const controller = new AbortController();

            try {
                const data = await instructorApiService.update(payload, params, controller.signal);
                showSuccessNotification({
                    key: UPDATE_INSTRUCTOR_KEY,
                    value: data,
                    hideNotification: !options?.showNotification,
                });
                onSuccess?.(data);
                return data;
            } catch (error) {
                showErrorNotification({
                    key: UPDATE_INSTRUCTOR_KEY,
                    value: error?.message || "Failed to update instructor",
                });
                onError?.(error);
                throw error;
            } finally {
                setLoading(UPDATE_INSTRUCTOR_KEY, false);
            }
        },
        [UPDATE_INSTRUCTOR_KEY, showErrorNotification, showSuccessNotification, setLoading]
    );

    return {
        instructorUpdate: {
            execute: executeInstructorUpdate,
            isLoading: isLoading(UPDATE_INSTRUCTOR_KEY),
            successMessages: successMessages?.[UPDATE_INSTRUCTOR_KEY],
            errorMessages: errorMessages?.[UPDATE_INSTRUCTOR_KEY],
        },
    };
};

/**
 * Custom hook to fetch Instructor details
 */
export const useInstructorGetDetails = () => {
    const [details, setDetails] = useState({});
    const { showErrorNotification } = useNotification();
    const { isLoading, setLoading } = useLoading();
    const GET_INSTRUCTOR_DETAILS_KEY = apiConstants.loadingStateKeys.GET_INSTRUCTOR_DETAILS;

    const fetchDetails = useCallback(
        async ({ dynamicRoute, onSuccess, onError, params }) => {
            setLoading(GET_INSTRUCTOR_DETAILS_KEY, true);
            const controller = new AbortController();

            try {
                const data = await instructorApiService.getDetails(dynamicRoute, params, controller.signal);
                setDetails(data);
                onSuccess?.(data);
            } catch (error) {
                showErrorNotification({
                    key: GET_INSTRUCTOR_DETAILS_KEY,
                    value: error?.message || "Failed to fetch instructor details",
                });
                onError?.(error);
            } finally {
                setLoading(GET_INSTRUCTOR_DETAILS_KEY, false);
            }
        },
        [GET_INSTRUCTOR_DETAILS_KEY, showErrorNotification, setLoading]
    );

    return {
        instructorDetails: {
            data: details,
            fetch: fetchDetails,
            isLoading: isLoading(GET_INSTRUCTOR_DETAILS_KEY),
        },
    };
};

/**
 * Custom hook to delete Instructor
 */
export const useInstructorDelete = () => {
    const { showErrorNotification, showSuccessNotification } = useNotification();
    const { isLoading, setLoading } = useLoading();
    const DELETE_INSTRUCTOR_KEY = apiConstants.loadingStateKeys.DELETE_INSTRUCTOR;

    const executeInstructorDeletion = useCallback(
        async ({ dynamicRoute, onSuccess, onError, options, params }) => {
            setLoading(DELETE_INSTRUCTOR_KEY, true);
            const controller = new AbortController();

            try {
                const data = await instructorApiService.delete(dynamicRoute, params, controller.signal);
                showSuccessNotification({
                    key: DELETE_INSTRUCTOR_KEY,
                    value: data,
                    hideNotification: !options?.showNotification,
                });
                onSuccess?.(data);
                return data;
            } catch (error) {
                showErrorNotification({
                    key: DELETE_INSTRUCTOR_KEY,
                    value: error?.message || "Failed to delete instructor",
                });
                onError?.(error);
                throw error;
            } finally {
                setLoading(DELETE_INSTRUCTOR_KEY, false);
            }
        },
        [DELETE_INSTRUCTOR_KEY, showErrorNotification, showSuccessNotification, setLoading]
    );

    return {
        instructorDelete: {
            execute: executeInstructorDeletion,
            isLoading: isLoading(DELETE_INSTRUCTOR_KEY),
        },
    };
};

/**
 * Custom hook to fetch Instructor statistics
 */
export const useInstructorGetStats = () => {
    const [stats, setStats] = useState({});
    const { showErrorNotification } = useNotification();
    const { isLoading, setLoading } = useLoading();
    const GET_INSTRUCTOR_STATS_KEY = apiConstants.loadingStateKeys.GET_INSTRUCTOR_STATS;

    const fetchStats = useCallback(
        async ({ onSuccess, onError }, params) => {
            setLoading(GET_INSTRUCTOR_STATS_KEY, true);
            const controller = new AbortController();

            try {
                const data = await instructorApiService.getStats(params, controller.signal);
                setStats(data);
                onSuccess?.(data);
            } catch (error) {
                showErrorNotification({
                    key: GET_INSTRUCTOR_STATS_KEY,
                    value: error?.message || "Failed to fetch instructor stats",
                });
                onError?.(error);
            } finally {
                setLoading(GET_INSTRUCTOR_STATS_KEY, false);
            }
        },
        [GET_INSTRUCTOR_STATS_KEY, showErrorNotification, setLoading]
    );

    return {
        instructorStats: {
            data: stats,
            fetch: fetchStats,
            isLoading: isLoading(GET_INSTRUCTOR_STATS_KEY),
        },
    };
};
