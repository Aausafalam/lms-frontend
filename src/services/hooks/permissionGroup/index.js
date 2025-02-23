import { permissionGroupApiService } from "@/services/api/permissionGroup";
import { useLoading } from "@/services/context/loading";
import { useNotification } from "@/services/context/notification";
import apiConstants from "@/services/utils/constants";
import { useCallback, useState } from "react";

/**
 * Custom hook to handle PermissionGroup creation
 */
export const usePermissionGroupCreate = () => {
    const { showErrorNotification, showSuccessNotification, successMessages, errorMessages } = useNotification();
    const { isLoading, setLoading } = useLoading();
    const CREATE_PERMISSION_GROUP_KEY = apiConstants.loadingStateKeys.CREATE_PERMISSION_GROUP;

    const executePermissionGroupCreate = useCallback(
        async ({ payload, onSuccess, onError, options }, params) => {
            setLoading(CREATE_PERMISSION_GROUP_KEY, true);
            const controller = new AbortController();

            try {
                const data = await permissionGroupApiService.create(payload, params, controller.signal);
                showSuccessNotification({
                    key: CREATE_PERMISSION_GROUP_KEY,
                    value: data,
                    hideNotification: !options?.showNotification,
                });
                onSuccess?.(data);
                return data;
            } catch (error) {
                showErrorNotification({
                    key: CREATE_PERMISSION_GROUP_KEY,
                    value: error?.message || "Failed to create permission Group",
                });
                onError?.(error);
                throw error;
            } finally {
                setLoading(CREATE_PERMISSION_GROUP_KEY, false);
            }
        },
        [CREATE_PERMISSION_GROUP_KEY, showErrorNotification, showSuccessNotification, setLoading]
    );

    return {
        permissionGroupCreate: {
            execute: executePermissionGroupCreate,
            isLoading: isLoading(CREATE_PERMISSION_GROUP_KEY),
            successMessages: successMessages?.[CREATE_PERMISSION_GROUP_KEY],
            errorMessages: errorMessages?.[CREATE_PERMISSION_GROUP_KEY],
        },
    };
};

/**
 * Custom hook to handle PermissionGroup updates
 */
export const usePermissionGroupUpdate = () => {
    const { showErrorNotification, showSuccessNotification, successMessages, errorMessages } = useNotification();
    const { isLoading, setLoading } = useLoading();
    const UPDATE_PERMISSION_GROUP_KEY = apiConstants.loadingStateKeys.UPDATE_PERMISSION_GROUP;

    const executePermissionGroupUpdate = useCallback(
        async ({ payload, onSuccess, onError, options, params }) => {
            setLoading(UPDATE_PERMISSION_GROUP_KEY, true);
            const controller = new AbortController();

            try {
                const data = await permissionGroupApiService.update(payload, params, controller.signal);
                showSuccessNotification({
                    key: UPDATE_PERMISSION_GROUP_KEY,
                    value: data,
                    hideNotification: !options?.showNotification,
                });
                onSuccess?.(data);
                return data;
            } catch (error) {
                showErrorNotification({
                    key: UPDATE_PERMISSION_GROUP_KEY,
                    value: error?.message || "Failed to update permissionGroup",
                });
                onError?.(error);
                throw error;
            } finally {
                setLoading(UPDATE_PERMISSION_GROUP_KEY, false);
            }
        },
        [UPDATE_PERMISSION_GROUP_KEY, showErrorNotification, showSuccessNotification, setLoading]
    );

    return {
        permissionGroupUpdate: {
            execute: executePermissionGroupUpdate,
            isLoading: isLoading(UPDATE_PERMISSION_GROUP_KEY),
            successMessages: successMessages?.[UPDATE_PERMISSION_GROUP_KEY],
            errorMessages: errorMessages?.[UPDATE_PERMISSION_GROUP_KEY],
        },
    };
};

/**
 * Custom hook to fetch PermissionGroup details
 */
