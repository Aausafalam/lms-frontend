import apiConstants from "@/services/utils/constants";
import routesApiClient from "./config";

const endpoints = apiConstants.routes;

/**
 * Handles Routes-related API operations
 */
class RoutesApiService {
    constructor(apiClient = routesApiClient) {
        this._apiClient = apiClient;
    }

    /**
     * Register a new routes
     * @param {Object} payload - Routes data
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Created routes
     */
    async create(payload, params, signal) {
        const response = await this._apiClient.post(endpoints.CREATE_COURSE, payload, { params, signal });
        return response.data;
    }

    /**
     * Update an routes
     * @param {Object} payload - Updated routes details
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Update status
     */
    async update(dynamicRoute, payload, params, signal) {
        const response = await this._apiClient.post(`${endpoints.UPDATE_COURSE}/${dynamicRoute}`, payload, { params, signal });
        return response.data;
    }

    /**
     * Fetch routes details
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Routes details
     */
    async getDetails(dynamicRoute, params, signal) {
        const response = await this._apiClient.get(`${endpoints.GET_COURSE_DETAILS}/${dynamicRoute}`, { params, signal });
        return response.data;
    }

    /**
     * Remove an routes
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Deletion status
     */
    async delete(dynamicRoute, params, signal) {
        const response = await this._apiClient.delete(`${endpoints.DELETE_COURSE}/${dynamicRoute}`, { params, signal });
        return response.data;
    }

    /**
     * Retrieve routes stats
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Routes statistics
     */
    async getStats(params, signal) {
        const response = await this._apiClient.get(endpoints.GET_COURSE_STATS, { params, signal });
        return response.data;
    }

    /**
     * Retrieve routes stats
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Routes statistics
     */
    async getDropdown(params, signal) {
        const response = await this._apiClient.get(endpoints.DROPDOWN_LIST, { params, signal });
        return response.data;
    }
}

export const routesApiService = new RoutesApiService();
export default RoutesApiService;
