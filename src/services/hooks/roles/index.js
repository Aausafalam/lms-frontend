import { rolesApiService } from "@/services/api/roles";
import { userRolesApiService } from "@/services/api/userRoles";
import { useLoading } from "@/services/context/loading";
import { useNotification } from "@/services/context/notification";
import apiConstants from "@/services/utils/constants";
import { useCallback, useState } from "react";

/**
 * Custom hook to handle Roles creation
 */
export const useRolesAttachPermissions = () => {
    const { showErrorNotification, showSuccessNotification, successMessages, errorMessages } = useNotification();
    const { isLoading, setLoading } = useLoading();
    const ATTACH_PERMISSION_ROLES_KEY = apiConstants.loadingStateKeys.ATTACH_PERMISSION_ROLES;

    const executeRolesAttachPermissions = useCallback(
        async ({ payload, onSuccess, onError, options, params }) => {
            setLoading(ATTACH_PERMISSION_ROLES_KEY, true);
            const controller = new AbortController();

            try {
                const data = await rolesApiService.attachPrivileges(payload, params, controller.signal);
                showSuccessNotification({
                    key: ATTACH_PERMISSION_ROLES_KEY,
                    value: data,
                    hideNotification: !options?.showNotification,
                });
                onSuccess?.(data);
                return data;
            } catch (error) {
                showErrorNotification({
                    key: ATTACH_PERMISSION_ROLES_KEY,
                    value: error?.message || "Failed to create permission Group",
                });
                onError?.(error);
                throw error;
            } finally {
                setLoading(ATTACH_PERMISSION_ROLES_KEY, false);
            }
        },
        [ATTACH_PERMISSION_ROLES_KEY, showErrorNotification, showSuccessNotification, setLoading]
    );

    return {
        rolesAttachPermissions: {
            execute: executeRolesAttachPermissions,
            isLoading: isLoading(ATTACH_PERMISSION_ROLES_KEY),
            successMessages: successMessages?.[ATTACH_PERMISSION_ROLES_KEY],
            errorMessages: errorMessages?.[ATTACH_PERMISSION_ROLES_KEY],
        },
    };
};

export const useRolesAssignUsers = () => {
    const { showErrorNotification, showSuccessNotification, successMessages, errorMessages } = useNotification();
    const { isLoading, setLoading } = useLoading();
    const ASSIGN_USERS_ROLES_KEY = apiConstants.loadingStateKeys.ASSIGN_USERS_ROLES;

    const executeRolesAssignUsers = useCallback(
        async ({ payload, onSuccess, onError, options, params }) => {
            setLoading(ASSIGN_USERS_ROLES_KEY, true);
            const controller = new AbortController();

            try {
                const data = await userRolesApiService.assignUsers(payload, params, controller.signal);
                showSuccessNotification({
                    key: ASSIGN_USERS_ROLES_KEY,
                    value: data,
                    hideNotification: !options?.showNotification,
                });
                onSuccess?.(data);
                return data;
            } catch (error) {
                showErrorNotification({
                    key: ASSIGN_USERS_ROLES_KEY,
                    value: error?.message || "Failed to create permission Group",
                });
                onError?.(error);
                throw error;
            } finally {
                setLoading(ASSIGN_USERS_ROLES_KEY, false);
            }
        },
        [ASSIGN_USERS_ROLES_KEY, showErrorNotification, showSuccessNotification, setLoading]
    );

    return {
        rolesAssignUsers: {
            execute: executeRolesAssignUsers,
            isLoading: isLoading(ASSIGN_USERS_ROLES_KEY),
            successMessages: successMessages?.[ASSIGN_USERS_ROLES_KEY],
            errorMessages: errorMessages?.[ASSIGN_USERS_ROLES_KEY],
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
