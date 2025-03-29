import apiConstants from "@/services/utils/constants";
import authApiClient from "./config";

const endpoints = apiConstants.auth;

/**
 * Handles Auth-related API operations
 */
class AuthApiService {
    constructor(apiClient = authApiClient) {
        this._apiClient = apiClient;
    }

    /**
     * Fetch auth details
     * @param {Object} [params] - Query params
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Auth details
     */
    async verifyEmail(payload, params, signal) {
        const response = await this._apiClient.post(`${endpoints.VALIDATE_PASSWORD_RESET_LINK}`, payload, { params, signal });
        return response.data;
    }
}

export const authApiService = new AuthApiService();
export default AuthApiService;
