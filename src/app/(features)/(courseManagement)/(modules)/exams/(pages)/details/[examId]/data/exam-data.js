/**
 * Sample exam data for development and testing
 * @description Static exam data used for preview and development purposes
 */
export const examDetailsData = {
    id: "exam-123",
    name: "Complete Web Development Bootcamp",
    summary: "Learn modern web development from scratch to advanced concepts in this comprehensive bootcamp.",
    description: `
        <p>This comprehensive bootcamp takes you from absolute beginner to professional web developer. 
        You'll learn HTML, CSS, JavaScript, React, Node.js, and more through hands-on projects and real-world examples.</p>
        <p>Our step-by-step approach ensures you build a solid foundation before moving on to more advanced topics. 
        By the end of this exam, you'll have the skills to build complete web applications and the confidence to apply for web development positions.</p>
        <p>The exam includes practical projects, coding exercises, and real-world scenarios that prepare you for the modern web development landscape.</p>
    `,
    publishedAt: "2025-05-15",
    instructors: ["1", "2"],
    bannerImage: "https://img.freepik.com/free-vector/website-development-banner_33099-1687.jpg",
    introVideo: "https://www.youtube.com/watch?v=4z9bvgTlxKw&list=PLwGdqUZWnOp1Rab71vx2zMF6qpwGDB2Z1",
    estimatedDuration: 120,
    prerequisites: ["Basic computer skills", "No prior programming experience required"],
    learningOutcomes: [
        "Build responsive websites with HTML, CSS, and JavaScript",
        "Create dynamic web applications with React",
        "Develop backend APIs with Node.js and Express",
        "Deploy full-stack applications to production",
        "Implement authentication and database integration",
        "Master modern development tools and workflows",
    ],
    certificateCriteria: {
        certificateImage: "https://marketplace.canva.com/EAF7ijX8ZNQ/2/0/1600w/canva-q6rkKUKUUH4.jpg",
        certificateImagePreview: "https://marketplace.canva.com/EAF7ijX8ZNQ/2/0/1600w/canva-q6rkKUKUUH4.jpg",
        certificateDescription:
            "Earn a professional certificate upon completion of the exam. This certificate verifies your proficiency in web development fundamentals and can be shared on your resume and professional profiles.",
        certificateBenefits: ["Recognized by industry professionals", "Shareable on LinkedIn and other platforms", "Verifiable through our certificate portal", "Demonstrates practical coding skills"],
    },
    code: "GATE420",
    features: [
        { name: "HTML/CSS", level: "Advanced" },
        { name: "JavaScript", level: "Advanced" },
        { name: "React.js", level: "Intermediate" },
        { name: "Node.js", level: "Intermediate" },
        { name: "MongoDB", level: "Beginner" },
        { name: "Git/GitHub", level: "Intermediate" },
    ],
    price: {
        regularPrice: "199.99",
        salePrice: "149.99",
        discountPercentage: "25",
        saleEndDate: "2025-06-30",
        saleEndsText: "Summer special offer! Enroll now and save 25%",
    },
    attachments: [
        {
            title: "Exam Workbook",
            description: "Comprehensive PDF guide with exercises and examples",
            file: "workbook.pdf",
        },
        {
            title: "Code Examples",
            description: "Starter code and completed projects",
            file: "code-examples.zip",
        },
        {
            title: "Resource Links",
            description: "Curated list of helpful development resources",
            file: "resources.txt",
        },
    ],
    isFeatured: true,
    rating: 4.8,
    reviewCount: 256,
    completionRate: 82,
    tags: ["bestseller", "trending"],
    status: "published",
    duration: 20,
    languageCode: "English",
    difficultyLevel: ["beginner"],
    categoryIds: ["programming", "web-development"],
};
