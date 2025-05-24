// Course
// schema
// Add Edit api payload
const coursePayload = {
    title: "",
    shortDescription: "",
    longDescription: "<p>Enter detailed description here...</p>",
    publishedAt: new Date(),
    instructors: ["werwe"],
    bannerImage: null,
    introVideo: "",
    estimatedDuration: 30,
    preRequisites: [""],
    learningObjectives: [""],
    price: {
        regularPrice: "99.99",
        salePrice: "79.99",
        discountPercentage: "20",
        saleEndDate: "2023-12-31",
        saleEndsText: "Limited time offer!",
    },
    certificate: {
        certificateImage: "https://example.com/certificate.png",
        certificateDescription: "This is a sample certificate description.",
        certificateBenefits: ["Benefit 1", "Benefit 2", "Benefit 3"],
    },
    skills: [
        {
            name: "React.js",
            level: "Advanced",
        },
        {
            name: "JavaScript",
            level: "Advanced",
        },
    ],
    tags: ["id", "id"],
    isPublished: false,
    isFeatured: false,
};

// list api
const courseRow = {
    title: "",
    shortDescription: "",
    publishedAt: new Date(),
    instructors: ["werwe"],
    bannerImage: null,
    price: {
        regularPrice: "99.99",
        salePrice: "79.99",
        discountPercentage: "20",
        saleEndDate: "2023-12-31",
        saleEndsText: "Limited time offer!",
    },
    tags: ["id", "id"],
    isPublished: false,
    isFeatured: false,
};

// Module
// schema
// Add Edit api payload
const modulePayload = {
    title: "",
    shortDescription: "",
    longDescription: "<p>Enter detailed description here...</p>",
    publishedAt: new Date(),
    instructors: [],
    bannerImage: null,
    bannerImagePreview: "",
    modulePosition: 1,
    introVideo: "",
    estimatedDuration: 30,
    difficulty: ["intermediate"],
    categories: [],
    preRequisites: [""],
    learningObjectives: [""],
    resources: [{ title: "", url: "" }],
    quizQuestions: [],
    tags: [],
    isPublished: false,
    isFeatured: false,
};

// list api
const moduleRow = {
    title: "",
    shortDescription: "",
    publishedAt: new Date(),
    instructors: ["werwe"],
    bannerImage: null,
    tags: ["id", "id"],
};
