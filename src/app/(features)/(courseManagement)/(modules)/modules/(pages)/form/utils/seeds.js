// Sample data for the module preview
export const sampleModuleData = {
  id: "module-123",
  name: "Introduction to React Components",
  summary: "Learn the fundamentals of React components and how to build reusable UI elements.",
  duration: 45,
  moduleOrder: 1,
  bannerImage:
    "https://img.freepik.com/free-vector/react-native-mobile-app-abstract-concept-illustration_335657-3350.jpg",
  introVideo: "https://www.youtube.com/watch?v=4z9bvgTlxKw&list=PLwGdqUZWnOp1Rab71vx2zMF6qpwGDB2Z1",
  description: `
    <p>This module introduces you to React components, the building blocks of React applications. You'll learn how to create functional and class components, understand props and state, and build your first interactive UI elements.</p>
    <p>Through hands-on exercises and practical examples, you'll master the fundamentals of component-based architecture and understand how to structure your React applications effectively.</p>
    <p>By the end of this module, you'll be able to create reusable components and understand the React component lifecycle.</p>
  `,

  learningOutcomes: [
    "Create functional and class components in React",
    "Understand props and state management",
    "Build reusable UI components",
    "Implement component lifecycle methods",
    "Handle events in React components",
    "Apply best practices for component design",
  ],

  preRequisites: [
    "Basic understanding of HTML and CSS",
    "JavaScript fundamentals (ES6+)",
    "Familiarity with modern web development concepts",
  ],

  tags: ["essential", "hands-on", "popular"],
  categoryIds: ["programming"],
  instructors: ["1", "2"],

  attachments: [
    {
      title: "React Components Cheat Sheet",
      description: "Quick reference guide for React component syntax and patterns",
      file: "react-components-cheatsheet.pdf",
    },
    {
      title: "Practice Exercises",
      description: "Hands-on coding exercises to reinforce learning",
      file: "component-exercises.zip",
    },
  ],

  resources: [
    {
      title: "Official React Documentation",
      url: "https://reactjs.org/docs/components-and-props.html",
    },
    {
      title: "React Component Patterns",
      url: "https://reactpatterns.com/",
    },
    {
      title: "Interactive React Tutorial",
      url: "https://react-tutorial.app/",
    },
  ],

  status: "published",
}
