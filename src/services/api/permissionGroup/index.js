import apiConstants from "@/services/utils/constants";
import permissionGroupApiClient from "./config";

const endpoints = apiConstants.permissionGroup;

/**
 * Handles PermissionGroup-related API operations
 */
class PermissionGroupApiService {
    constructor(apiClient = permissionGroupApiClient) {
        this._apiClient = apiClient;
    }

    /**
     * Register a new permissionGroup
     * @param {Object} payload - PermissionGroup data
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Created permissionGroup
     */
    async create(payload, params, signal) {
        const response = await this._apiClient.post(endpoints.CREATE_COURSE, payload, { params, signal });
        return response.data;
    }

    /**
     * Update an permissionGroup
     * @param {Object} payload - Updated permissionGroup details
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Update status
     */
    async update(dynamicRoute, payload, params, signal) {
        const response = await this._apiClient.post(`${endpoints.UPDATE_COURSE}/${dynamicRoute}`, payload, { params, signal });
        return response.data;
    }

    /**
     * Fetch permissionGroup details
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} PermissionGroup details
     */
    async getDetails(dynamicRoute, params, signal) {
        const response = await this._apiClient.get(`${endpoints.GET_COURSE_DETAILS}/${dynamicRoute}`, { params, signal });
        return response.data;
    }

    /**
     * Remove an permissionGroup
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Deletion status
     */
    async delete(dynamicRoute, params, signal) {
        const response = await this._apiClient.delete(`${endpoints.DELETE_COURSE}/${dynamicRoute}`, { params, signal });
        return response.data;
    }

    /**
     * Retrieve permissionGroup stats
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} PermissionGroup statistics
     */
    async getStats(params, signal) {
        const response = await this._apiClient.get(endpoints.GET_COURSE_STATS, { params, signal });
        return response.data;
    }
}

export const permissionGroupApiService = new PermissionGroupApiService();
export default PermissionGroupApiService;
