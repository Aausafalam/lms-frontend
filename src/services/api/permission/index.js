import apiConstants from "@/services/utils/constants";
import permissionApiClient from "./config";

const endpoints = apiConstants.permission;

/**
 * Handles Permission-related API operations
 */
class PermissionApiService {
    constructor(apiClient = permissionApiClient) {
        this._apiClient = apiClient;
    }

    /**
     * Register a new permission
     * @param {Object} payload - Permission data
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Created permission
     */
    async create(payload, params, signal) {
        const response = await this._apiClient.post(endpoints.CREATE_COURSE, payload, { params, signal });
        return response.data;
    }

    /**
     * Update an permission
     * @param {Object} payload - Updated permission details
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Update status
     */
    async update(dynamicRoute, payload, params, signal) {
        const response = await this._apiClient.post(`${endpoints.UPDATE_COURSE}/${dynamicRoute}`, payload, { params, signal });
        return response.data;
    }

    /**
     * Fetch permission details
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Permission details
     */
    async getDetails(dynamicRoute, params, signal) {
        const response = await this._apiClient.get(`${endpoints.GET_COURSE_DETAILS}/${dynamicRoute}`, { params, signal });
        return response.data;
    }

    /**
     * Remove an permission
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Deletion status
     */
    async delete(dynamicRoute, params, signal) {
        const response = await this._apiClient.delete(`${endpoints.DELETE_COURSE}/${dynamicRoute}`, { params, signal });
        return response.data;
    }

    /**
     * Retrieve permission stats
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Permission statistics
     */
    async getStats(params, signal) {
        const response = await this._apiClient.get(endpoints.GET_COURSE_STATS, { params, signal });
        return response.data;
    }
}

export const permissionApiService = new PermissionApiService();
export default PermissionApiService;
