import { rolesApiService } from "@/services/api/roles";
import { useLoading } from "@/services/context/loading";
import { useNotification } from "@/services/context/notification";
import apiConstants from "@/services/utils/constants";
import { useCallback, useState } from "react";

/**
 * Custom hook to handle Roles creation
 */
export const useRolesCreate = () => {
    const { showErrorNotification, showSuccessNotification, successMessages, errorMessages } = useNotification();
    const { isLoading, setLoading } = useLoading();
    const CREATE_ROLES_KEY = apiConstants.loadingStateKeys.CREATE_ROLES;

    const executeRolesCreate = useCallback(
        async ({ payload, onSuccess, onError, options }, params) => {
            setLoading(CREATE_ROLES_KEY, true);
            const controller = new AbortController();

            try {
                const data = await rolesApiService.create(payload, params, controller.signal);
                showSuccessNotification({
                    key: CREATE_ROLES_KEY,
                    value: data,
                    hideNotification: !options?.showNotification,
                });
                onSuccess?.(data);
                return data;
            } catch (error) {
                showErrorNotification({
                    key: CREATE_ROLES_KEY,
                    value: error?.message || "Failed to create permission Group",
                });
                onError?.(error);
                throw error;
            } finally {
                setLoading(CREATE_ROLES_KEY, false);
            }
        },
        [CREATE_ROLES_KEY, showErrorNotification, showSuccessNotification, setLoading]
    );

    return {
        rolesCreate: {
            execute: executeRolesCreate,
            isLoading: isLoading(CREATE_ROLES_KEY),
            successMessages: successMessages?.[CREATE_ROLES_KEY],
            errorMessages: errorMessages?.[CREATE_ROLES_KEY],
        },
    };
};

/**
 * Custom hook to handle Roles updates
 */
export const useRolesUpdate = () => {
    const { showErrorNotification, showSuccessNotification, successMessages, errorMessages } = useNotification();
    const { isLoading, setLoading } = useLoading();
    const UPDATE_ROLES_KEY = apiConstants.loadingStateKeys.UPDATE_ROLES;

    const executeRolesUpdate = useCallback(
        async ({ payload, onSuccess, onError, options, params }) => {
            setLoading(UPDATE_ROLES_KEY, true);
            const controller = new AbortController();

            try {
                const data = await rolesApiService.update(payload, params, controller.signal);
                showSuccessNotification({
                    key: UPDATE_ROLES_KEY,
                    value: data,
                    hideNotification: !options?.showNotification,
                });
                onSuccess?.(data);
                return data;
            } catch (error) {
                showErrorNotification({
                    key: UPDATE_ROLES_KEY,
                    value: error?.message || "Failed to update roles",
                });
                onError?.(error);
                throw error;
            } finally {
                setLoading(UPDATE_ROLES_KEY, false);
            }
        },
        [UPDATE_ROLES_KEY, showErrorNotification, showSuccessNotification, setLoading]
    );

    return {
        rolesUpdate: {
            execute: executeRolesUpdate,
            isLoading: isLoading(UPDATE_ROLES_KEY),
            successMessages: successMessages?.[UPDATE_ROLES_KEY],
            errorMessages: errorMessages?.[UPDATE_ROLES_KEY],
        },
    };
};

/**
 * Custom hook to fetch Roles details
 */
export const useRolesGetDetails = () => {
    const [details, setDetails] = useState({});
    const { showErrorNotification } = useNotification();
    const { isLoading, setLoading } = useLoading();
    const GET_ROLES_DETAILS_KEY = apiConstants.loadingStateKeys.GET_ROLES_DETAILS;

    const fetchDetails = useCallback(
        async ({ dynamicRoute, onSuccess, onError, params }) => {
            setLoading(GET_ROLES_DETAILS_KEY, true);
            const controller = new AbortController();

            try {
                const data = await rolesApiService.getDetails(dynamicRoute, params, controller.signal);
                setDetails(data);
                onSuccess?.(data);
            } catch (error) {
                showErrorNotification({
                    key: GET_ROLES_DETAILS_KEY,
                    value: error?.message || "Failed to fetch roles details",
                });
                onError?.(error);
            } finally {
                setLoading(GET_ROLES_DETAILS_KEY, false);
            }
        },
        [GET_ROLES_DETAILS_KEY, showErrorNotification, setLoading]
    );

    return {
        rolesDetails: {
            data: details,
            fetch: fetchDetails,
            isLoading: isLoading(GET_ROLES_DETAILS_KEY),
        },
    };
};

/**
 * Custom hook to delete Roles
 */
export const useRolesDelete = () => {
    const { showErrorNotification, showSuccessNotification } = useNotification();
    const { isLoading, setLoading } = useLoading();
    const DELETE_ROLES_KEY = apiConstants.loadingStateKeys.DELETE_ROLES;

    const executeRolesDeletion = useCallback(
        async ({ dynamicRoute, onSuccess, onError, options, params }) => {
            setLoading(DELETE_ROLES_KEY, true);
            const controller = new AbortController();

            try {
                const data = await rolesApiService.delete(dynamicRoute, params, controller.signal);
                showSuccessNotification({
                    key: DELETE_ROLES_KEY,
                    value: data,
                    hideNotification: !options?.showNotification,
                });
                onSuccess?.(data);
                return data;
            } catch (error) {
                showErrorNotification({
                    key: DELETE_ROLES_KEY,
                    value: error?.message || "Failed to delete roles",
                });
                onError?.(error);
                throw error;
            } finally {
                setLoading(DELETE_ROLES_KEY, false);
            }
        },
        [DELETE_ROLES_KEY, showErrorNotification, showSuccessNotification, setLoading]
    );

    return {
        rolesDelete: {
            execute: executeRolesDeletion,
            isLoading: isLoading(DELETE_ROLES_KEY),
        },
    };
};

/**
 * Custom hook to fetch Roles statistics
 */
export const useRolesGetStats = () => {
    const [stats, setStats] = useState({});
    const { showErrorNotification } = useNotification();
    const { isLoading, setLoading } = useLoading();
    const GET_ROLES_STATS_KEY = apiConstants.loadingStateKeys.GET_ROLES_STATS;

    const fetchStats = useCallback(
        async ({ onSuccess, onError }, params) => {
            setLoading(GET_ROLES_STATS_KEY, true);
            const controller = new AbortController();

            try {
                const data = await rolesApiService.getStats(params, controller.signal);
                setStats(data);
                onSuccess?.(data);
            } catch (error) {
                showErrorNotification({
                    key: GET_ROLES_STATS_KEY,
                    value: error?.message || "Failed to fetch roles stats",
                });
                onError?.(error);
            } finally {
                setLoading(GET_ROLES_STATS_KEY, false);
            }
        },
        [GET_ROLES_STATS_KEY, showErrorNotification, setLoading]
    );

    return {
        rolesStats: {
            data: stats,
            fetch: fetchStats,
            isLoading: isLoading(GET_ROLES_STATS_KEY),
        },
    };
};