export const usePermissionGroupGetDetails = () => {
    const [details, setDetails] = useState({});
    const { showErrorNotification } = useNotification();
    const { isLoading, setLoading } = useLoading();
    const GET_PERMISSION_GROUP_DETAILS_KEY = apiConstants.loadingStateKeys.GET_PERMISSION_GROUP_DETAILS;

    const fetchDetails = useCallback(
        async ({ dynamicRoute, onSuccess, onError, params }) => {
            setLoading(GET_PERMISSION_GROUP_DETAILS_KEY, true);
            const controller = new AbortController();

            try {
                const data = await permissionGroupApiService.getDetails(dynamicRoute, params, controller.signal);
                setDetails(data);
                onSuccess?.(data);
            } catch (error) {
                showErrorNotification({
                    key: GET_PERMISSION_GROUP_DETAILS_KEY,
                    value: error?.message || "Failed to fetch permissionGroup details",
                });
                onError?.(error);
            } finally {
                setLoading(GET_PERMISSION_GROUP_DETAILS_KEY, false);
            }
        },
        [GET_PERMISSION_GROUP_DETAILS_KEY, showErrorNotification, setLoading]
    );

    return {
        permissionGroupDetails: {
            data: details,
            fetch: fetchDetails,
            isLoading: isLoading(GET_PERMISSION_GROUP_DETAILS_KEY),
        },
    };
};

/**
 * Custom hook to delete PermissionGroup
 */
export const usePermissionGroupDelete = () => {
    const { showErrorNotification, showSuccessNotification } = useNotification();
    const { isLoading, setLoading } = useLoading();
    const DELETE_PERMISSION_GROUP_KEY = apiConstants.loadingStateKeys.DELETE_PERMISSION_GROUP;

    const executePermissionGroupDeletion = useCallback(
        async ({ dynamicRoute, onSuccess, onError, options, params }) => {
            setLoading(DELETE_PERMISSION_GROUP_KEY, true);
            const controller = new AbortController();

            try {
                const data = await permissionGroupApiService.delete(dynamicRoute, params, controller.signal);
                showSuccessNotification({
                    key: DELETE_PERMISSION_GROUP_KEY,
                    value: data,
                    hideNotification: !options?.showNotification,
                });
                onSuccess?.(data);
                return data;
            } catch (error) {
                showErrorNotification({
                    key: DELETE_PERMISSION_GROUP_KEY,
                    value: error?.message || "Failed to delete permissionGroup",
                });
                onError?.(error);
                throw error;
            } finally {
                setLoading(DELETE_PERMISSION_GROUP_KEY, false);
            }
        },
        [DELETE_PERMISSION_GROUP_KEY, showErrorNotification, showSuccessNotification, setLoading]
    );

    return {
        permissionGroupDelete: {
            execute: executePermissionGroupDeletion,
            isLoading: isLoading(DELETE_PERMISSION_GROUP_KEY),
        },
    };
};

/**
 * Custom hook to fetch PermissionGroup statistics
 */
export const usePermissionGroupGetStats = () => {
    const [stats, setStats] = useState({});
    const { showErrorNotification } = useNotification();
    const { isLoading, setLoading } = useLoading();
    const GET_PERMISSION_GROUP_STATS_KEY = apiConstants.loadingStateKeys.GET_PERMISSION_GROUP_STATS;

    const fetchStats = useCallback(
        async ({ onSuccess, onError }, params) => {
            setLoading(GET_PERMISSION_GROUP_STATS_KEY, true);
            const controller = new AbortController();

            try {
                const data = await permissionGroupApiService.getStats(params, controller.signal);
                setStats(data);
                onSuccess?.(data);
            } catch (error) {
                showErrorNotification({
                    key: GET_PERMISSION_GROUP_STATS_KEY,
                    value: error?.message || "Failed to fetch permissionGroup stats",
                });
                onError?.(error);
            } finally {
                setLoading(GET_PERMISSION_GROUP_STATS_KEY, false);
            }
        },
        [GET_PERMISSION_GROUP_STATS_KEY, showErrorNotification, setLoading]
    );

    return {
        permissionGroupStats: {
            data: stats,
            fetch: fetchStats,
            isLoading: isLoading(GET_PERMISSION_GROUP_STATS_KEY),
        },
    };
};
