const sampleQuestionsTableData = {
    totalPages: 10,
    totalDocuments: 100,
    records: [
        {
            id: "101",
            title: "Complete Web Development Bootcamp",
            tags: ["New"],
            summary:
                "Master HTML, CSS, JavaScript, React and Node.js with practical projects and real-world applications. Gain job-ready skills with hands-on experience through building real-world applications from scratch using modern tools and frameworks.",
            instructors: [
                {
                    name: "Sarah Johnson",
                    title: "Senior Developer & Instructor",
                    image: "https://randomuser.me/api/portraits/women/44.jpg",
                },
                {
                    name: "Sarah Johnson",
                    image: "https://randomuser.me/api/portraits/women/44.jpg",
                },
                {
                    name: "Michael Chen",
                    image: "https://randomuser.me/api/portraits/men/32.jpg",
                },
            ],
            rating: 4.8,
            reviewCount: "2.5k",
            duration: "12",
            studentCount: "12.5k",
            questionCount: "75",
            price: {
                current: "$89.99",
                original: "$129.99",
                discount: "30% OFF",
            },
            badges: ["Bestseller", "New"],
            banner: "https://img.freepik.com/free-vector/website-development-banner_33099-1687.jpg",
            progress: 45,
        },
        {
            id: "102",
            title: "React for Beginners",
            summary:
                "Start building modern web apps using React.js from scratch, even if you’ve never coded before. Learn JSX, components, hooks, and routing while creating interactive interfaces that respond dynamically to user actions.",
            instructors: [
                {
                    name: "John Carter",
                    title: "React Instructor",
                    image: "https://randomuser.me/api/portraits/men/45.jpg",
                },
            ],
            rating: 4.6,
            reviewCount: "1.8k",
            duration: "8",
            studentCount: "9.2k",
            questionCount: "60",
            price: {
                current: "$59.99",
                original: "$99.99",
                discount: "40% OFF",
            },
            badges: ["Popular"],
            banner: "https://img.freepik.com/free-vector/react-native-banner_33099-1720.jpg",
            progress: 15,
        },
        {
            id: "103",
            title: "Mastering Node.js",
            summary:
                "Dive deep into backend development with Node.js, Express, and MongoDB. Learn to build scalable APIs and handle databases effectively for production-ready applications with real-world performance in mind.",
            instructors: [
                {
                    name: "Amit Kumar",
                    title: "Backend Expert",
                    image: "https://randomuser.me/api/portraits/men/50.jpg",
                },
            ],
            rating: 4.7,
            reviewCount: "1.3k",
            duration: "10",
            studentCount: "7.5k",
            questionCount: "55",
            price: {
                current: "$69.99",
                original: "$119.99",
                discount: "40% OFF",
            },
            badges: ["Top Rated"],
            banner: "https://img.freepik.com/free-vector/node-js-banner_33099-1721.jpg",
            progress: 5,
        },
        {
            id: "104",
            title: "CSS Flexbox & Grid Mastery",
            summary:
                "Master layout techniques with CSS Flexbox and Grid to build responsive designs. Design clean, adaptive websites with flexible, grid-based structures suitable for mobile-first development practices.",
            instructors: [
                {
                    name: "Emily Stone",
                    title: "UI/UX Designer",
                    image: "https://randomuser.me/api/portraits/women/52.jpg",
                },
            ],
            rating: 4.5,
            reviewCount: "950",
            duration: "5",
            studentCount: "4.3k",
            questionCount: "30",
            price: {
                current: "$39.99",
                original: "$69.99",
                discount: "40% OFF",
            },
            badges: [],
            banner: "https://img.freepik.com/free-vector/css-banner_33099-1722.jpg",
            progress: 85,
        },
        {
            id: "105",
            title: "JavaScript Essentials",
            summary:
                "Learn JavaScript from the ground up and build interactive web features. Develop essential coding logic, DOM manipulation, and real-time functionality for web applications and projects.",
            instructors: [
                {
                    name: "David Green",
                    title: "JavaScript Coach",
                    image: "https://randomuser.me/api/portraits/men/35.jpg",
                },
            ],
            rating: 4.4,
            reviewCount: "1.1k",
            duration: "6",
            studentCount: "5.8k",
            questionCount: "40",
            price: {
                current: "$49.99",
                original: "$79.99",
                discount: "38% OFF",
            },
            badges: [],
            banner: "https://img.freepik.com/free-vector/javascript-banner_33099-1723.jpg",
            progress: 95,
        },
        {
            id: "106",
            title: "Advanced TypeScript",
            summary:
                "Push your JavaScript skills to the next level with a deep dive into TypeScript. Learn static typing, interfaces, generics, and type safety for large-scale application development.",
            instructors: [
                {
                    name: "Megan White",
                    title: "Full Stack Engineer",
                    image: "https://randomuser.me/api/portraits/women/63.jpg",
                },
            ],
            rating: 4.9,
            reviewCount: "820",
            duration: "7",
            studentCount: "3.9k",
            questionCount: "35",
            price: {
                current: "$59.99",
                original: "$89.99",
                discount: "33% OFF",
            },
            badges: ["New"],
            banner: "https://img.freepik.com/free-vector/typescript-banner_33099-1724.jpg",
            progress: 25,
        },
        {
            id: "107",
            title: "Responsive Web Design",
            summary:
                "Learn to build mobile-friendly websites using modern HTML and CSS techniques. Create visually appealing layouts that work across all devices using media queries and responsive strategies.",
            instructors: [
                {
                    name: "Carlos Rivera",
                    title: "Frontend Specialist",
                    image: "https://randomuser.me/api/portraits/men/38.jpg",
                },
            ],
            rating: 4.3,
            reviewCount: "670",
            duration: "4",
            studentCount: "2.2k",
            questionCount: "28",
            price: {
                current: "$34.99",
                original: "$59.99",
                discount: "42% OFF",
            },
            badges: [],
            banner: "https://img.freepik.com/free-vector/responsive-web-design-banner_33099-1725.jpg",
            progress: 0,
        },
        {
            id: "108",
            title: "Vue.js Crash Question",
            summary:
                "Build dynamic web apps using Vue.js, Vue Router, and Vuex in this fast-paced crash question. Get hands-on experience creating single-page applications with reusable and reactive components.",
            instructors: [
                {
                    name: "Sophia Adams",
                    title: "Frontend Developer",
                    image: "https://randomuser.me/api/portraits/women/22.jpg",
                },
            ],
            rating: 4.6,
            reviewCount: "720",
            duration: "6",
            studentCount: "3.3k",
            questionCount: "38",
            price: {
                current: "$44.99",
                original: "$69.99",
                discount: "35% OFF",
            },
            badges: [],
            banner: "https://vuejs.org/images/logo.png",
        },
        {
            id: "109",
            title: "Git & GitHub Masterclass",
            summary:
                "Learn version control with Git and collaborate efficiently with GitHub workflows. Understand branches, commits, merge conflicts, and open-source contributions through practical real-world usage.",
            instructors: [
                {
                    name: "James Lee",
                    title: "DevOps Trainer",
                    image: "https://randomuser.me/api/portraits/men/58.jpg",
                },
                {
                    name: "Sarah Johnson",
                    image: "https://randomuser.me/api/portraits/women/44.jpg",
                },
                {
                    name: "Michael Chen",
                    image: "https://randomuser.me/api/portraits/men/32.jpg",
                },
            ],
            rating: 4.7,
            reviewCount: "1.2k",
            duration: "3",
            studentCount: "6.1k",
            questionCount: "25",
            price: {
                current: "$24.99",
                original: "$49.99",
                discount: "50% OFF",
            },
            badges: ["Top Rated"],
            banner: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=1400&q=80",
        },
        {
            id: "110",
            title: "Intro to Python Programming",
            summary:
                "Start your coding journey with Python — one of the most beginner-friendly programming languages. Learn basic syntax, control structures, and how to automate tasks using Python scripts.",
            instructors: [
                {
                    name: "Linda Baker",
                    title: "Data Science Mentor",
                    image: "https://randomuser.me/api/portraits/women/30.jpg",
                },
            ],
            rating: 4.5,
            reviewCount: "2.0k",
            duration: "8",
            studentCount: "11.2k",
            questionCount: "50",
            price: {
                current: "$54.99",
                original: "$89.99",
                discount: "39% OFF",
            },
            badges: ["Bestseller"],
            banner: "https://img.freepik.com/free-vector/python-programming-language-banner_33099-1726.jpg",
        },
    ],
};

export default sampleQuestionsTableData;
