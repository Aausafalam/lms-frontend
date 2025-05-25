import apiConstants from "@/services/utils/constants";
import courseApiClient from "./config";

const endpoints = apiConstants.course;

/**
 * Handles Course-related API operations
 */
class CourseApiService {
    constructor(apiClient = courseApiClient) {
        this._apiClient = apiClient;
    }

    /**
     * Register a new course
     * @param {Object} payload - Course data
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Created course
     */
    async create(payload, params, signal) {
        const response = await this._apiClient.post("", payload, { params, signal });
        return response.data;
    }

    /**
     * Update an course
     * @param {Object} payload - Updated course details
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Update status
     */
    async update(dynamicRoute, payload, params, signal) {
        const response = await this._apiClient.post(`${endpoints.UPDATE_COURSE}/${dynamicRoute}`, payload, { params, signal });
        return response.data;
    }

    /**
     * Fetch course details
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Course details
     */
    async getDetails(dynamicRoute, params, signal) {
        const response = await this._apiClient.get(`${endpoints.GET_COURSE_DETAILS}/${dynamicRoute}`, { params, signal });
        return response.data;
    }

    /**
     * Remove an course
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Deletion status
     */
    async delete(dynamicRoute, params, signal) {
        const response = await this._apiClient.delete(`${endpoints.DELETE_COURSE}/${dynamicRoute}`, { params, signal });
        return response.data;
    }

    /**
     * Retrieve course stats
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Course statistics
     */
    async getStats(params, signal) {
        const response = await this._apiClient.get(endpoints.GET_COURSE_STATS, { params, signal });
        return response.data;
    }
}

export const courseApiService = new CourseApiService();
export default CourseApiService;
