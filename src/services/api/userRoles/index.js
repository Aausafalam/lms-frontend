import apiConstants from "@/services/utils/constants";
import userRolesApiClient from "./config";

const endpoints = apiConstants.userRoles;

/**
 * Handles UserRoles-related API operations
 */
class UserRolesApiService {
    constructor(apiClient = userRolesApiClient) {
        this._apiClient = apiClient;
    }

    /**
     * Register a new userRoles
     * @param {Object} payload - UserRoles data
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Created userRoles
     */
    async attachPrivileges(payload, params, signal) {
        const response = await this._apiClient.post(endpoints.ATTACH_PRIVILEGES, payload, { params, signal });
        return response.data;
    }

    async assignUsers(payload, params, signal) {
        const response = await this._apiClient.post("", payload, { params, signal });
        return response.data;
    }

    /**
     * Update an userRoles
     * @param {Object} payload - Updated userRoles details
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Update status
     */
    async update(dynamicRoute, payload, params, signal) {
        const response = await this._apiClient.post(`${endpoints.UPDATE_ROLES}/${dynamicRoute}`, payload, { params, signal });
        return response.data;
    }

    /**
     * Fetch userRoles details
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} UserRoles details
     */
    async getDetails(dynamicRoute, params, signal) {
        const response = await this._apiClient.get(`${endpoints.GET_ROLES_DETAILS}/${dynamicRoute}`, { params, signal });
        return response.data;
    }

    /**
     * Remove an userRoles
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Deletion status
     */
    async delete(dynamicRoute, params, signal) {
        const response = await this._apiClient.delete(`${endpoints.DELETE_ROLES}/${dynamicRoute}`, { params, signal });
        return response.data;
    }

    /**
     * Retrieve userRoles stats
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} UserRoles statistics
     */
    async getStats(params, signal) {
        const response = await this._apiClient.get(endpoints.GET_ROLES_STATS, { params, signal });
        return response.data;
    }
}

export const userRolesApiService = new UserRolesApiService();
export default UserRolesApiService;
