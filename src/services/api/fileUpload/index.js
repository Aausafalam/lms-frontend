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

    // Updated uploadFile method in your API service
    // Updated uploadFile method in your API service
    async uploadFile(url, formData, params = {}, signal, onProgress) {
        if (!(formData instanceof FormData)) {
            throw new Error("Payload must be an instance of FormData");
        }

        try {
            const config = {
                params,
                timeout: 300000, // 5 minutes timeout
                onUploadProgress: onProgress
                    ? (progressEvent) => {
                          if (progressEvent.lengthComputable) {
                              const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                              onProgress(percentCompleted);
                          }
                      }
                    : undefined,
            };

            // Add signal for cancellation if provided
            if (signal) {
                config.signal = signal;
            }

            const response = await this.apiClient.post(url, formData, config);

            return response.data?.data || response.data;
        } catch (error) {
            console.error("File upload failed:", error);

            // Re-throw with additional context
            if (error.response) {
                const customError = new Error(`Upload failed: ${error.response.data?.message || error.response.statusText}`);
                customError.response = error.response;
                customError.status = error.response.status;
                throw customError;
            } else if (error.request) {
                const customError = new Error("Network error occurred during upload");
                customError.request = error.request;
                throw customError;
            } else {
                throw error;
            }
        }
    }
}

export const fileUploadApiService = new FileUploadApiService();

export default fileUploadApiService;
