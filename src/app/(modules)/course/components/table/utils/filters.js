const FILTER_OPTIONS = {
    status: {
        options: [
            { label: "Active", value: "true" },
            { label: "Inactive", value: "false" },
        ],
    },
    rating: {
        options: [
            { label: "5 Stars", value: "5" },
            { label: "4+ Stars", value: "4" },
            { label: "3+ Stars", value: "3" },
            { label: "2+ Stars", value: "2" },
            { label: "1+ Stars", value: "1" },
        ],
    },
    experience: {
        options: [
            { label: "0-2 years", value: "0-2" },
            { label: "3-5 years", value: "3-5" },
            { label: "6-10 years", value: "6-10" },
            { label: "10+ years", value: "10+" },
        ],
    },
};

export default FILTER_OPTIONS;
