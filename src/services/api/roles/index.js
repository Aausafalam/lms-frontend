import apiConstants from "@/services/utils/constants";
import rolesApiClient from "./config";

const endpoints = apiConstants.roles;

/**
 * Handles Roles-related API operations
 */
class RolesApiService {
    constructor(apiClient = rolesApiClient) {
        this._apiClient = apiClient;
    }

    /**
     * Register a new roles
     * @param {Object} payload - Roles data
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Created roles
     */
    async attachPrivileges(payload, params, signal) {
        const response = await this._apiClient.post(endpoints.ATTACH_PRIVILEGES, payload, { params, signal });
        return response.data;
    }

    async assignUsers(payload, params, signal) {
        const response = await this._apiClient.post(endpoints.ASSIGN_USERS, payload, { params, signal });
        return response.data;
    }

    /**
     * Update an roles
     * @param {Object} payload - Updated roles details
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Update status
     */
    async update(dynamicRoute, payload, params, signal) {
        const response = await this._apiClient.post(`${endpoints.UPDATE_ROLES}/${dynamicRoute}`, payload, { params, signal });
        return response.data;
    }

    /**
     * Fetch roles details
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Roles details
     */
    async getDetails(dynamicRoute, params, signal) {
        const response = await this._apiClient.get(`${endpoints.GET_ROLES_DETAILS}/${dynamicRoute}`, { params, signal });
        return response.data;
    }

    /**
     * Remove an roles
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Deletion status
     */
    async delete(dynamicRoute, params, signal) {
        const response = await this._apiClient.delete(`${endpoints.DELETE_ROLES}/${dynamicRoute}`, { params, signal });
        return response.data;
    }

    /**
     * Retrieve roles stats
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Roles statistics
     */
    async getStats(params, signal) {
        const response = await this._apiClient.get(endpoints.GET_ROLES_STATS, { params, signal });
        return response.data;
    }
}

export const rolesApiService = new RolesApiService();
export default RolesApiService;
