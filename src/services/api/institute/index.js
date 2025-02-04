import apiConstants from "@/services/utils/constants";
import instituteApiClient from "./config";

const instituteApiEndpoints = apiConstants.institute;

/*====================================================
 * Class handling all Institute-related API operations
 *====================================================*/

class InstituteApiService {
    constructor(apiClient = instituteApiClient) {
        this.apiClient = apiClient;
    }

    /**
     * Creates new institute registration
     * @param {Object} payload - Registration data
     * @param {Object} [params] - Query parameters
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Institute data
     */

    async createSignup(payload, params, signal) {
        const response = await this.apiClient.post(instituteApiEndpoints.SIGN_UP, payload, {
            params,
            signal,
        });
        return response.data;
    }

    /**
     * Verifies institute email
     * @param {Object} payload - Email verification data
     * @param {Object} [params] - Query parameters
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Verification result
     */

    async verifyEmail(payload, params, signal) {
        const response = await this.apiClient.post(instituteApiEndpoints.VERIFY_EMAIL, payload, {
            params,
            signal,
        });
        return response.data;
    }

    /**
     * Current onboarded user
     * @param {Object} [params] - Query parameters
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} user information
     */

    async currentOnboardedUser(params, signal) {
        const response = await this.apiClient.get(instituteApiEndpoints.CURRENT_ONBOARDED_USER, {
            params,
            signal,
        });
        return response.data;
    }

    /**
     * set up institute basic information
     * @param {Object} payload - basic information data
     * @param {Object} [params] - Query parameters
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Institute Data
     */

    async setupInstituteBasicInfo(payload, params, signal) {
        const response = await this.apiClient.post(instituteApiEndpoints.SETUP_BASE_INFO, payload, {
            params,
            signal,
        });
        return response.data;
    }

    /**
     * set up institute payment
     * @param {Object} payload - payment data
     * @param {Object} [params] - Query parameters
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Institute Data
     */

    async setupInstitutePayment(payload, params, signal) {
        const response = await this.apiClient.post(instituteApiEndpoints.SETUP_PAYMENT, payload, {
            params,
            signal,
        });
        return response.data;
    }

    /**
     * set up institute details
     * @param {Object} payload - institute details data
     * @param {Object} [params] - Query parameters
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Institute Data
     */

    async setupInstituteDetails(payload, params, signal) {
        const response = await this.apiClient.post(instituteApiEndpoints.SETUP_DETAILS, payload, {
            params,
            signal,
        });
        return response.data;
    }

    /**
     * set up institute theme
     * @param {Object} payload - institute theme data
     * @param {Object} [params] - Query parameters
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Institute Data
     */

    async setupInstituteTheme(payload, params, signal) {
        const response = await this.apiClient.post(instituteApiEndpoints.SETUP_TEMPLATE, payload, {
            params,
            signal,
        });
        return response.data;
    }

    /**
     * set up Institute password
     * @param {Object} payload - institute password
     * @param {Object} [params] - Query parameters
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Institute Data
     */

    async setupInstitutePassword(payload, params, signal) {
        const response = await this.apiClient.post(instituteApiEndpoints.SETUP_PASSWORD, payload, {
            params,
            signal,
        });
        return response.data;
    }
}

export const instituteApiService = new InstituteApiService();

export default InstituteApiService;
