const DEFAULT_GRID = 1;

const BasicDetailsConfig = [
    {
        type: "text",
        name: "title",
        label: "Course Title",
        grid: DEFAULT_GRID,
        placeholder: "Enter course title",
        validationRules: { required: true },
        validateOnChange: true,
    },
    {
        type: "textarea",
        name: "shortDescription",
        label: "Course Short Description",
        grid: DEFAULT_GRID,
        placeholder: "Write course short description",
    },
    {
        type: "textarea",
        name: "description",
        label: "Course Description",
        grid: DEFAULT_GRID,
        placeholder: "Write COurse description",
    },
    {
        type: "text",
        name: "category",
        label: "Course Category/Subject",
        grid: DEFAULT_GRID,
        placeholder: "Enter course category/subject",
        validationRules: { required: true },
        validateOnChange: true,
    },
    {
        type: "file",
        name: "bannerImage",
        label: "Banner Image Upload",
        grid: DEFAULT_GRID,
        validationRules: { required: true },
        validateOnChange: true,
    },
    {
        type: "file",
        name: "thumbnailImage",
        label: "Thumbnail Image Upload",
        grid: DEFAULT_GRID,
        validationRules: { required: true },
        validateOnChange: true,
    },
    {
        type: "text",
        name: "previewVideoUrl",
        label: "Preview Video URL",
        grid: DEFAULT_GRID,
        placeholder: "Enter preview video URL",
    },
    {
        type: "select",
        name: "badges",
        label: "Badges (Bestseller, New, Popular, etc.)",
        placeholder: "Select badges",
        multiple: true,
        grid: DEFAULT_GRID,
        options: [
            { value: "bestseller", label: "Bestseller" },
            { value: "new", label: "New" },
            { value: "popular", label: "Popular" },
            // Add more badges as needed
        ],
    },
];

export default BasicDetailsConfig;
