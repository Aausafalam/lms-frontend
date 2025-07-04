import { permissionApiService } from "@/services/api/permission";
import { useLoading } from "@/services/context/loading";
import { useNotification } from "@/services/context/notification";
import apiConstants from "@/services/utils/constants";
import { useCallback, useState } from "react";

/**
 * Custom hook to handle Permission creation
 */
export const usePermissionCreate = () => {
    const { showErrorNotification, showSuccessNotification, successMessages, errorMessages } = useNotification();
    const { isLoading, setLoading } = useLoading();
    const CREATE_PERMISSION_KEY = apiConstants.loadingStateKeys.CREATE_PERMISSION;

    const executePermissionCreate = useCallback(
        async ({ payload, onSuccess, onError, options }, params) => {
            setLoading(CREATE_PERMISSION_KEY, true);
            const controller = new AbortController();

            try {
                const data = await permissionApiService.create(payload, params, controller.signal);
                showSuccessNotification({
                    key: CREATE_PERMISSION_KEY,
                    value: data,
                    hideNotification: !options?.showNotification,
                });
                onSuccess?.(data);
                return data;
            } catch (error) {
                showErrorNotification({
                    key: CREATE_PERMISSION_KEY,
                    value: error?.message || "Failed to create permission",
                });
                onError?.(error);
                throw error;
            } finally {
                setLoading(CREATE_PERMISSION_KEY, false);
            }
        },
        [CREATE_PERMISSION_KEY, showErrorNotification, showSuccessNotification, setLoading]
    );

    return {
        permissionCreate: {
            execute: executePermissionCreate,
            isLoading: isLoading(CREATE_PERMISSION_KEY),
            successMessages: successMessages?.[CREATE_PERMISSION_KEY],
            errorMessages: errorMessages?.[CREATE_PERMISSION_KEY],
        },
    };
};

/**
 * Custom hook to handle Permission updates
 */
export const usePermissionUpdate = () => {
    const { showErrorNotification, showSuccessNotification, successMessages, errorMessages } = useNotification();
    const { isLoading, setLoading } = useLoading();
    const UPDATE_PERMISSION_KEY = apiConstants.loadingStateKeys.UPDATE_PERMISSION;

    const executePermissionUpdate = useCallback(
        async ({ dynamicRoute, payload, onSuccess, onError, options, params }) => {
            setLoading(UPDATE_PERMISSION_KEY, true);
            const controller = new AbortController();

            try {
                const data = await permissionApiService.update(dynamicRoute, payload, params, controller.signal);
                showSuccessNotification({
                    key: UPDATE_PERMISSION_KEY,
                    value: data,
                    hideNotification: !options?.showNotification,
                });
                onSuccess?.(data);
                return data;
            } catch (error) {
                showErrorNotification({
                    key: UPDATE_PERMISSION_KEY,
                    value: error?.message || "Failed to update permission",
                });
                onError?.(error);
                throw error;
            } finally {
                setLoading(UPDATE_PERMISSION_KEY, false);
            }
        },
        [UPDATE_PERMISSION_KEY, showErrorNotification, showSuccessNotification, setLoading]
    );

    return {
        permissionUpdate: {
            execute: executePermissionUpdate,
            isLoading: isLoading(UPDATE_PERMISSION_KEY),
            successMessages: successMessages?.[UPDATE_PERMISSION_KEY],
            errorMessages: errorMessages?.[UPDATE_PERMISSION_KEY],
        },
    };
};

/**
 * Custom hook to fetch Permission details
 */
export const usePermissionGetDetails = () => {
    const [details, setDetails] = useState({});
    const { showErrorNotification } = useNotification();
    const { isLoading, setLoading } = useLoading();
    const GET_PERMISSION_DETAILS_KEY = apiConstants.loadingStateKeys.GET_PERMISSION_DETAILS;

    const fetchDetails = useCallback(
        async ({ dynamicRoute, onSuccess, onError, params }) => {
            setLoading(GET_PERMISSION_DETAILS_KEY, true);
            const controller = new AbortController();

            try {
                const data = await permissionApiService.getDetails(dynamicRoute, params, controller.signal);
                setDetails(data);
                onSuccess?.(data);
            } catch (error) {
                showErrorNotification({
                    key: GET_PERMISSION_DETAILS_KEY,
                    value: error?.message || "Failed to fetch permission details",
                });
                onError?.(error);
            } finally {
                setLoading(GET_PERMISSION_DETAILS_KEY, false);
            }
        },
        [GET_PERMISSION_DETAILS_KEY, showErrorNotification, setLoading]
    );

    return {
        permissionDetails: {
            data: details,
            fetch: fetchDetails,
            isLoading: isLoading(GET_PERMISSION_DETAILS_KEY),
        },
    };
};

