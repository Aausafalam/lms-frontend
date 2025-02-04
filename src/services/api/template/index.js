import apiConstants from "@/services/utils/constants";
import templateApiClient from "./config";

const templateApiEndpoints = apiConstants.template;

/*====================================================
 * Class handling all Template-related API operations
 *====================================================*/

class TemplateApiService {
    constructor(apiClient = templateApiClient) {
        this.apiClient = apiClient;
    }

    /**
     * add new template Data
     * @param {Object} payload - template data
     * @param {Object} [params] - Query parameters
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} Template data
     */

    async addTemplate(payload, params, signal) {
        const response = await this.apiClient.post(templateApiEndpoints.ADD_TEMPLATE, payload, {
            params,
            signal,
        });
        return response.data;
    }

    /**
     * get All template list
     * @param {Object} [params] - Query parameters
     * @param {AbortSignal} [signal] - Request cancellation
     * @returns {Promise<Object>} user information
     */

    async getTemplateList(params, signal) {
        const response = await this.apiClient.get(templateApiEndpoints.GET_LIST, {
            params,
            signal,
        });
        return response.data;
    }
}

export const templateApiService = new TemplateApiService();

export default TemplateApiService;
