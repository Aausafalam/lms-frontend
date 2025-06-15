import apiConstants from "./constants";

class ApiUtils {
    static getAuthToken() {
        return JSON.parse(localStorage.getItem(apiConstants.TOKEN_KEY)) || undefined;
    }

    static async storeAuthToken(token) {
        await localStorage.setItem(apiConstants.TOKEN_KEY, token);
        return true;
    }

    static async deleteAuthToken() {
        await localStorage.removeItem(apiConstants.TOKEN_KEY);
        return true;
    }
}
export default ApiUtils;