/**
 * Custom hook to delete Permission
 */
export const usePermissionDelete = () => {
    const { showErrorNotification, showSuccessNotification } = useNotification();
    const { isLoading, setLoading } = useLoading();
    const DELETE_PERMISSION_KEY = apiConstants.loadingStateKeys.DELETE_PERMISSION;

    const executePermissionDeletion = useCallback(
        async ({ dynamicRoute, onSuccess, onError, options, params }) => {
            setLoading(DELETE_PERMISSION_KEY, true);
            const controller = new AbortController();

            try {
                const data = await permissionApiService.delete(dynamicRoute, params, controller.signal);
                showSuccessNotification({
                    key: DELETE_PERMISSION_KEY,
                    value: data,
                    hideNotification: !options?.showNotification,
                });
                onSuccess?.(data);
                return data;
            } catch (error) {
                showErrorNotification({
                    key: DELETE_PERMISSION_KEY,
                    value: error?.message || "Failed to delete permission",
                });
                onError?.(error);
                throw error;
            } finally {
                setLoading(DELETE_PERMISSION_KEY, false);
            }
        },
        [DELETE_PERMISSION_KEY, showErrorNotification, showSuccessNotification, setLoading]
    );

    return {
        permissionDelete: {
            execute: executePermissionDeletion,
            isLoading: isLoading(DELETE_PERMISSION_KEY),
        },
    };
};

/**
 * Custom hook to fetch Permission statistics
 */
export const usePermissionGetStats = () => {
    const [stats, setStats] = useState({});
    const { showErrorNotification } = useNotification();
    const { isLoading, setLoading } = useLoading();
    const GET_PERMISSION_STATS_KEY = apiConstants.loadingStateKeys.GET_PERMISSION_STATS;

    const fetchStats = useCallback(
        async ({ onSuccess, onError }, params) => {
            setLoading(GET_PERMISSION_STATS_KEY, true);
            const controller = new AbortController();

            try {
                const data = await permissionApiService.getStats(params, controller.signal);
                setStats(data);
                onSuccess?.(data);
            } catch (error) {
                showErrorNotification({
                    key: GET_PERMISSION_STATS_KEY,
                    value: error?.message || "Failed to fetch permission stats",
                });
                onError?.(error);
            } finally {
                setLoading(GET_PERMISSION_STATS_KEY, false);
            }
        },
        [GET_PERMISSION_STATS_KEY, showErrorNotification, setLoading]
    );

    return {
        permissionStats: {
            data: stats,
            fetch: fetchStats,
            isLoading: isLoading(GET_PERMISSION_STATS_KEY),
        },
    };
};

/**
 * Custom hook to fetch Permission statistics
 */
export const usePermissionList = () => {
    const [list, setList] = useState([]);
    const { showErrorNotification } = useNotification();
    const { isLoading, setLoading } = useLoading();
    const GET_PERMISSION_LIST_KEY = apiConstants.loadingStateKeys.GET_PERMISSION_LIST;

    const fetchList = useCallback(
        async ({ onSuccess, onError, params }) => {
            setLoading(GET_PERMISSION_LIST_KEY, true);
            const controller = new AbortController();

            try {
                const data = await permissionApiService.list(params, controller.signal);
                setList(data.data.records);
                onSuccess?.(data.data.records);
            } catch (error) {
                showErrorNotification({
                    key: GET_PERMISSION_LIST_KEY,
                    value: error?.message || "Failed to fetch permission list",
                });
                onError?.(error);
            } finally {
                setLoading(GET_PERMISSION_LIST_KEY, false);
            }
        },
        [GET_PERMISSION_LIST_KEY, showErrorNotification, setLoading]
    );

    return {
        permissionList: {
            data: list,
            fetch: fetchList,
            isLoading: isLoading(GET_PERMISSION_LIST_KEY),
        },
    };
};
