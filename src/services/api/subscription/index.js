import apiConstants from "@/services/utils/constants";
import subscriptionApiClient from "./config";

const endpoints = apiConstants.subscription;

/**
 * Handles Subscription-related API operations
 */
class SubscriptionApiService {
    constructor(apiClient = subscriptionApiClient) {
        this._apiClient = apiClient;
    }

    /**
     * Register a new subscription
     * @param {Object} payload - Subscription data
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Created subscription
     */
    async create(dynamicRoute, payload, params, signal) {
        const response = await this._apiClient.post(dynamicRoute, payload, { params, signal });
        return response.data;
    }

    /**
     * Update an subscription
     * @param {Object} payload - Updated subscription details
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Update status
     */
    async update(dynamicRoute, payload, params, signal) {
        const response = await this._apiClient.put(`${dynamicRoute}`, payload, { params, signal });
        return response.data;
    }

    /**
     * Fetch subscription details
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Subscription details
     */
    async getDetails(dynamicRoute, params, signal) {
        const response = await this._apiClient.get(`${dynamicRoute}`, { params, signal });
        return response.data;
    }

    /**
     * Remove an subscription
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Deletion status
     */
    async delete(dynamicRoute, params, signal) {
        const response = await this._apiClient.delete(`${endpoints.DELETE_COURSE}/${dynamicRoute}`, { params, signal });
        return response.data;
    }
}

export const subscriptionApiService = new SubscriptionApiService();
export default SubscriptionApiService;
