import { usersApiService } from "@/services/api/users";
import { useLoading } from "@/services/context/loading";
import { useNotification } from "@/services/context/notification";
import apiConstants from "@/services/utils/constants";
import { useCallback, useState } from "react";

/**
 * Custom hook to handle Users creation
 */
export const useUsersCreate = () => {
    const { showErrorNotification, showSuccessNotification, successMessages, errorMessages } = useNotification();
    const { isLoading, setLoading } = useLoading();
    const CREATE_USERS_KEY = apiConstants.loadingStateKeys.CREATE_USERS;

    const executeUsersCreate = useCallback(
        async ({ payload, onSuccess, onError, options }, params) => {
            setLoading(CREATE_USERS_KEY, true);
            const controller = new AbortController();

            try {
                const data = await usersApiService.create(payload, params, controller.signal);
                showSuccessNotification({
                    key: CREATE_USERS_KEY,
                    value: data,
                    hideNotification: !options?.showNotification,
                });
                onSuccess?.(data);
                return data;
            } catch (error) {
                showErrorNotification({
                    key: CREATE_USERS_KEY,
                    value: error?.message || "Failed to create users",
                });
                onError?.(error);
                throw error;
            } finally {
                setLoading(CREATE_USERS_KEY, false);
            }
        },
        [CREATE_USERS_KEY, showErrorNotification, showSuccessNotification, setLoading]
    );

    return {
        usersCreate: {
            execute: executeUsersCreate,
            isLoading: isLoading(CREATE_USERS_KEY),
            successMessages: successMessages?.[CREATE_USERS_KEY],
            errorMessages: errorMessages?.[CREATE_USERS_KEY],
        },
    };
};

/**
 * Custom hook to handle Users updates
 */
export const useUsersUpdate = () => {
    const { showErrorNotification, showSuccessNotification, successMessages, errorMessages } = useNotification();
    const { isLoading, setLoading } = useLoading();
    const UPDATE_USERS_KEY = apiConstants.loadingStateKeys.UPDATE_USERS;

    const executeUsersUpdate = useCallback(
        async ({ payload, onSuccess, onError, options, params }) => {
            setLoading(UPDATE_USERS_KEY, true);
            const controller = new AbortController();

            try {
                const data = await usersApiService.update(payload, params, controller.signal);
                showSuccessNotification({
                    key: UPDATE_USERS_KEY,
                    value: data,
                    hideNotification: !options?.showNotification,
                });
                onSuccess?.(data);
                return data;
            } catch (error) {
                showErrorNotification({
                    key: UPDATE_USERS_KEY,
                    value: error?.message || "Failed to update users",
                });
                onError?.(error);
                throw error;
            } finally {
                setLoading(UPDATE_USERS_KEY, false);
            }
        },
        [UPDATE_USERS_KEY, showErrorNotification, showSuccessNotification, setLoading]
    );

    return {
        usersUpdate: {
            execute: executeUsersUpdate,
            isLoading: isLoading(UPDATE_USERS_KEY),
            successMessages: successMessages?.[UPDATE_USERS_KEY],
            errorMessages: errorMessages?.[UPDATE_USERS_KEY],
        },
    };
};

/**
 * Custom hook to fetch Users details
 */
export const useUsersGetDetails = () => {
    const [details, setDetails] = useState({});
    const { showErrorNotification } = useNotification();
    const { isLoading, setLoading } = useLoading();
    const GET_USERS_DETAILS_KEY = apiConstants.loadingStateKeys.GET_USERS_DETAILS;

    const fetchDetails = useCallback(
        async ({ dynamicRoute, onSuccess, onError, params }) => {
            setLoading(GET_USERS_DETAILS_KEY, true);
            const controller = new AbortController();

            try {
                const data = await usersApiService.getDetails(dynamicRoute, params, controller.signal);
                setDetails(data);
                onSuccess?.(data);
            } catch (error) {
                showErrorNotification({
                    key: GET_USERS_DETAILS_KEY,
                    value: error?.message || "Failed to fetch users details",
                });
                onError?.(error);
            } finally {
                setLoading(GET_USERS_DETAILS_KEY, false);
            }
        },
        [GET_USERS_DETAILS_KEY, showErrorNotification, setLoading]
    );

    return {
        usersDetails: {
            data: details,
            fetch: fetchDetails,
            isLoading: isLoading(GET_USERS_DETAILS_KEY),
        },
    };
};

