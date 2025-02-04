const FILTER_OPTIONS = {
    categoryStatus: [
        { label: "Active", value: "true" },
        { label: "Inactive", value: "false" },
    ],
    categoryType: [
        { label: "Electronics", value: "electronics" },
        { label: "Furniture", value: "furniture" },
        { label: "Books", value: "books" },
        { label: "Clothing", value: "clothing" },
        { label: "Food", value: "food" },
        { label: "Toys", value: "toys" },
        { label: "Health", value: "health" },
        { label: "Automobile", value: "automobile" },
        { label: "Jewelry", value: "jewelry" },
        { label: "Sports", value: "sports" },
    ],
    categoryCode: [
        { label: "ELEC", value: "elec" },
        { label: "FURN", value: "furn" },
        { label: "BOOK", value: "book" },
        { label: "CLOTH", value: "cloth" },
        { label: "FOOD", value: "food" },
        { label: "TOY", value: "toy" },
        { label: "HEALTH", value: "health" },
        { label: "AUTO", value: "auto" },
        { label: "JEWEL", value: "jewel" },
        { label: "SPORT", value: "sport" },
    ],
};

const TABLE_LIMITS = {
    defaultValue: "20",
    limitStart: "10",
    limitEnd: "50",
    multipleOf: "10",
};

const categoryTableConstants = {
    TABLE_API_URL: "/category",
    FILTER_OPTIONS,
    TABLE_LIMITS,
    externalFilters: {
        title: "Category List",
        filterFields: Object.keys(FILTER_OPTIONS).map((key) => ({
            type: "select",
            name: key,
            grid: 3,
            options: FILTER_OPTIONS[key],
            placeholder: `Select ${key.replace(/([A-Z])/g, " $1").trim()}`,
        })),
        parentPayloadKey: `[search][filters]`,
    },
    TABLE_SORTING: {
        initialSort: "Asset ID",
        initialSortOrder: "asc",
    },
};

export default categoryTableConstants;
