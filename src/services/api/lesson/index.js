import apiConstants from "@/services/utils/constants";
import lessonApiClient from "./config";

const endpoints = apiConstants.lesson;

/**
 * Handles Lesson-related API operations
 */
class LessonApiService {
    constructor(apiClient = lessonApiClient) {
        this._apiClient = apiClient;
    }

    /**
     * Register a new lesson
     * @param {Object} payload - Lesson data
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Created lesson
     */
    async create(dynamicRoute, payload, params, signal) {
        const response = await this._apiClient.post(dynamicRoute, payload, { params, signal });
        return response.data;
    }

    /**
     * Update an lesson
     * @param {Object} payload - Updated lesson details
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Update status
     */
    async update(dynamicRoute, payload, params, signal) {
        const response = await this._apiClient.put(`${dynamicRoute}`, payload, { params, signal });
        return response.data;
    }

    /**
     * Fetch lesson details
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Lesson details
     */
    async getDetails(dynamicRoute, params, signal) {
        const response = await this._apiClient.get(`${dynamicRoute}`, { params, signal });
        return response.data;
    }

    /**
     * Remove an lesson
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Deletion status
     */
    async delete(dynamicRoute, params, signal) {
        const response = await this._apiClient.delete(`${dynamicRoute}`, { params, signal });
        return response.data;
    }

    /**
     * Retrieve lesson stats
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Lesson statistics
     */
    async getStats(params, signal) {
        const response = await this._apiClient.get(endpoints.GET_COURSE_STATS, { params, signal });
        return response.data;
    }
}

export const lessonApiService = new LessonApiService();
export default LessonApiService;
