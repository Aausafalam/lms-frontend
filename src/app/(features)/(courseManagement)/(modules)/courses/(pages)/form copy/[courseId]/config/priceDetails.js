const DEFAULT_GRID = 2;

const PricingConfig = [
    {
        type: "text",
        name: "regularPrice",
        label: "Regular Price",
        grid: DEFAULT_GRID,
        placeholder: "Enter regular price",
        validationRules: { required: true, pattern: /^\d+(\.\d{1,2})?$/ },
        validateOnChange: true,
        helperText: "Set your standard course price (e.g., 99.99)",
    },
    {
        type: "text",
        name: "salePrice",
        label: "Sale Price",
        grid: DEFAULT_GRID,
        placeholder: "Enter sale price",
        validationRules: { pattern: /^\d+(\.\d{1,2})?$/ },
        validateOnChange: true,
        helperText: "Optional promotional price (must be lower than regular price)",
    },
    {
        type: "text",
        name: "discountPercentage",
        label: "Discount Percentage",
        grid: DEFAULT_GRID,
        placeholder: "Enter discount percentage",
        validationRules: { pattern: /^\d+(\.\d{1,2})?$/ },
        validateOnChange: true,
        readOnly: true, // If you want this to be calculated automatically
        helperText: "This will be calculated automatically based on regular and sale price",
    },
    {
        type: "date",
        name: "saleEndDate",
        label: "Sale End Date",
        grid: DEFAULT_GRID,
        placeholder: "Select sale end date",
        helperText: "Date when the promotional price will expire",
    },
    {
        type: "text",
        name: "saleEndsText",
        label: "Sale Ends Text",
        grid: DEFAULT_GRID,
        placeholder: "e.g., 'Sale ends in 2 days!'",
        helperText: "Custom text to create urgency (e.g., 'Sale ends in 2 days!')",
    },
];

const response = {
    regularPrice: "99.99",
    salePrice: "79.99",
    discountPercentage: "20",
    saleEndDate: "2023-12-31",
    saleEndsText: "Limited time offer!",
};

export default PricingConfig;
