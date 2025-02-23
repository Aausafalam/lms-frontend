import apiConstants from "@/services/utils/constants";
import axios from "axios";
import TableICON from "./icon";

class TableUtils {
    static capitalizeEachWord = (name) => {
        if (name && typeof name === "string") {
            return name.replace(/\b\w/g, (match) => match.toUpperCase());
        } else {
            return "";
        }
    };

    static getCurrentMonthName() {
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        const currentDate = new Date();
        const currentMonthIndex = currentDate.getMonth();
        return monthNames[currentMonthIndex];
    }

    static getFormattedDate = (timestamp) => {
        const dateObj = new Date(timestamp * 1000);
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        let day = dateObj.getDate();
        const month = monthNames[dateObj.getMonth()];
        const year = dateObj.getFullYear();

        if (day < 10) {
            day = "0" + day;
        }

        const formattedDate = `${day} ${month} ${year}`;
        return formattedDate; // Return in the format "DD-MMM-YYYY"
    };

    static getFormattedDateWithTime = (timestamp) => {
        const dateObj = new Date(timestamp * 1000);
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        let day = dateObj.getDate();
        const month = monthNames[dateObj.getMonth()];
        const year = dateObj.getFullYear();

        if (day < 10) {
            day = "0" + day;
        }

        let hours = dateObj.getHours();
        let minutes = dateObj.getMinutes();

        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        const formattedDate = `${day} ${month} ${year} ${hours}:${minutes}`;
        return formattedDate;
    };

    static handleViewFile = async (fileUrl) => {
        try {
            const response = await axios.get(fileUrl, {
                responseType: "blob",
            });

            const url = window.URL.createObjectURL(new Blob([response.data], { type: response.headers["content-type"] }));
            window.open(url);

            setTimeout(() => {
                window.URL.revokeObjectURL(url);
            }, 1000);
        } catch (error) {
            console.error("View failed:", error);
        }
    };

    static appendTokenToUrl = (url, token) => {
        if (!url) return null;
        const hasQueryParams = url.includes("?");
        return `${url}${hasQueryParams ? "&" : "?"}token=${token}`;
    };

    static getToken() {
        return process.env.REACT_APP_EXPORT_TOKEN;
    }

    static renderJson = (json, primaryColor, secondaryColor, fontWeight) => {
        const formatJson = (obj) => {
            const entries = Array.isArray(obj) ? obj.map((value, index) => [index, value]) : Object.entries(obj);

            return entries.map(([key, value]) => {
                const isObject = value && typeof value === "object";
                const isArray = Array.isArray(value);
                const displayValue = isArray ? value : JSON.stringify(value);

                return (
                    <div key={key} style={{ marginBottom: "10px" }}>
                        <span style={{ color: primaryColor || "#ff9800", fontWeight: fontWeight || "bold" }}>{key}: </span>
                        {isObject && !isArray ? (
                            <div style={{ paddingLeft: "20px" }}>{formatJson(value)}</div>
                        ) : (
                            <span style={{ color: secondaryColor || "#4caf50", wordBreak: "break-all" }}>{isArray ? displayValue : displayValue}</span>
                        )}
                    </div>
                );
            });
        };

        return formatJson(json);
    };

    static shouldHideAction = (action, row) => {
        if (action.hiddenConditions) {
            return action.hiddenConditions.some((condition) => {
                const cell = row[condition.key];
                const cellValue = cell?.originalValue || cell?.value;
                const valueLower = cellValue?.toLowerCase();
                const conditionValues = condition?.value?.map((v) => v.toLowerCase());
                return condition.negate ? !conditionValues?.includes(valueLower) : conditionValues?.includes(valueLower);
            });
        }
        return false;
    };
    static formatDataForAutoSuggestion(data, fields) {
        if (!Array.isArray(data) || !Array.isArray(fields)) {
            throw new Error("Both data and fields must be arrays");
        }

        return data
            .map((item) =>
                fields.map((field) => {
                    try {
                        return field.split(".").reduce((acc, key) => acc && acc[key], item) || "";
                    } catch {
                        return "";
                    }
                })
            )
            .flat();
    }

    static getExportButton({ url, token, flat, icon, label, href, target, className, tonal, outlined, ...restProps }) {
        const defaultToken = JSON.parse(localStorage.getItem("user"));
        const userToken = token || defaultToken;

        // Construct the URL safely
        const baseUrl = `${apiConstants.BACKEND_API_BASE_URL}${url}`;
        const urlObj = new URL(baseUrl, window.location.origin);

        // Append token only if it's present
        if (userToken) {
            urlObj.searchParams.set("token", userToken);
        }

        return {
            outlined: outlined ?? true,
            flat: flat ?? true,
            tonal: tonal ?? true,
            icon: icon || TableICON.EXPORT,
            label: label || "Exports",
            className: className || "export",
            href: href || urlObj.toString(),
            target: target || "_blank",
            ...restProps,
        };
    }
}

export default TableUtils;
