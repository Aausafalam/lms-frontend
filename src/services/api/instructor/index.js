import apiConstants from "@/services/utils/constants";
import instructorApiClient from "./config";

const endpoints = apiConstants.instructor;

/**
 * Handles Instructor-related API operations
 */
class InstructorApiService {
    constructor(apiClient = instructorApiClient) {
        this._apiClient = apiClient;
    }

    /**
     * Register a new instructor
     * @param {Object} payload - Instructor data
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Created instructor
     */
    async create(payload, params, signal) {
        const response = await this._apiClient.post(endpoints.CREATE_INSTRUCTOR, payload, { params, signal });
        return response.data;
    }

    /**
     * Update an instructor
     * @param {Object} payload - Updated instructor details
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Update status
     */
    async update(dynamicRoute, payload, params, signal) {
        const response = await this._apiClient.post(`${endpoints.UPDATE_INSTRUCTOR}/${dynamicRoute}`, payload, { params, signal });
        return response.data;
    }

    /**
     * Fetch instructor details
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Instructor details
     */
    async getDetails(dynamicRoute, params, signal) {
        const response = await this._apiClient.get(`${endpoints.GET_INSTRUCTOR_DETAILS}/${dynamicRoute}`, { params, signal });
        return response.data;
    }

    /**
     * Remove an instructor
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Deletion status
     */
    async delete(dynamicRoute, params, signal) {
        const response = await this._apiClient.delete(`${endpoints.DELETE_INSTRUCTOR}/${dynamicRoute}`, { params, signal });
        return response.data;
    }

    /**
     * Retrieve instructor stats
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Instructor statistics
     */
    async getStats(params, signal) {
        const response = await this._apiClient.get(endpoints.GET_INSTRUCTOR_STATS, { params, signal });
        return response.data;
    }
}

export const instructorApiService = new InstructorApiService();
export default InstructorApiService;
