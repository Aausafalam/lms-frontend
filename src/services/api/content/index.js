import apiConstants from "@/services/utils/constants";
import contentApiClient from "./config";

const endpoints = apiConstants.content;

/**
 * Handles Content-related API operations
 */
class ContentApiService {
    constructor(apiClient = contentApiClient) {
        this._apiClient = apiClient;
    }

    /**
     * Register a new content
     * @param {Object} payload - Content data
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Created content
     */
    async create(dynamicRoute, payload, params, signal) {
        const response = await this._apiClient.post(dynamicRoute, payload, { params, signal });
        return response.data;
    }

    /**
     * Update an content
     * @param {Object} payload - Updated content details
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Update status
     */
    async update(dynamicRoute, payload, params, signal) {
        const response = await this._apiClient.post(`${endpoints.UPDATE_COURSE}/${dynamicRoute}`, payload, { params, signal });
        return response.data;
    }

    /**
     * Fetch content details
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Content details
     */
    async getDetails(dynamicRoute, params, signal) {
        const response = await this._apiClient.get(`${dynamicRoute}`, { params, signal });
        return response.data;
    }

    /**
     * Remove an content
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Deletion status
     */
    async delete(dynamicRoute, params, signal) {
        const response = await this._apiClient.delete(`${endpoints.DELETE_COURSE}/${dynamicRoute}`, { params, signal });
        return response.data;
    }

    /**
     * Retrieve content stats
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Content statistics
     */
    async getStats(params, signal) {
        const response = await this._apiClient.get(endpoints.GET_COURSE_STATS, { params, signal });
        return response.data;
    }
}

export const contentApiService = new ContentApiService();
export default ContentApiService;
