import apiConstants from "@/services/utils/constants";
import usersApiClient from "./config";

const endpoints = apiConstants.users;

/**
 * Handles Users-related API operations
 */
class UsersApiService {
    constructor(apiClient = usersApiClient) {
        this._apiClient = apiClient;
    }

    /**
     * Register a new users
     * @param {Object} payload - Users data
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Created users
     */
    async create(payload, params, signal) {
        const response = await this._apiClient.post(endpoints.CREATE_USERS, payload, { params, signal });
        return response.data;
    }

    /**
     * Update an users
     * @param {Object} payload - Updated users details
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Update status
     */
    async update(dynamicRoute, payload, params, signal) {
        const response = await this._apiClient.post(`${endpoints.UPDATE_USERS}/${dynamicRoute}`, payload, { params, signal });
        return response.data;
    }

    /**
     * Fetch users details
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Users details
     */
    async getDetails(dynamicRoute, params, signal) {
        const response = await this._apiClient.get(`${endpoints.GET_USERS_DETAILS}/${dynamicRoute}`, { params, signal });
        return response.data;
    }

    /**
     * Remove an users
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Deletion status
     */
    async delete(dynamicRoute, params, signal) {
        const response = await this._apiClient.delete(`${endpoints.DELETE_USERS}/${dynamicRoute}`, { params, signal });
        return response.data;
    }

    /**
     * Retrieve users stats
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Users statistics
     */
    async getStats(params, signal) {
        const response = await this._apiClient.get(endpoints.GET_USERS_STATS, { params, signal });
        return response.data;
    }

    /**
     * Retrieve users stats
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Users statistics
     */
    async list(params, signal) {
        const response = await this._apiClient.get(endpoints.USERS_LIST, { params, signal });
        return response.data;
    }
}

export const usersApiService = new UsersApiService();
export default UsersApiService;
