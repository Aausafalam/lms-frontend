const categoryFormConstants = {
    isActiveOptions: [
        { label: "Active", value: true },
        { label: "Inactive", value: false },
    ],
    formChangesValidateOptions: {
        targetKeys: ["name", "code", "slug", "description", "iconUrl", "displayOrder", "isActive"],
        trimStrings: true,
        precisionForNumbers: 2,
        ignoreEmptyValues: true,
    },
    categoryTypeOptions: [
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
};
export default categoryFormConstants;
