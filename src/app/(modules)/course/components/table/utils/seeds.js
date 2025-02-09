const sampleCourseTableData = {
    totalPages: 10,
    totalDocuments: 100,
    data: [
        {
            id: "d249e885-f71e-43e2-baf6-de20cf8a6877",
            name: "Course 1",
            status: "published",
            isPublic: false,
            duration: 30,
            createdAt: "2025-02-08T22:54:42.693334",
            languageCode: "hi",
            categoryId: "1", // Added
            difficultyLevel: "Beginner", // Added
            instructorIds: ["instructor-1", "instructor-2"], // Added
            tags: ["Tag A", "Tag B"], // Added
        },
        {
            id: "30b4f03d-91b4-4b22-96d9-7aa6548d241e",
            name: "Course 2",
            status: "archived",
            isPublic: false,
            duration: 8,
            createdAt: "2025-02-08T22:54:42.693396",
            languageCode: "hi",
            categoryId: "2",
            difficultyLevel: "Intermediate",
            instructorIds: ["instructor-3"],
            tags: ["Tag C"],
        },
        {
            id: "4a6b66b9-0944-4a7f-8a8d-752895cbf330",
            name: "Course 3",
            status: "draft",
            isPublic: true,
            duration: 11,
            createdAt: "2025-02-08T22:54:42.693431",
            languageCode: "de",
            categoryId: "3",
            difficultyLevel: "Advanced",
            instructorIds: ["instructor-4", "instructor-5"],
            tags: ["Tag D", "Tag E"],
        },
        {
            id: "cfffc5d4-6e61-4a27-897d-981d146bd0b5",
            name: "Course 4",
            status: "draft",
            isPublic: true,
            duration: 11,
            createdAt: "2025-02-08T22:54:42.693455",
            languageCode: "fr",
            categoryId: "4",
            difficultyLevel: "Beginner",
            instructorIds: ["instructor-6"],
            tags: ["Tag F"],
        },
        {
            id: "6d719ab4-2a14-4e18-adfc-590f6d150454",
            name: "Course 5",
            status: "published",
            isPublic: false,
            duration: 52,
            createdAt: "2025-02-08T22:54:42.693513",
            languageCode: "de",
            categoryId: "1",
            difficultyLevel: "Intermediate",
            instructorIds: ["instructor-1", "instructor-3"],
            tags: ["Tag A", "Tag G"],
        },
    ],
};

export default sampleCourseTableData;
