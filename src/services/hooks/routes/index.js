import { routesApiService } from "@/services/api/routes";
import { useLoading } from "@/services/context/loading";
import { useNotification } from "@/services/context/notification";
import apiConstants from "@/services/utils/constants";
import { useCallback, useState } from "react";

/**
 * Custom hook to handle Routes creation
 */
export const useRoutesCreate = () => {
    const { showErrorNotification, showSuccessNotification, successMessages, errorMessages } = useNotification();
    const { isLoading, setLoading } = useLoading();
    const CREATE_ROUTES_KEY = apiConstants.loadingStateKeys.CREATE_ROUTES;

    const executeRoutesCreate = useCallback(
        async ({ payload, onSuccess, onError, options }, params) => {
            setLoading(CREATE_ROUTES_KEY, true);
            const controller = new AbortController();

            try {
                const data = await routesApiService.create(payload, params, controller.signal);
                showSuccessNotification({
                    key: CREATE_ROUTES_KEY,
                    value: data,
                    hideNotification: !options?.showNotification,
                });
                onSuccess?.(data);
                return data;
            } catch (error) {
                showErrorNotification({
                    key: CREATE_ROUTES_KEY,
                    value: error?.message || "Failed to create routes",
                });
                onError?.(error);
                throw error;
            } finally {
                setLoading(CREATE_ROUTES_KEY, false);
            }
        },
        [CREATE_ROUTES_KEY, showErrorNotification, showSuccessNotification, setLoading]
    );

    return {
        routesCreate: {
            execute: executeRoutesCreate,
            isLoading: isLoading(CREATE_ROUTES_KEY),
            successMessages: successMessages?.[CREATE_ROUTES_KEY],
            errorMessages: errorMessages?.[CREATE_ROUTES_KEY],
        },
    };
};

/**
 * Custom hook to handle Routes updates
 */
export const useRoutesUpdate = () => {
    const { showErrorNotification, showSuccessNotification, successMessages, errorMessages } = useNotification();
    const { isLoading, setLoading } = useLoading();
    const UPDATE_ROUTES_KEY = apiConstants.loadingStateKeys.UPDATE_ROUTES;

    const executeRoutesUpdate = useCallback(
        async ({ payload, onSuccess, onError, options, params }) => {
            setLoading(UPDATE_ROUTES_KEY, true);
            const controller = new AbortController();

            try {
                const data = await routesApiService.update(payload, params, controller.signal);
                showSuccessNotification({
                    key: UPDATE_ROUTES_KEY,
                    value: data,
                    hideNotification: !options?.showNotification,
                });
                onSuccess?.(data);
                return data;
            } catch (error) {
                showErrorNotification({
                    key: UPDATE_ROUTES_KEY,
                    value: error?.message || "Failed to update routes",
                });
                onError?.(error);
                throw error;
            } finally {
                setLoading(UPDATE_ROUTES_KEY, false);
            }
        },
        [UPDATE_ROUTES_KEY, showErrorNotification, showSuccessNotification, setLoading]
    );

    return {
        routesUpdate: {
            execute: executeRoutesUpdate,
            isLoading: isLoading(UPDATE_ROUTES_KEY),
            successMessages: successMessages?.[UPDATE_ROUTES_KEY],
            errorMessages: errorMessages?.[UPDATE_ROUTES_KEY],
        },
    };
};

/**
 * Custom hook to fetch Routes details
 */
export const useRoutesGetDetails = () => {
    const [details, setDetails] = useState({});
    const { showErrorNotification } = useNotification();
    const { isLoading, setLoading } = useLoading();
    const GET_ROUTES_DETAILS_KEY = apiConstants.loadingStateKeys.GET_ROUTES_DETAILS;

    const fetchDetails = useCallback(
        async ({ dynamicRoute, onSuccess, onError, params }) => {
            setLoading(GET_ROUTES_DETAILS_KEY, true);
            const controller = new AbortController();

            try {
                const data = await routesApiService.getDetails(dynamicRoute, params, controller.signal);
                setDetails(data);
                onSuccess?.(data);
            } catch (error) {
                showErrorNotification({
                    key: GET_ROUTES_DETAILS_KEY,
                    value: error?.message || "Failed to fetch routes details",
                });
                onError?.(error);
            } finally {
                setLoading(GET_ROUTES_DETAILS_KEY, false);
            }
        },
        [GET_ROUTES_DETAILS_KEY, showErrorNotification, setLoading]
    );

    return {
        routesDetails: {
            data: details,
            fetch: fetchDetails,
            isLoading: isLoading(GET_ROUTES_DETAILS_KEY),
        },
    };
};

