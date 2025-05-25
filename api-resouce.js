// Course
// schema
// Add Edit api payload
const coursePayload = {
    // basicInformation start
    name: "",
    summary: "",
    duration: 30,
    courseCode: "",
    //  basicInformation end
    //media start
    bannerImage: null,
    thumbnailUrl: null,
    introVideo: "",
    // media end
    // content start
    description: "<p>Enter detailed description here...</p>",
    // content end
    // learning objective start
    learningOutcomes: [""],
    // learning objective end
    // pre Requisites start
    preRequisites: [""],
    // pre Requisites end
    // certificate start
    certificateCriteria: {
        certificateImage: "https://example.com/certificate.png",
        certificateDescription: "This is a sample certificate description.",
        certificateBenefits: ["Benefit 1", "Benefit 2", "Benefit 3"],
    },
    // certificate end
    // skills start
    features: [
        {
            name: "React.js",
            level: "Advanced",
        },
        {
            name: "JavaScript",
            level: "Advanced",
        },
    ],
    // skills end
    // meta data Info start
    tags: ["id", "id"],
    difficultyLevel: ["id"],
    categoryIds: ["id"],
    languageCode: "English Hindi HingLish",
    // meta Info end
    // instructor start
    instructors: ["id"],
    // instructor end

    // attachment start
    attachments: [{ title: "", description: "", file: "" }],
    // attachment end

    // sidebar course status
    status: ["draft", "published", "archive"],
    isFeatured: false,
};

const modulePayload = {
    // basicInformation start
    name: "",
    summary: "",
    duration: 30,
    moduleOrder: 1,
    //  basicInformation end
    //media start
    bannerImage: null,
    thumbnailUrl: null,
    introVideo: "",
    // media end
    // content start
    description: "<p>Enter detailed description here...</p>",
    // content end
    // learning objective start
    learningOutcomes: [""],
    // learning objective end
    // pre Requisites start
    preRequisites: [""],
    // pre Requisites end
    // meta data Info start
    tags: ["id", "id"],
    categoryIds: ["id"],
    // meta Info end
    // instructor start
    instructors: ["id"],
    // instructor end

    // attachment start
    attachments: [{ title: "", description: "", file: "" }],
    // attachment end

    // Additional Resources start
    resources: [{ title: "", url: "" }],
    // Additional Resources end

    // sidebar course status
    status: ["draft", "published", "archive"],
};

// list api
const courseRow = {
    id: "101",
    title: "Complete Web Development Bootcamp",
    summary: "",
    publishedAt: new Date(),
    instructors: [
        {
            name: "Sarah Johnson",
            title: "Senior Developer & Instructor",
            image: "https://randomuser.me/api/portraits/women/44.jpg",
        },
    ],
    isFeatured: false,
    categories: [{ name: "Web Development" }, { name: "JavaScript" }],
    rating: 4.8,
    reviewCount: "2.5k",
    duration: "12 weeks",
    studentCount: "12.5k",
    lessonCount: "75",
    tags: [{ name: "Bestseller" }, "New"],
    thumbnailUrl: "https://img.freepik.com/free-vector/website-development-banner_33099-1687.jpg",
};

// Module
// schema
// Add Edit api payload
const oldModulePayload = {
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
