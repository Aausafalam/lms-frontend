import apiConstants from "@/services/utils/constants";
import examPatternApiClient from "./config";

const endpoints = apiConstants.examPattern;

/**
 * Handles ExamPattern-related API operations
 */
class ExamPatternApiService {
    constructor(apiClient = examPatternApiClient) {
        this._apiClient = apiClient;
    }

    /**
     * Register a new examPattern
     * @param {Object} payload - ExamPattern data
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Created examPattern
     */
    async create(dynamicRoute, payload, params, signal) {
        const response = await this._apiClient.post(dynamicRoute, payload, { params, signal });
        return response.data;
    }

    /**
     * Update an examPattern
     * @param {Object} payload - Updated examPattern details
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Update status
     */
    async update(dynamicRoute, payload, params, signal) {
        const response = await this._apiClient.put(`${dynamicRoute}`, payload, { params, signal });
        return response.data;
    }

    /**
     * Fetch examPattern details
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} ExamPattern details
     */
    async getDetails(dynamicRoute, params, signal) {
        const response = await this._apiClient.get(`${dynamicRoute}`, { params, signal });
        return response.data;
    }

    /**
     * Remove an examPattern
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Deletion status
     */
    async delete(dynamicRoute, params, signal) {
        const response = await this._apiClient.delete(`${dynamicRoute}`, { params, signal });
        return response.data;
    }

    /**
     * Retrieve examPattern stats
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} ExamPattern statistics
     */
    async getStats(params, signal) {
        const response = await this._apiClient.get(endpoints.GET_COURSE_STATS, { params, signal });
        return response.data;
    }
}

export const examPatternApiService = new ExamPatternApiService();
export default ExamPatternApiService;