/**
 * Custom hook to delete Users
 */
export const useUsersDelete = () => {
    const { showErrorNotification, showSuccessNotification } = useNotification();
    const { isLoading, setLoading } = useLoading();
    const DELETE_USERS_KEY = apiConstants.loadingStateKeys.DELETE_USERS;

    const executeUsersDeletion = useCallback(
        async ({ dynamicRoute, onSuccess, onError, options, params }) => {
            setLoading(DELETE_USERS_KEY, true);
            const controller = new AbortController();

            try {
                const data = await usersApiService.delete(dynamicRoute, params, controller.signal);
                showSuccessNotification({
                    key: DELETE_USERS_KEY,
                    value: data,
                    hideNotification: !options?.showNotification,
                });
                onSuccess?.(data);
                return data;
            } catch (error) {
                showErrorNotification({
                    key: DELETE_USERS_KEY,
                    value: error?.message || "Failed to delete users",
                });
                onError?.(error);
                throw error;
            } finally {
                setLoading(DELETE_USERS_KEY, false);
            }
        },
        [DELETE_USERS_KEY, showErrorNotification, showSuccessNotification, setLoading]
    );

    return {
        usersDelete: {
            execute: executeUsersDeletion,
            isLoading: isLoading(DELETE_USERS_KEY),
        },
    };
};

/**
 * Custom hook to fetch Users statistics
 */
export const useUsersGetStats = () => {
    const [stats, setStats] = useState({});
    const { showErrorNotification } = useNotification();
    const { isLoading, setLoading } = useLoading();
    const GET_USERS_STATS_KEY = apiConstants.loadingStateKeys.GET_USERS_STATS;

    const fetchStats = useCallback(
        async ({ onSuccess, onError }, params) => {
            setLoading(GET_USERS_STATS_KEY, true);
            const controller = new AbortController();

            try {
                const data = await usersApiService.getStats(params, controller.signal);
                setStats(data);
                onSuccess?.(data);
            } catch (error) {
                showErrorNotification({
                    key: GET_USERS_STATS_KEY,
                    value: error?.message || "Failed to fetch users stats",
                });
                onError?.(error);
            } finally {
                setLoading(GET_USERS_STATS_KEY, false);
            }
        },
        [GET_USERS_STATS_KEY, showErrorNotification, setLoading]
    );

    return {
        usersStats: {
            data: stats,
            fetch: fetchStats,
            isLoading: isLoading(GET_USERS_STATS_KEY),
        },
    };
};

/**
 * Custom hook to fetch Users statistics
 */
export const useUsersList = () => {
    const [list, setList] = useState([]);
    const { showErrorNotification } = useNotification();
    const { isLoading, setLoading } = useLoading();
    const GET_USERS_LIST_KEY = apiConstants.loadingStateKeys.GET_USERS_LIST;

    const fetchList = useCallback(
        async ({ onSuccess, onError, params }) => {
            setLoading(GET_USERS_LIST_KEY, true);
            const controller = new AbortController();

            try {
                const data = await usersApiService.list(params, controller.signal);
                setList(data.data);
                onSuccess?.(data.data);
            } catch (error) {
                showErrorNotification({
                    key: GET_USERS_LIST_KEY,
                    value: error?.message || "Failed to fetch users list",
                });
                onError?.(error);
            } finally {
                setLoading(GET_USERS_LIST_KEY, false);
            }
        },
        [GET_USERS_LIST_KEY, showErrorNotification, setLoading]
    );

    return {
        usersList: {
            data: list,
            fetch: fetchList,
            isLoading: isLoading(GET_USERS_LIST_KEY),
        },
    };
};
