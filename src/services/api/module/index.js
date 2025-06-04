import apiConstants from "@/services/utils/constants";
import moduleApiClient from "./config";

const endpoints = apiConstants.module;

/**
 * Handles Module-related API operations
 */
class ModuleApiService {
    constructor(apiClient = moduleApiClient) {
        this._apiClient = apiClient;
    }

    /**
     * Register a new module
     * @param {Object} payload - Module data
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Created module
     */
    async create(dynamicRoute, payload, params, signal) {
        const response = await this._apiClient.post(dynamicRoute, payload, { params, signal });
        return response.data;
    }

    /**
     * Update an module
     * @param {Object} payload - Updated module details
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Update status
     */
    async update(dynamicRoute, payload, params, signal) {
        const response = await this._apiClient.post(`${endpoints.UPDATE_COURSE}/${dynamicRoute}`, payload, { params, signal });
        return response.data;
    }

    /**
     * Fetch module details
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Module details
     */
    async getDetails(dynamicRoute, params, signal) {
        const response = await this._apiClient.get(`${dynamicRoute}`, { params, signal });
        return response.data;
    }

    /**
     * Remove an module
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Deletion status
     */
    async delete(dynamicRoute, params, signal) {
        const response = await this._apiClient.delete(`${endpoints.DELETE_COURSE}/${dynamicRoute}`, { params, signal });
        return response.data;
    }

    /**
     * Retrieve module stats
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Module statistics
     */
    async getStats(params, signal) {
        const response = await this._apiClient.get(endpoints.GET_COURSE_STATS, { params, signal });
        return response.data;
    }
}

export const moduleApiService = new ModuleApiService();
export default ModuleApiService;
