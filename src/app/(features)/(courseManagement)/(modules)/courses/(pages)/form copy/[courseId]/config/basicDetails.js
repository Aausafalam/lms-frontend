const DEFAULT_GRID = 2;

const BasicDetailsConfig = [
    {
        type: "text",
        name: "title",
        label: "Course Title",
        placeholder: "Enter course title",
        validationRules: { required: true },
        validateOnChange: true,
        grid: DEFAULT_GRID,
        helperText: "Use a descriptive and engaging title (60 characters max)",
    },
    {
        type: "text",
        name: "category",
        label: "Course Category/Subject",
        grid: DEFAULT_GRID,
        placeholder: "Enter course category/subject",
        validationRules: { required: true },
        validateOnChange: true,
        helperText: "Select the main category your course belongs to",
    },
    {
        type: "textarea",
        name: "shortDescription",
        label: "Course Short Description",
        grid: DEFAULT_GRID,
        placeholder: "Write course short description",
        wordCount: true,
        maxWords: 50,
        helperText: "Brief summary of your course (50 words max)",
    },
    {
        type: "textarea",
        name: "description",
        label: "Course Description",
        grid: DEFAULT_GRID,
        placeholder: "Write Course description",
        wordCount: true,
        maxWords: 500,
        helperText: "Detailed description explaining what students will learn",
    },
    {
        type: "file",
        name: "bannerImage",
        label: "Banner Image Upload",
        grid: DEFAULT_GRID,
        validationRules: { required: true },
        validateOnChange: true,
        helperText: "Recommended size: 1920x400px, max 2MB (JPG, PNG)",
    },
    {
        type: "file",
        name: "thumbnailImage",
        label: "Thumbnail Image Upload",
        grid: DEFAULT_GRID,
        validationRules: { required: true },
        validateOnChange: true,
        helperText: "Recommended size: 600x400px, max 1MB (JPG, PNG)",
        multiple: true,
    },
    {
        type: "text",
        name: "previewVideoUrl",
        label: "Preview Video URL",
        grid: DEFAULT_GRID,
        placeholder: "Enter preview video URL",
        helperText: "YouTube or Vimeo URL for course preview",
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
        helperText: "Add badges to highlight special features of your course",
    },
];

const response = {
    title: "Sample Course",
    category: "Web Development",
    shortDescription: "Learn the basics of web development.",
    description: "This course covers HTML, CSS, and JavaScript.",
    bannerImage: null,
    thumbnailImage: null,
    previewVideoUrl: "https://www.youtube.com/watch?v=example",
    badges: ["bestseller", "new"],
};

export default BasicDetailsConfig;
