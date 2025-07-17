import apiConstants from "@/services/utils/constants";
import examApiClient from "./config";

const endpoints = apiConstants.exam;

/**
 * Handles Exam-related API operations
 */
class ExamApiService {
    constructor(apiClient = examApiClient) {
        this._apiClient = apiClient;
    }

    /**
     * Register a new exam
     * @param {Object} payload - Exam data
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Created exam
     */
    async create(dynamicRoute, payload, params, signal) {
        const response = await this._apiClient.post(dynamicRoute, payload, { params, signal });
        return response.data;
    }

    /**
     * Update an exam
     * @param {Object} payload - Updated exam details
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Update status
     */
    async update(dynamicRoute, payload, params, signal) {
        const response = await this._apiClient.put(`${dynamicRoute}`, payload, { params, signal });
        return response.data;
    }

    /**
     * Fetch exam details
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Exam details
     */
    async getDetails(dynamicRoute, params, signal) {
        const response = await this._apiClient.get(`${dynamicRoute}`, { params, signal });
        return response.data;
    }

    /**
     * Remove an exam
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Deletion status
     */
    async delete(dynamicRoute, params, signal) {
        const response = await this._apiClient.delete(`${dynamicRoute}`, { params, signal });
        return response.data;
    }

    /**
     * Retrieve exam stats
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Exam statistics
     */
    async getStats(params, signal) {
        const response = await this._apiClient.get(endpoints.GET_COURSE_STATS, { params, signal });
        return response.data;
    }
}

export const examApiService = new ExamApiService();
export default ExamApiService;
