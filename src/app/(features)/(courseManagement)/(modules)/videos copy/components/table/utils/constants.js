import globalConstants from "@/lib/utils/constants";
import FILTER_OPTIONS from "./filters";
import VideosICONS from "./icons";
import apiConstants from "@/services/utils/constants";

const contentsTableConstants = {
    API_URL: apiConstants.video.BASE_ROUTE,
    LIMITS: globalConstants.TABLE_LIMITS,
    SORTING: { initialSort: "Content ID", initialSortOrder: "asc" },
    FILTERS: {
        icon: false,
        filterFields: Object.entries(FILTER_OPTIONS).map(([key, filter]) => ({
            type: filter.type || "select",
            name: key,
            grid: filter.grid || 3,
            options: filter.options,
            placeholder: filter.placeholder || `Select ${key.replace(/([A-Z])/g, " $1").trim()}`,
        })),
    },
};

export default contentsTableConstants;
