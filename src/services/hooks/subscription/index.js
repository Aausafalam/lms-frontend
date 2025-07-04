import { subscriptionApiService } from "@/services/api/subscription";
import { useLoading } from "@/services/context/loading";
import { useNotification } from "@/services/context/notification";
import apiConstants from "@/services/utils/constants";
import { useCallback, useState } from "react";

/**
 * Custom hook to handle Subscription creation
 */
export const useSubscriptionCreate = () => {
    const { showErrorNotification, showSuccessNotification, successMessages, errorMessages } = useNotification();
    const { isLoading, setLoading } = useLoading();
    const CREATE_SUBSCRIPTION_KEY = apiConstants.loadingStateKeys.CREATE_SUBSCRIPTION;

    const executeSubscriptionCreate = useCallback(
        async ({ dynamicRoute, payload, onSuccess, onError, options }, params) => {
            setLoading(CREATE_SUBSCRIPTION_KEY, true);
            const controller = new AbortController();

            try {
                const data = await subscriptionApiService.create(dynamicRoute, payload, params, controller.signal);
                showSuccessNotification({
                    key: CREATE_SUBSCRIPTION_KEY,
                    value: data,
                    hideNotification: !options?.showNotification,
                });
                onSuccess?.(data);
                return data;
            } catch (error) {
                showErrorNotification({
                    key: CREATE_SUBSCRIPTION_KEY,
                    value: error?.message || "Failed to create subscription",
                });
                onError?.(error);
                throw error;
            } finally {
                setLoading(CREATE_SUBSCRIPTION_KEY, false);
            }
        },
        [CREATE_SUBSCRIPTION_KEY, showErrorNotification, showSuccessNotification, setLoading]
    );

    return {
        subscriptionCreate: {
            execute: executeSubscriptionCreate,
            isLoading: isLoading(CREATE_SUBSCRIPTION_KEY),
            successMessages: successMessages?.[CREATE_SUBSCRIPTION_KEY],
            errorMessages: errorMessages?.[CREATE_SUBSCRIPTION_KEY],
        },
    };
};

/**
 * Custom hook to handle Subscription updates
 */
export const useSubscriptionUpdate = () => {
    const { showErrorNotification, showSuccessNotification, successMessages, errorMessages } = useNotification();
    const { isLoading, setLoading } = useLoading();
    const UPDATE_SUBSCRIPTION_KEY = apiConstants.loadingStateKeys.UPDATE_SUBSCRIPTION;

    const executeSubscriptionUpdate = useCallback(
        async ({ dynamicRoute, payload, onSuccess, onError, options, params }) => {
            setLoading(UPDATE_SUBSCRIPTION_KEY, true);
            const controller = new AbortController();

            try {
                const data = await subscriptionApiService.update(dynamicRoute, payload, params, controller.signal);
                showSuccessNotification({
                    key: UPDATE_SUBSCRIPTION_KEY,
                    value: data,
                    hideNotification: !options?.showNotification,
                });
                onSuccess?.(data);
                return data;
            } catch (error) {
                showErrorNotification({
                    key: UPDATE_SUBSCRIPTION_KEY,
                    value: error?.message || "Failed to update subscription",
                });
                onError?.(error);
                throw error;
            } finally {
                setLoading(UPDATE_SUBSCRIPTION_KEY, false);
            }
        },
        [UPDATE_SUBSCRIPTION_KEY, showErrorNotification, showSuccessNotification, setLoading]
    );

    return {
        subscriptionUpdate: {
            execute: executeSubscriptionUpdate,
            isLoading: isLoading(UPDATE_SUBSCRIPTION_KEY),
            successMessages: successMessages?.[UPDATE_SUBSCRIPTION_KEY],
            errorMessages: errorMessages?.[UPDATE_SUBSCRIPTION_KEY],
        },
    };
};

/**
 * Custom hook to fetch Subscription details
 */