/**
 * Custom hook to delete Routes
 */
export const useRoutesDelete = () => {
    const { showErrorNotification, showSuccessNotification } = useNotification();
    const { isLoading, setLoading } = useLoading();
    const DELETE_ROUTES_KEY = apiConstants.loadingStateKeys.DELETE_ROUTES;

    const executeRoutesDeletion = useCallback(
        async ({ dynamicRoute, onSuccess, onError, options, params }) => {
            setLoading(DELETE_ROUTES_KEY, true);
            const controller = new AbortController();

            try {
                const data = await routesApiService.delete(dynamicRoute, params, controller.signal);
                showSuccessNotification({
                    key: DELETE_ROUTES_KEY,
                    value: data,
                    hideNotification: !options?.showNotification,
                });
                onSuccess?.(data);
                return data;
            } catch (error) {
                showErrorNotification({
                    key: DELETE_ROUTES_KEY,
                    value: error?.message || "Failed to delete routes",
                });
                onError?.(error);
                throw error;
            } finally {
                setLoading(DELETE_ROUTES_KEY, false);
            }
        },
        [DELETE_ROUTES_KEY, showErrorNotification, showSuccessNotification, setLoading]
    );

    return {
        routesDelete: {
            execute: executeRoutesDeletion,
            isLoading: isLoading(DELETE_ROUTES_KEY),
        },
    };
};

/**
 * Custom hook to fetch Routes statistics
 */
export const useRoutesGetStats = () => {
    const [stats, setStats] = useState({});
    const { showErrorNotification } = useNotification();
    const { isLoading, setLoading } = useLoading();
    const GET_ROUTES_STATS_KEY = apiConstants.loadingStateKeys.GET_ROUTES_STATS;

    const fetchStats = useCallback(
        async ({ onSuccess, onError }, params) => {
            setLoading(GET_ROUTES_STATS_KEY, true);
            const controller = new AbortController();

            try {
                const data = await routesApiService.getStats(params, controller.signal);
                setStats(data);
                onSuccess?.(data);
            } catch (error) {
                showErrorNotification({
                    key: GET_ROUTES_STATS_KEY,
                    value: error?.message || "Failed to fetch routes stats",
                });
                onError?.(error);
            } finally {
                setLoading(GET_ROUTES_STATS_KEY, false);
            }
        },
        [GET_ROUTES_STATS_KEY, showErrorNotification, setLoading]
    );

    return {
        routesStats: {
            data: stats,
            fetch: fetchStats,
            isLoading: isLoading(GET_ROUTES_STATS_KEY),
        },
    };
};

/**
 * Custom hook to fetch Routes statistics
 */
export const useRoutesGetDropdown = () => {
    const [data, setData] = useState([]);
    const { showErrorNotification } = useNotification();
    const { isLoading, setLoading } = useLoading();
    const GET_ROUTES_DROPDOWN = apiConstants.loadingStateKeys.GET_ROUTES_DROPDOWN;

    const fetchDropdown = useCallback(
        async ({ onSuccess, onError }, params) => {
            setLoading(GET_ROUTES_DROPDOWN, true);
            const controller = new AbortController();

            try {
                const data = await routesApiService.getDropdown(params, controller.signal);
                setData(data.data);
                onSuccess?.(data);
            } catch (error) {
                showErrorNotification({
                    key: GET_ROUTES_DROPDOWN,
                    value: error?.message || "Failed to fetch routes dropdown",
                });
                onError?.(error);
            } finally {
                setLoading(GET_ROUTES_DROPDOWN, false);
            }
        },
        [GET_ROUTES_DROPDOWN, showErrorNotification, setLoading]
    );

    return {
        routesDropdown: {
            data: data,
            fetch: fetchDropdown,
            isLoading: isLoading(GET_ROUTES_DROPDOWN),
        },
    };
};
