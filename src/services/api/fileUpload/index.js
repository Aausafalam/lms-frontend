import fileUploadApiClient from "./config";

/*====================================================
 * Class handling all file-upload API operations
 *====================================================*/

class FileUploadApiService {
    constructor(apiClient = fileUploadApiClient) {
        this.apiClient = apiClient;
    }

    /**
     * Upload a file using multipart/form-data
     * @param {string} url - API endpoint URL
     * @param {FormData} formData - FormData containing file and additional data
     * @param {Object} [options] - Additional options
     * @param {Object} [options.params] - Query parameters
     * @param {AbortSignal} [options.signal] - Request cancellation signal
     * @param {Function} [options.onProgress] - Upload progress callback
     * @returns {Promise<Object>} Upload response data
     * @throws {Error} When upload fails
     */

    async uploadFile(url, formData, params, signal, onProgress) {
        if (!(formData instanceof FormData)) {
            throw new Error("Payload must be an instance of FormData");
        }

        try {
            const response = await this.apiClient.post(
                url,
                formData
                //     {
                //     params,
                //     signal,
                //     onUploadProgress: onProgress
                //         ? (progressEvent) => {
                //               const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                //               onProgress(percentCompleted, progressEvent);
                //           }
                //         : undefined,
                // }
            );

            return response.data?.data;
        } catch (error) {
            console.error("File upload failed:", error);
            throw error;
        }
    }
}

export const fileUploadApiService = new FileUploadApiService();

export default fileUploadApiService;