export const useSubscriptionGetDetails = () => {
    const [details, setDetails] = useState(undefined);
    const { showErrorNotification } = useNotification();
    const { isLoading, setLoading } = useLoading();
    const GET_SUBSCRIPTION_DETAILS_KEY = apiConstants.loadingStateKeys.GET_SUBSCRIPTION_DETAILS;

    const fetchDetails = useCallback(
        async ({ dynamicRoute, onSuccess, onError, params }) => {
            setLoading(GET_SUBSCRIPTION_DETAILS_KEY, true);
            const controller = new AbortController();

            try {
                const data = await subscriptionApiService.getDetails(dynamicRoute, params, controller.signal);
                setDetails(data.data);
                onSuccess?.(data);
            } catch (error) {
                showErrorNotification({
                    key: GET_SUBSCRIPTION_DETAILS_KEY,
                    value: error?.message || "Failed to fetch subscription details",
                });
                onError?.(error);
            } finally {
                setLoading(GET_SUBSCRIPTION_DETAILS_KEY, false);
            }
        },
        [GET_SUBSCRIPTION_DETAILS_KEY, showErrorNotification, setLoading]
    );

    return {
        subscriptionDetails: {
            data: details,
            fetch: fetchDetails,
            isLoading: isLoading(GET_SUBSCRIPTION_DETAILS_KEY),
        },
    };
};

/**
 * Custom hook to delete Subscription
 */
export const useSubscriptionDelete = () => {
    const { showErrorNotification, showSuccessNotification } = useNotification();
    const { isLoading, setLoading } = useLoading();
    const DELETE_SUBSCRIPTION_KEY = apiConstants.loadingStateKeys.DELETE_SUBSCRIPTION;

    const executeSubscriptionDeletion = useCallback(
        async ({ dynamicRoute, onSuccess, onError, options, params }) => {
            setLoading(DELETE_SUBSCRIPTION_KEY, true);
            const controller = new AbortController();

            try {
                const data = await subscriptionApiService.delete(dynamicRoute, params, controller.signal);
                showSuccessNotification({
                    key: DELETE_SUBSCRIPTION_KEY,
                    value: data,
                    hideNotification: !options?.showNotification,
                });
                onSuccess?.(data);
                return data;
            } catch (error) {
                showErrorNotification({
                    key: DELETE_SUBSCRIPTION_KEY,
                    value: error?.message || "Failed to delete subscription",
                });
                onError?.(error);
                throw error;
            } finally {
                setLoading(DELETE_SUBSCRIPTION_KEY, false);
            }
        },
        [DELETE_SUBSCRIPTION_KEY, showErrorNotification, showSuccessNotification, setLoading]
    );

    return {
        subscriptionDelete: {
            execute: executeSubscriptionDeletion,
            isLoading: isLoading(DELETE_SUBSCRIPTION_KEY),
        },
    };
};

/**
 * Custom hook to fetch Subscription statistics
 */
export const useSubscriptionGetStats = () => {
    const [stats, setStats] = useState({});
    const { showErrorNotification } = useNotification();
    const { isLoading, setLoading } = useLoading();
    const GET_SUBSCRIPTION_STATS_KEY = apiConstants.loadingStateKeys.GET_SUBSCRIPTION_STATS;

    const fetchStats = useCallback(
        async ({ onSuccess, onError }, params) => {
            setLoading(GET_SUBSCRIPTION_STATS_KEY, true);
            const controller = new AbortController();

            try {
                const data = await subscriptionApiService.getStats(params, controller.signal);
                setStats(data);
                onSuccess?.(data);
            } catch (error) {
                showErrorNotification({
                    key: GET_SUBSCRIPTION_STATS_KEY,
                    value: error?.message || "Failed to fetch subscription stats",
                });
                onError?.(error);
            } finally {
                setLoading(GET_SUBSCRIPTION_STATS_KEY, false);
            }
        },
        [GET_SUBSCRIPTION_STATS_KEY, showErrorNotification, setLoading]
    );

    return {
        subscriptionStats: {
            data: stats,
            fetch: fetchStats,
            isLoading: isLoading(GET_SUBSCRIPTION_STATS_KEY),
        },
    };
};
