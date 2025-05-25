/**
 * Sample course data for preview and testing
 * This matches the new coursePayload structure
 */
export const sampleCourseData = {
  id: "course-123",
  name: "Complete Web Development Bootcamp",
  summary: "Learn modern web development from scratch to advanced concepts in this comprehensive bootcamp.",
  duration: 120,
  courseCode: "WEB-DEV-2024",

  bannerImage: null,
  bannerImagePreview: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop",
  thumbnailUrl: null,
  thumbnailPreview: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
  introVideo: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",

  description: `
    <p>This comprehensive bootcamp takes you from absolute beginner to professional web developer. You'll learn HTML, CSS, JavaScript, React, Node.js, and more through hands-on projects and real-world examples.</p>
    <p>Our step-by-step approach ensures you build a solid foundation before moving on to more advanced topics. By the end of this course, you'll have the skills to build complete web applications and the confidence to apply for web development positions.</p>
    <p>The course includes practical projects, coding exercises, and real-world scenarios that prepare you for the modern web development landscape.</p>
  `,

  learningOutcomes: [
    "Build responsive websites with HTML, CSS, and JavaScript",
    "Create dynamic web applications with React",
    "Develop backend APIs with Node.js and Express",
    "Deploy full-stack applications to production",
    "Implement authentication and database integration",
    "Master modern development tools and workflows",
  ],

  preRequisites: [
    "Basic computer skills and internet navigation",
    "No prior programming experience required",
    "Willingness to learn and practice coding daily",
  ],

  certificateCriteria: {
    certificateImage: "/placeholder.svg?height=300&width=500",
    certificateImagePreview: "/placeholder.svg?height=300&width=500",
    certificateDescription:
      "Earn a professional certificate upon completion of the course. This certificate verifies your proficiency in web development fundamentals and can be shared on your resume and professional profiles.",
    certificateBenefits: [
      "Recognized by industry professionals",
      "Shareable on LinkedIn and other platforms",
      "Verifiable through our certificate portal",
      "Demonstrates practical coding skills",
    ],
  },

  features: [
    { name: "HTML/CSS", level: "Advanced" },
    { name: "JavaScript", level: "Advanced" },
    { name: "React.js", level: "Intermediate" },
    { name: "Node.js", level: "Intermediate" },
    { name: "MongoDB", level: "Beginner" },
    { name: "Git/GitHub", level: "Intermediate" },
  ],

  tags: ["bestseller", "trending", "popular"],
  difficultyLevel: ["beginner"],
  categoryIds: ["programming", "web-development"],
  languageCode: "English",

  instructors: ["1", "2"],

  attachments: [
    {
      title: "Course Workbook",
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

  status: "published",
  isFeatured: true,
}
