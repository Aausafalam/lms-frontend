import { courseApiService } from "@/services/api/course";
import { useLoading } from "@/services/context/loading";
import { useNotification } from "@/services/context/notification";
import apiConstants from "@/services/utils/constants";
import { useCallback, useState } from "react";

/**
 * Custom hook to handle Course creation
 */
export const useCourseCreate = () => {
    const { showErrorNotification, showSuccessNotification, successMessages, errorMessages } = useNotification();
    const { isLoading, setLoading } = useLoading();
    const CREATE_COURSE_KEY = apiConstants.loadingStateKeys.CREATE_COURSE;

    const executeCourseCreate = useCallback(
        async ({ payload, onSuccess, onError, options }, params) => {
            setLoading(CREATE_COURSE_KEY, true);
            const controller = new AbortController();

            try {
                const data = await courseApiService.create(payload, params, controller.signal);
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
                    value: error?.message || "Failed to create course",
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
        courseCreate: {
            execute: executeCourseCreate,
            isLoading: isLoading(CREATE_COURSE_KEY),
            successMessages: successMessages?.[CREATE_COURSE_KEY],
            errorMessages: errorMessages?.[CREATE_COURSE_KEY],
        },
    };
};

/**
 * Custom hook to handle Course updates
 */
export const useCourseUpdate = () => {
    const { showErrorNotification, showSuccessNotification, successMessages, errorMessages } = useNotification();
    const { isLoading, setLoading } = useLoading();
    const UPDATE_COURSE_KEY = apiConstants.loadingStateKeys.UPDATE_COURSE;

    const executeCourseUpdate = useCallback(
        async ({ dynamicRoute, payload, onSuccess, onError, options, params }) => {
            setLoading(UPDATE_COURSE_KEY, true);
            const controller = new AbortController();

            try {
                const data = await courseApiService.update(dynamicRoute, payload, params, controller.signal);
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
                    value: error?.message || "Failed to update course",
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
        courseUpdate: {
            execute: executeCourseUpdate,
            isLoading: isLoading(UPDATE_COURSE_KEY),
            successMessages: successMessages?.[UPDATE_COURSE_KEY],
            errorMessages: errorMessages?.[UPDATE_COURSE_KEY],
        },
    };
};

/**
 * Custom hook to fetch Course details
 */
export const useCourseGetDetails = () => {
    const [details, setDetails] = useState({});
    const { showErrorNotification } = useNotification();
    const { isLoading, setLoading } = useLoading();
    const GET_COURSE_DETAILS_KEY = apiConstants.loadingStateKeys.GET_COURSE_DETAILS;

    const fetchDetails = useCallback(
        async ({ dynamicRoute, onSuccess, onError, params }) => {
            setLoading(GET_COURSE_DETAILS_KEY, true);
            const controller = new AbortController();

            try {
                let data = await courseApiService.getDetails(dynamicRoute, params, controller.signal);

                data = {
                    ...data,
                    data: {
                        ...data.data,
                        instructorIds: data?.data?.instructors?.map((item) => item.id?.toString()) || [],
                        categoryIds: data?.data?.categories?.map((item) => item.id?.toString()) || [],
                    },
                };
                setDetails(data);
                onSuccess?.(data);
            } catch (error) {
                showErrorNotification({
                    key: GET_COURSE_DETAILS_KEY,
                    value: error?.message || "Failed to fetch course details",
                });
                onError?.(error);
            } finally {
                setLoading(GET_COURSE_DETAILS_KEY, false);
            }
        },
        [GET_COURSE_DETAILS_KEY, showErrorNotification, setLoading]
    );

    return {
        courseDetails: {
            data: details,
            fetch: fetchDetails,
            isLoading: isLoading(GET_COURSE_DETAILS_KEY),
        },
    };
};

/**
 * Custom hook to delete Course
 */
export const useCourseDelete = () => {
    const { showErrorNotification, showSuccessNotification } = useNotification();
    const { isLoading, setLoading } = useLoading();
    const DELETE_COURSE_KEY = apiConstants.loadingStateKeys.DELETE_COURSE;

    const executeCourseDeletion = useCallback(
        async ({ dynamicRoute, onSuccess, onError, options, params }) => {
            setLoading(DELETE_COURSE_KEY, true);
            const controller = new AbortController();

            try {
                const data = await courseApiService.delete(dynamicRoute, params, controller.signal);
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
                    value: error?.message || "Failed to delete course",
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
        courseDelete: {
            execute: executeCourseDeletion,
            isLoading: isLoading(DELETE_COURSE_KEY),
        },
    };
};

/**
 * Custom hook to fetch Course statistics
 */
export const useCourseGetStats = () => {
    const [stats, setStats] = useState({});
    const { showErrorNotification } = useNotification();
    const { isLoading, setLoading } = useLoading();
    const GET_COURSE_STATS_KEY = apiConstants.loadingStateKeys.GET_COURSE_STATS;

    const fetchStats = useCallback(
        async ({ onSuccess, onError }, params) => {
            setLoading(GET_COURSE_STATS_KEY, true);
            const controller = new AbortController();

            try {
                const data = await courseApiService.getStats(params, controller.signal);
                setStats(data);
                onSuccess?.(data);
            } catch (error) {
                showErrorNotification({
                    key: GET_COURSE_STATS_KEY,
                    value: error?.message || "Failed to fetch course stats",
                });
                onError?.(error);
            } finally {
                setLoading(GET_COURSE_STATS_KEY, false);
            }
        },
        [GET_COURSE_STATS_KEY, showErrorNotification, setLoading]
    );

    return {
        courseStats: {
            data: stats,
            fetch: fetchStats,
            isLoading: isLoading(GET_COURSE_STATS_KEY),
        },
    };
};

export const useCourseGetList = () => {
    const [list, setList] = useState({});
    const { showErrorNotification } = useNotification();
    const { isLoading, setLoading } = useLoading();
    const GET_COURSE_STATS_KEY = apiConstants.loadingStateKeys.GET_COURSE_STATS;

    const fetchList = useCallback(
        async ({ onSuccess, onError, params }) => {
            setLoading(GET_COURSE_STATS_KEY, true);
            const controller = new AbortController();

            try {
                const data = await courseApiService.getList(params, controller.signal);
                setList(data);
                onSuccess?.(data);
            } catch (error) {
                showErrorNotification({
                    key: GET_COURSE_STATS_KEY,
                    value: error?.message || "Failed to fetch course list",
                });
                onError?.(error);
            } finally {
                setLoading(GET_COURSE_STATS_KEY, false);
            }
        },
        [GET_COURSE_STATS_KEY, showErrorNotification, setLoading]
    );

    return {
        courseList: {
            data: list,
            fetch: fetchList,
            isLoading: isLoading(GET_COURSE_STATS_KEY),
        },
    };
};
