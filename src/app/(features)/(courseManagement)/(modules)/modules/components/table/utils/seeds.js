const sampleModulesTableData = {
    totalPages: 5,
    totalDocuments: 10,
    records: [
        {
            id: "101",
            title: "Overview of Web Development",
            description: "Get a comprehensive introduction to web development, covering HTML, CSS, and JavaScript. Learn the fundamentals of building responsive websites.",
            instructor: [
                {
                    name: "Sarah Johnson",
                    image: "https://randomuser.me/api/portraits/women/44.jpg",
                    role: "Senior FullStack Instructor",
                },
                {
                    name: "Michael Chen",
                    image: "https://randomuser.me/api/portraits/men/32.jpg",
                },
                {
                    name: "Emily Rodriguez",
                    image: "https://randomuser.me/api/portraits/women/28.jpg",
                },
            ],
            duration: "1 week",
            lessonCount: "15",
            publishedAt: "2025-01-15",
            banner: "https://img.freepik.com/free-vector/website-development-banner_33099-1687.jpg",
            featured: true,
            progress: 65, // Progress percentage (0-100)
        },
        {
            id: "102",
            title: "JavaScript Essentials",
            description: "Master the fundamentals of JavaScript, including variables, functions, arrays, objects, and asynchronous programming.",
            instructor: [
                {
                    name: "James Anderson",
                    image: "https://randomuser.me/api/portraits/men/32.jpg",
                },
            ],
            duration: "2 weeks",
            lessonCount: "20",
            publishedAt: "2025-01-22",
            banner: "https://img.freepik.com/free-vector/javascript-programming-language-computer-programming-concept_1017-28136.jpg",
        },
        {
            id: "103",
            title: "HTML & CSS for Beginners",
            description: "Learn how to structure web pages using HTML and style them with modern CSS, including Flexbox and Grid.",
            instructor: [
                {
                    name: "Emily Davis",
                    image: "https://randomuser.me/api/portraits/women/68.jpg",
                },
            ],
            duration: "1 week",
            lessonCount: "12",
            publishedAt: "2025-02-01",
            banner: "https://img.freepik.com/free-vector/html-css-programming-languages-computer-code-developer-concept_1017-30840.jpg",
        },
        {
            id: "104",
            title: "Responsive Web Design",
            description: "Learn the principles of responsive web design and how to build mobile-friendly websites using media queries and flexible layouts.",
            instructor: [
                {
                    name: "Michael Lee",
                    image: "https://randomuser.me/api/portraits/men/47.jpg",
                },
            ],
            duration: "1 week",
            lessonCount: "10",
            publishedAt: "2025-02-10",
            banner: "https://img.freepik.com/free-vector/responsive-design-abstract-concept-illustration_335657-2027.jpg",
        },
        {
            id: "105",
            title: "React Fundamentals",
            description: "Get started with React, a popular JavaScript library for building user interfaces. Learn about components, props, state, and hooks.",
            instructor: [
                {
                    name: "Jessica Brown",
                    image: "https://randomuser.me/api/portraits/women/25.jpg",
                },
            ],
            duration: "2 weeks",
            lessonCount: "18",
            publishedAt: "2025-02-18",
            banner: "https://img.freepik.com/free-vector/react-native-programming-language-concept_23-2148783101.jpg",
        },
        {
            id: "106",
            title: "Backend with Node.js",
            description: "Explore backend development using Node.js. Learn how to build APIs, work with Express.js, and connect to databases.",
            instructor: [
                {
                    name: "Daniel Wilson",
                    image: "https://randomuser.me/api/portraits/men/58.jpg",
                },
            ],
            duration: "2 weeks",
            lessonCount: "22",
            publishedAt: "2025-03-01",
            banner: "https://img.freepik.com/free-vector/backend-programming-concept-illustration_114360-3912.jpg",
        },
        {
            id: "107",
            title: "Database Basics with MongoDB",
            description: "Understand the basics of NoSQL databases with MongoDB. Learn CRUD operations, schema design, and data modeling.",
            instructor: [
                {
                    name: "Laura Martinez",
                    image: "https://randomuser.me/api/portraits/women/77.jpg",
                },
            ],
            duration: "1 week",
            lessonCount: "14",
            publishedAt: "2025-03-10",
            banner: "https://img.freepik.com/free-vector/database-storage-isometric-illustration_23-2148738094.jpg",
        },
        {
            id: "108",
            title: "Version Control with Git & GitHub",
            description: "Learn version control with Git and collaborate on projects using GitHub. Cover branching, merging, pull requests, and more.",
            instructor: [
                {
                    name: "Chris Evans",
                    image: "https://randomuser.me/api/portraits/men/12.jpg",
                },
            ],
            duration: "1 week",
            lessonCount: "10",
            publishedAt: "2025-03-18",
            banner: "https://img.freepik.com/free-vector/git-hosting-service-concept-illustration_114360-3995.jpg",
        },
        {
            id: "109",
            title: "Full-Stack Project: Blog Website",
            description: "Build a full-stack blog application from scratch using HTML, CSS, React, Node.js, and MongoDB. Deploy it to the web.",
            instructor: [
                {
                    name: "Olivia Turner",
                    image: "https://randomuser.me/api/portraits/women/38.jpg",
                },
            ],
            duration: "3 weeks",
            lessonCount: "25",
            publishedAt: "2025-03-25",
            banner: "https://img.freepik.com/free-vector/blogging-concept-illustration_114360-1038.jpg",
        },
        {
            id: "110",
            title: "Deploying Apps with Netlify & Vercel",
            description: "Learn how to deploy static and dynamic web applications using platforms like Netlify and Vercel.",
            instructor: [
                {
                    name: "Brian Clark",
                    image: "https://randomuser.me/api/portraits/men/77.jpg",
                },
            ],
            duration: "1 week",
            lessonCount: "8",
            publishedAt: "2025-04-01",
            banner: "https://img.freepik.com/free-vector/cloud-hosting-concept-illustration_114360-7425.jpg",
        },
    ],
};

export default sampleModulesTableData;
