import globalConstants from "@/lib/utils/constants";
import FILTER_OPTIONS from "./filters";
import InstructorsICONS from "./icons";
import apiConstants from "@/services/utils/constants";

const instructorsTableConstants = {
    API_URL: apiConstants.instructors.BASE_ROUTE,
    LIMITS: globalConstants.TABLE_LIMITS,
    SORTING: { initialSort: "Instructors ID", initialSortOrder: "asc" },
    FILTERS: {
        title: "Instructors List",
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

export default instructorsTableConstants;
