export interface InstructorType {
  id: string
  name: string
  profileImage: string
  role: string
  bio: string
  company: string
  courseCount: number
  studentCount: number
  reviewAverage: number
}

export interface SkillType {
  name: string
  level: string
  category: string
}

export interface TestimonialType {
  id: string
  name: string
  avatar: string
  rating: number
  date: Date
  comment: string
  position: string
}

export interface CourseType {
  id: string
  title: string
  subtitle: string
  description: string
  level: string
  category: string
  subcategory: string
  language: string
  lastUpdated: Date
  publishedAt: Date
  duration: number
  lectureCount: number
  articleCount: number
  downloadableResources: number
  accessType: string
  certificationAvailable: boolean
  rating: number
  reviewCount: number
  studentCount: number
  price: number
  discountPrice: number
  discountEnds: Date
  instructors: InstructorType[]
  learningObjectives: string[]
  requirements: string[]
  skills: SkillType[]
  testimonials: TestimonialType[]
}

// Sample course data
export const courseData: CourseType = {
  id: "course-123",
  title: "Complete React Developer Masterclass",
  subtitle: "Become a professional React developer with advanced patterns and best practices",
  description:
    "<p>This comprehensive course will take you from beginner to advanced React developer. You'll learn everything from the fundamentals to the most advanced patterns and techniques used by top developers in the industry.</p><p>Through hands-on projects and real-world examples, you'll gain the skills and confidence to build complex, high-performance React applications that scale. Whether you're looking to land your first developer job, advance in your career, or build your own projects, this course will give you the tools you need to succeed.</p><p>By the end of this course, you'll have a deep understanding of React's core concepts, advanced patterns, state management, performance optimization, and much more.</p>",
  level: "All Levels",
  category: "Web Development",
  subcategory: "React",
  language: "English",
  lastUpdated: new Date("2025-04-15"),
  publishedAt: new Date("2024-10-01"),
  duration: 42, // hours
  lectureCount: 285,
  articleCount: 42,
  downloadableResources: 35,
  accessType: "Lifetime",
  certificationAvailable: true,
  rating: 4.8,
  reviewCount: 4752,
  studentCount: 28945,
  price: 129.99,
  discountPrice: 84.99,
  discountEnds: new Date("2025-06-01"),
  instructors: [
    {
      id: "1",
      name: "Sarah Johnson",
      profileImage: "/placeholder.svg?height=100&width=100",
      role: "Senior React Developer",
      bio: "10+ years of experience building scalable React applications",
      company: "Former Tech Lead at Facebook",
      courseCount: 12,
      studentCount: 125000,
      reviewAverage: 4.9,
    },
    {
      id: "2",
      name: "Michael Chen",
      profileImage: "/placeholder.svg?height=100&width=100",
      role: "Performance Optimization Expert",
      bio: "Author of 'React at Scale' and performance consultant",
      company: "Senior Architect at Netflix",
      courseCount: 8,
      studentCount: 98000,
      reviewAverage: 4.8,
    },
  ],
  learningObjectives: [
    "Master React fundamentals including components, props, and state",
    "Build complex user interfaces with advanced component patterns",
    "Implement state management with Context API, Redux, and Zustand",
    "Create performant applications with memoization, code splitting, and lazy loading",
    "Develop custom hooks for reusable logic across components",
    "Build a complete e-commerce application from scratch",
    "Deploy React applications to production environments",
    "Implement authentication and authorization in React applications",
    "Write clean, maintainable, and testable React code",
    "Debug and troubleshoot common React issues",
  ],
  requirements: [
    "Basic knowledge of HTML, CSS, and JavaScript",
    "Understanding of ES6+ features (arrow functions, destructuring, etc.)",
    "Familiarity with npm or yarn package managers",
    "A computer with Node.js installed (instructions included)",
    "No prior React knowledge required - we'll start from the basics",
  ],
  skills: [
    {
      name: "React.js",
      level: "Advanced",
      category: "Frontend",
    },
    {
      name: "JavaScript",
      level: "Advanced",
      category: "Programming",
    },
    {
      name: "State Management",
      level: "Advanced",
      category: "Architecture",
    },
    {
      name: "Performance Optimization",
      level: "Advanced",
      category: "Development",
    },
    {
      name: "Component Design",
      level: "Advanced",
      category: "UI/UX",
    },
    {
      name: "Testing",
      level: "Intermediate",
      category: "Quality Assurance",
    },
  ],
  testimonials: [
    {
      id: "review-1",
      name: "Alex Thompson",
      avatar: "/placeholder.svg?height=50&width=50",
      rating: 5,
      date: new Date("2025-03-15"),
      comment:
        "This course completely transformed my understanding of React. The advanced patterns section was particularly eye-opening. I've already applied what I learned to improve performance in our company's application.",
      position: "Frontend Developer at Airbnb",
    },
    {
      id: "review-2",
      name: "Priya Sharma",
      avatar: "/placeholder.svg?height=50&width=50",
      rating: 5,
      date: new Date("2025-02-28"),
      comment:
        "Incredible depth of content. The instructors explain complex concepts in a way that's easy to understand. The projects are challenging but extremely rewarding. Highly recommend!",
      position: "Senior Software Engineer",
    },
    {
      id: "review-3",
      name: "David Wilson",
      avatar: "/placeholder.svg?height=50&width=50",
      rating: 4,
      date: new Date("2025-01-10"),
      comment:
        "Great course overall. The section on performance optimization was particularly valuable. My only suggestion would be to include more content on testing React applications.",
      position: "Tech Lead",
    },
  ],
}
