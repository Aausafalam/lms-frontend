"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Icons from lucide-react
import {
    User,
    Bell,
    BookOpen,
    Users,
    BarChart3,
    Calendar,
    FileText,
    Award,
    MessageSquare,
    Clock,
    CheckCircle,
    ChevronDown,
    Search,
    Menu,
    X,
    Edit,
    Upload,
    Star,
    Mail,
    Phone,
    MapPin,
    Globe,
    Shield,
    PieChart,
    Layers,
    Zap,
    Bookmark,
    Video,
    Sparkles,
    TrendingUp,
    Lightbulb,
    Code,
    Github,
    Linkedin,
    Twitter,
    Youtube,
    DollarSign,
    Smartphone,
} from "lucide-react";

export default function UserProfile() {
    const [activeTab, setActiveTab] = useState("overview");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [userData, setUserData] = useState({
        id: "12345",
        name: "Alex Johnson",
        role: "Teacher", // Can be "Admin", "Teacher", "Student"
        email: "alex.johnson@example.com",
        avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
        coverPhoto: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80",
        bio: "Passionate educator with 8+ years of experience in computer science and mathematics. Dedicated to creating engaging learning experiences that inspire students to explore the world of technology and problem-solving.",
        joinDate: "January 2021",
        phone: "+1 (555) 123-4567",
        location: "San Francisco, CA",
        website: "www.alexjohnson.edu",
        socialLinks: {
            twitter: "alexj_edu",
            linkedin: "alexjohnson",
            github: "alexj-dev",
        },
        stats: {
            coursesCreated: 12,
            studentsEnrolled: 450,
            averageRating: 4.8,
            completionRate: 92,
            totalRevenue: 45600,
            teachingHours: 1240,
        },
        skills: ["Computer Science", "Mathematics", "Python", "JavaScript", "Data Structures", "Algorithms", "Machine Learning", "Web Development", "React", "Node.js"],
        achievements: [
            { id: 1, title: "Top Educator 2023", icon: "Award", description: "Recognized as one of the top educators on the platform", date: "Dec 2023" },
            { id: 2, title: "100% Course Completion", icon: "CheckCircle", description: "Maintained 100% course completion rate for 6 months", date: "Oct 2023" },
            { id: 3, title: "500+ Students Milestone", icon: "Users", description: "Reached 500 enrolled students across all courses", date: "Sep 2023" },
            { id: 4, title: "Content Creator Award", icon: "Sparkles", description: "Created exceptional learning materials and resources", date: "Aug 2023" },
            { id: 5, title: "Innovation in Teaching", icon: "Lightbulb", description: "Implemented innovative teaching methods", date: "Jul 2023" },
        ],
        recentActivity: [
            { id: 1, type: "course_update", title: "Updated 'Advanced Python' course materials", time: "2 hours ago", details: "Added new section on advanced decorators and metaclasses" },
            { id: 2, type: "assignment_graded", title: "Graded 24 assignments for 'Data Structures'", time: "Yesterday", details: "Average score: 87/100" },
            { id: 3, type: "discussion", title: "Responded to 5 discussion threads", time: "2 days ago", details: "Topics included recursion, dynamic programming, and algorithm complexity" },
            { id: 4, type: "announcement", title: "Posted new announcement for 'Web Development'", time: "3 days ago", details: "Upcoming guest lecture from industry expert" },
            { id: 5, type: "live_session", title: "Completed live coding session", time: "4 days ago", details: "90 students attended the session on React Hooks" },
        ],
        courses: [
            {
                id: 1,
                title: "Advanced Python Programming",
                description: "Master advanced Python concepts including decorators, generators, metaclasses, and concurrency.",
                thumbnail: "https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1089&q=80",
                students: 78,
                progress: 100,
                rating: 4.9,
                lastUpdated: "2 weeks ago",
                modules: 12,
                duration: "24 hours",
                level: "Advanced",
            },
            {
                id: 2,
                title: "Data Structures & Algorithms",
                description: "Comprehensive guide to fundamental data structures and algorithms with practical implementations.",
                thumbnail: "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
                students: 65,
                progress: 85,
                rating: 4.7,
                lastUpdated: "1 month ago",
                modules: 15,
                duration: "32 hours",
                level: "Intermediate",
            },
            {
                id: 3,
                title: "Web Development Fundamentals",
                description: "Learn HTML, CSS, and JavaScript to build responsive and interactive websites from scratch.",
                thumbnail: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
                students: 120,
                progress: 92,
                rating: 4.8,
                lastUpdated: "3 weeks ago",
                modules: 10,
                duration: "20 hours",
                level: "Beginner",
            },
            {
                id: 4,
                title: "Machine Learning Basics",
                description: "Introduction to machine learning concepts, algorithms, and practical applications with Python.",
                thumbnail: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
                students: 95,
                progress: 78,
                rating: 4.6,
                lastUpdated: "1 week ago",
                modules: 8,
                duration: "18 hours",
                level: "Intermediate",
            },
        ],
        notifications: [
            {
                id: 1,
                type: "message",
                content: "New message from student David",
                time: "1 hour ago",
                read: false,
                sender: {
                    name: "David Kim",
                    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80",
                },
            },
            { id: 2, type: "system", content: "System maintenance scheduled", time: "5 hours ago", read: true },
            { id: 3, type: "assignment", content: "15 new assignment submissions", time: "Yesterday", read: false, course: "Data Structures & Algorithms" },
            { id: 4, type: "review", content: "New 5-star review on your course", time: "Yesterday", read: false, course: "Advanced Python Programming" },
            { id: 5, type: "enrollment", content: "3 new students enrolled in your course", time: "2 days ago", read: true, course: "Web Development Fundamentals" },
        ],
        calendar: [
            { id: 1, title: "Live Coding Session", date: "Today, 2:00 PM", type: "live", duration: "1 hour", course: "Advanced Python Programming" },
            { id: 2, title: "Office Hours", date: "Tomorrow, 10:00 AM", type: "office_hours", duration: "2 hours" },
            { id: 3, title: "Assignment Deadline", date: "Apr 5, 11:59 PM", type: "deadline", course: "Data Structures & Algorithms" },
            { id: 4, title: "Guest Lecture", date: "Apr 8, 3:00 PM", type: "lecture", duration: "1.5 hours", course: "Web Development Fundamentals" },
            { id: 5, title: "Course Planning", date: "Apr 10, 1:00 PM", type: "planning", duration: "3 hours" },
        ],
        earnings: [
            { month: "Jan", amount: 3200 },
            { month: "Feb", amount: 3800 },
            { month: "Mar", amount: 4200 },
            { month: "Apr", amount: 3900 },
            { month: "May", amount: 4500 },
            { month: "Jun", amount: 5100 },
            { month: "Jul", amount: 4800 },
            { month: "Aug", amount: 5300 },
            { month: "Sep", amount: 5700 },
            { month: "Oct", amount: 6200 },
            { month: "Nov", amount: 5900 },
            { month: "Dec", amount: 6500 },
        ],
        studentEngagement: [
            { week: "Week 1", active: 320, total: 450 },
            { week: "Week 2", active: 380, total: 450 },
            { week: "Week 3", active: 410, total: 450 },
            { week: "Week 4", active: 390, total: 450 },
            { week: "Week 5", active: 420, total: 450 },
            { week: "Week 6", active: 440, total: 450 },
        ],
        testimonials: [
            {
                id: 1,
                name: "Sarah Johnson",
                role: "Student",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80",
                content: "Alex's teaching style is exceptional. The way he breaks down complex concepts made learning Python so much easier for me.",
                course: "Advanced Python Programming",
            },
            {
                id: 2,
                name: "Michael Chen",
                role: "Student",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80",
                content: "The Data Structures course was challenging but incredibly rewarding. Alex provides clear explanations and practical examples that really help solidify the concepts.",
                course: "Data Structures & Algorithms",
            },
            {
                id: 3,
                name: "Emily Rodriguez",
                role: "Student",
                avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80",
                content: "I've taken several online courses, but Alex's Web Development course stands out. The projects are practical and the feedback is always constructive.",
                course: "Web Development Fundamentals",
            },
        ],
    });

    // Function to handle role change (for demo purposes)
    const changeRole = (newRole) => {
        setUserData((prev) => ({ ...prev, role: newRole }));
    };

    // Function to toggle dark mode
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.documentElement.classList.toggle("dark");
    };

    // Function to render different content based on user role
    const renderRoleSpecificContent = () => {
        switch (userData.role) {
            case "Admin":
                return <AdminDashboard userData={userData} />;
            case "Teacher":
                return <TeacherDashboard userData={userData} />;
            case "Student":
                return <StudentDashboard userData={userData} />;
            default:
                return <TeacherDashboard userData={userData} />;
        }
    };

    return (
        <div className={`min-h-screen ${isDarkMode ? "dark bg-gray-900" : "bg-gray-50"}`}>
            {/* Top Navigation */}
            <nav className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} border-b sticky top-0 z-50 shadow-sm`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 flex items-center">
                                <div className="h-10 w-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg">
                                    <Sparkles className="h-6 w-6" />
                                </div>
                                <span className={`ml-2 text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>EduLearn</span>
                            </div>
                            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                <Link href="#" className={`border-indigo-500 ${isDarkMode ? "text-white" : "text-gray-900"} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}>
                                    Dashboard
                                </Link>
                                <Link
                                    href="#"
                                    className={`border-transparent ${
                                        isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-500 hover:text-gray-700"
                                    } hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                                >
                                    Courses
                                </Link>
                                <Link
                                    href="#"
                                    className={`border-transparent ${
                                        isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-500 hover:text-gray-700"
                                    } hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                                >
                                    Calendar
                                </Link>
                                <Link
                                    href="#"
                                    className={`border-transparent ${
                                        isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-500 hover:text-gray-700"
                                    } hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                                >
                                    Messages
                                </Link>
                                <Link
                                    href="#"
                                    className={`border-transparent ${
                                        isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-500 hover:text-gray-700"
                                    } hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                                >
                                    Community
                                </Link>
                            </div>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:items-center">
                            {/* Search */}
                            <div className="relative mx-4">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className={`h-4 w-4 ${isDarkMode ? "text-gray-400" : "text-gray-400"}`} />
                                </div>
                                <input
                                    type="text"
                                    className={`block w-full pl-10 pr-3 py-2 border ${
                                        isDarkMode ? "border-gray-700 bg-gray-700 text-white placeholder-gray-400" : "border-gray-300 bg-white placeholder-gray-500"
                                    } rounded-md leading-5 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-200`}
                                    placeholder="Search courses, students..."
                                />
                            </div>

                            {/* Dark mode toggle */}
                            <button
                                onClick={toggleDarkMode}
                                className={`p-1 rounded-full ${
                                    isDarkMode ? "bg-gray-700 text-yellow-300" : "bg-gray-100 text-gray-500"
                                } hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3`}
                            >
                                <span className="sr-only">Toggle dark mode</span>
                                {isDarkMode ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                                        />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                    </svg>
                                )}
                            </button>

                            {/* Notification bell */}
                            <div className="relative">
                                <button
                                    className={`p-1 rounded-full ${
                                        isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-400 hover:text-gray-500"
                                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 relative`}
                                    onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                                >
                                    <span className="sr-only">View notifications</span>
                                    <Bell className="h-6 w-6" />
                                    <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-400 ring-2 ring-white"></span>
                                </button>

                                {/* Notification dropdown */}
                                {isNotificationOpen && (
                                    <div
                                        className={`origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg py-1 ${
                                            isDarkMode ? "bg-gray-800 ring-gray-700" : "bg-white ring-black ring-opacity-5"
                                        } focus:outline-none z-10 ring-1`}
                                    >
                                        <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                                            <h3 className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>Notifications</h3>
                                        </div>
                                        <div className="max-h-96 overflow-y-auto">
                                            {userData.notifications.map((notification) => (
                                                <div
                                                    key={notification.id}
                                                    className={`px-4 py-3 hover:${isDarkMode ? "bg-gray-700" : "bg-gray-50"} ${
                                                        notification.read ? "" : isDarkMode ? "bg-gray-700/50" : "bg-indigo-50/50"
                                                    } transition-colors duration-200`}
                                                >
                                                    <div className="flex items-start">
                                                        {notification.type === "message" && notification.sender && (
                                                            <div className="flex-shrink-0 mr-3">
                                                                <Image
                                                                    src={notification.sender.avatar || "/placeholder.svg"}
                                                                    alt={notification.sender.name}
                                                                    width={40}
                                                                    height={40}
                                                                    className="h-10 w-10 rounded-full object-cover"
                                                                />
                                                            </div>
                                                        )}
                                                        {notification.type === "message" && !notification.sender && (
                                                            <div className="flex-shrink-0 mr-3">
                                                                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                                                    <MessageSquare className="h-5 w-5 text-indigo-600" />
                                                                </div>
                                                            </div>
                                                        )}
                                                        {notification.type === "system" && (
                                                            <div className="flex-shrink-0 mr-3">
                                                                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                                                                    <Bell className="h-5 w-5 text-gray-600" />
                                                                </div>
                                                            </div>
                                                        )}
                                                        {notification.type === "assignment" && (
                                                            <div className="flex-shrink-0 mr-3">
                                                                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                                                                    <FileText className="h-5 w-5 text-green-600" />
                                                                </div>
                                                            </div>
                                                        )}
                                                        {notification.type === "review" && (
                                                            <div className="flex-shrink-0 mr-3">
                                                                <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                                                                    <Star className="h-5 w-5 text-yellow-600" />
                                                                </div>
                                                            </div>
                                                        )}
                                                        {notification.type === "enrollment" && (
                                                            <div className="flex-shrink-0 mr-3">
                                                                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                                                                    <Users className="h-5 w-5 text-purple-600" />
                                                                </div>
                                                            </div>
                                                        )}
                                                        <div className="flex-1 min-w-0">
                                                            <p className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>{notification.content}</p>
                                                            {notification.course && <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"} mt-0.5`}>Course: {notification.course}</p>}
                                                            <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"} mt-0.5`}>{notification.time}</p>
                                                        </div>
                                                        <div className="ml-3 flex-shrink-0">
                                                            <div className={`h-2 w-2 rounded-full ${notification.read ? "bg-transparent" : "bg-indigo-500"}`}></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
                                            <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
                                                View all notifications
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Profile dropdown */}
                            <div className="ml-3 relative">
                                <div>
                                    <button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                        <span className="sr-only">Open user menu</span>
                                        <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-100 ring-2 ring-indigo-500">
                                            <Image src={userData.avatar || "/placeholder.svg"} alt="User avatar" width={32} height={32} className="h-full w-full object-cover" />
                                        </div>
                                    </button>
                                </div>
                                {isMenuOpen && (
                                    <div
                                        className={`origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 ${
                                            isDarkMode ? "bg-gray-800 ring-gray-700" : "bg-white ring-black ring-opacity-5"
                                        } focus:outline-none z-10 ring-1`}
                                    >
                                        <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                                            <p className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>{userData.name}</p>
                                            <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{userData.email}</p>
                                        </div>
                                        <Link href="#" className={`block px-4 py-2 text-sm ${isDarkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`}>
                                            Your Profile
                                        </Link>
                                        <Link href="#" className={`block px-4 py-2 text-sm ${isDarkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`}>
                                            Settings
                                        </Link>
                                        <Link href="#" className={`block px-4 py-2 text-sm ${isDarkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`}>
                                            Help Center
                                        </Link>
                                        <div className="border-t border-gray-200 dark:border-gray-700"></div>
                                        <Link href="#" className={`block px-4 py-2 text-sm ${isDarkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`}>
                                            Sign out
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="-mr-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className={`inline-flex items-center justify-center p-2 rounded-md ${
                                    isDarkMode ? "text-gray-400 hover:text-white hover:bg-gray-700" : "text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                                } focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500`}
                            >
                                <span className="sr-only">Open main menu</span>
                                {isMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile menu */}
            {/* {isMenuOpen && (
        <div className="sm:hidden">
          <div className={`pt-2 pb-3 space-y-1 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <Link href="#" className={\`${isDarkMode ? 'bg-gray-900 border-  : \'bg-white\'}`}>
            <Link href="#" className={`${isDarkMode ? 'bg-gray-900 border-indigo-500 text-white' : 'bg-indigo-50 border-indigo-500 text-indigo-700'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}>
              Dashboard
            </Link>
            <Link href="#" className={`border-transparent ${isDarkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}>
              Courses
            </Link>
            <Link href="#" className={`border-transparent ${isDarkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}>
              Calendar
            </Link>
            <Link href="#" className={`border-transparent ${isDarkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}>
              Messages
            </Link>
            <Link href="#" className={`border-transparent ${isDarkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}>
              Community
            </Link>
          </div>
          <div className={`pt-4 pb-3 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full overflow-hidden">
                  <Image
                    src={userData.avatar || "/placeholder.svg"}
                    alt="User avatar"
                    width={40}
                    height={40}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <div className="ml-3">
                <div className={`text-base font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{userData.name}</div>
                <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{userData.email}</div>
              </div>
              <button className="ml-auto flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <span className="sr-only">View notifications</span>
                <Bell className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-3 space-y-1">
              <Link href="#" className={`block px-4 py-2 text-base font-medium ${isDarkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'}`}>
                Your Profile
              </Link>
              <Link href="#" className={`block px-4 py-2 text-base font-medium ${isDarkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'}`}>
                Settings
              </Link>
              <Link href="#" className={`block px-4 py-2 text-base font-medium ${isDarkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'}`}>
                Help Center
              </Link>
              <Link href="#" className={`block px-4 py-2 text-base font-medium ${isDarkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'}`}>
                Sign out
              </Link>
            </div>
          </div>
        </div> */}
            {/* )} */}

            {/* Profile Header */}
            <div className="relative">
                <div className="h-60 sm:h-80 w-full bg-gradient-to-r from-purple-600 to-indigo-600 relative">
                    <Image src={userData.coverPhoto || "/placeholder.svg"} alt="Cover photo" fill className="w-full h-full object-cover opacity-40" />
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/80 to-indigo-600/80 mix-blend-multiply"></div>

                    {/* Decorative elements */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white opacity-5 rounded-full"></div>
                        <div className="absolute top-1/2 -right-24 w-64 h-64 bg-white opacity-5 rounded-full"></div>
                        <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-white opacity-5 rounded-full"></div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative -mt-24 sm:-mt-32">
                        <div className="flex flex-col sm:flex-row items-center sm:items-end">
                            <div className="h-36 w-36 sm:h-40 sm:w-40 rounded-full ring-4 ring-white dark:ring-gray-800 overflow-hidden bg-white shadow-xl transform hover:scale-105 transition-transform duration-300">
                                <Image src={userData.avatar || "/placeholder.svg"} alt="User avatar" width={160} height={160} className="h-full w-full object-cover" />
                            </div>

                            <div className="mt-6 sm:mt-0 sm:ml-6 text-center sm:text-left">
                                <div className="flex flex-col sm:flex-row items-center">
                                    <h1 className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>{userData.name}</h1>
                                    <div className="mt-2 sm:mt-0 sm:ml-4 px-4 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md">
                                        {userData.role}
                                    </div>
                                </div>
                                <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-500"} mt-2`}>
                                    <Mail className="h-4 w-4 inline mr-1" /> {userData.email} •
                                    <span className="ml-2">
                                        <MapPin className="h-4 w-4 inline mr-1" /> {userData.location}
                                    </span>
                                </p>
                                <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-500"} mt-1`}>
                                    <Clock className="h-4 w-4 inline mr-1" /> Joined {userData.joinDate}
                                </p>

                                <div className="mt-4 flex flex-wrap gap-2">
                                    {userData.skills.slice(0, 4).map((skill, index) => (
                                        <span
                                            key={index}
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                isDarkMode ? "bg-gray-800 text-gray-200" : "bg-indigo-100 text-indigo-800"
                                            }`}
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                    {userData.skills.length > 4 && (
                                        <span
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                isDarkMode ? "bg-gray-800 text-gray-200" : "bg-indigo-100 text-indigo-800"
                                            }`}
                                        >
                                            +{userData.skills.length - 4} more
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="mt-6 sm:mt-0 sm:ml-auto flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-md text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200">
                                    <Edit className="h-4 w-4 mr-2" /> Edit Profile
                                </button>
                                <div className="relative">
                                    <button
                                        className={`inline-flex items-center px-4 py-2 border ${
                                            isDarkMode ? "border-gray-600 bg-gray-700 text-white hover:bg-gray-600" : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                                        } text-sm font-medium rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200`}
                                        onClick={() => {
                                            // For demo purposes, cycle through roles
                                            const roles = ["Admin", "Teacher", "Student"];
                                            const currentIndex = roles.indexOf(userData.role);
                                            const nextIndex = (currentIndex + 1) % roles.length;
                                            changeRole(roles[nextIndex]);
                                        }}
                                    >
                                        <Shield className="h-4 w-4 mr-2" /> Change Role
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Profile Navigation */}
            <div className={`border-b ${isDarkMode ? "border-gray-700" : "border-gray-200"} mt-8 sticky top-16 z-30 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="-mb-px flex space-x-8 overflow-x-auto scrollbar-hide">
                        <button
                            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                                activeTab === "overview"
                                    ? `border-indigo-500 ${isDarkMode ? "text-indigo-400" : "text-indigo-600"}`
                                    : `border-transparent ${isDarkMode ? "text-gray-400 hover:text-gray-300 hover:border-gray-600" : "text-gray-500 hover:text-gray-700 hover:border-gray-300"}`
                            } transition-colors duration-200`}
                            onClick={() => setActiveTab("overview")}
                        >
                            Overview
                        </button>
                        <button
                            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                                activeTab === "courses"
                                    ? `border-indigo-500 ${isDarkMode ? "text-indigo-400" : "text-indigo-600"}`
                                    : `border-transparent ${isDarkMode ? "text-gray-400 hover:text-gray-300 hover:border-gray-600" : "text-gray-500 hover:text-gray-700 hover:border-gray-300"}`
                            } transition-colors duration-200`}
                            onClick={() => setActiveTab("courses")}
                        >
                            {userData.role === "Student" ? "My Courses" : "Courses"}
                        </button>
                        <button
                            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                                activeTab === "activity"
                                    ? `border-indigo-500 ${isDarkMode ? "text-indigo-400" : "text-indigo-600"}`
                                    : `border-transparent ${isDarkMode ? "text-gray-400 hover:text-gray-300 hover:border-gray-600" : "text-gray-500 hover:text-gray-700 hover:border-gray-300"}`
                            } transition-colors duration-200`}
                            onClick={() => setActiveTab("activity")}
                        >
                            Activity
                        </button>
                        {userData.role !== "Student" && (
                            <button
                                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === "analytics"
                                        ? `border-indigo-500 ${isDarkMode ? "text-indigo-400" : "text-indigo-600"}`
                                        : `border-transparent ${isDarkMode ? "text-gray-400 hover:text-gray-300 hover:border-gray-600" : "text-gray-500 hover:text-gray-700 hover:border-gray-300"}`
                                } transition-colors duration-200`}
                                onClick={() => setActiveTab("analytics")}
                            >
                                Analytics
                            </button>
                        )}
                        <button
                            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                                activeTab === "calendar"
                                    ? `border-indigo-500 ${isDarkMode ? "text-indigo-400" : "text-indigo-600"}`
                                    : `border-transparent ${isDarkMode ? "text-gray-400 hover:text-gray-300 hover:border-gray-600" : "text-gray-500 hover:text-gray-700 hover:border-gray-300"}`
                            } transition-colors duration-200`}
                            onClick={() => setActiveTab("calendar")}
                        >
                            Calendar
                        </button>
                        {userData.role !== "Student" && (
                            <button
                                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === "earnings"
                                        ? `border-indigo-500 ${isDarkMode ? "text-indigo-400" : "text-indigo-600"}`
                                        : `border-transparent ${isDarkMode ? "text-gray-400 hover:text-gray-300 hover:border-gray-600" : "text-gray-500 hover:text-gray-700 hover:border-gray-300"}`
                                } transition-colors duration-200`}
                                onClick={() => setActiveTab("earnings")}
                            >
                                Earnings
                            </button>
                        )}
                        <button
                            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                                activeTab === "settings"
                                    ? `border-indigo-500 ${isDarkMode ? "text-indigo-400" : "text-indigo-600"}`
                                    : `border-transparent ${isDarkMode ? "text-gray-400 hover:text-gray-300 hover:border-gray-600" : "text-gray-500 hover:text-gray-700 hover:border-gray-300"}`
                            } transition-colors duration-200`}
                            onClick={() => setActiveTab("settings")}
                        >
                            Settings
                        </button>
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {activeTab === "overview" && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column */}
                        <div className="lg:col-span-1 space-y-8">
                            {/* About Section */}
                            <div
                                className={`${isDarkMode ? "bg-gray-800 text-white" : "bg-white"} shadow-lg rounded-xl p-6 border ${
                                    isDarkMode ? "border-gray-700" : "border-gray-100"
                                } transform transition-all duration-300 hover:shadow-xl`}
                            >
                                <h2 className={`text-lg font-medium ${isDarkMode ? "text-white" : "text-gray-900"} mb-4 flex items-center`}>
                                    <User className="h-5 w-5 mr-2 text-indigo-500" /> About
                                </h2>
                                <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"} mb-6 leading-relaxed`}>{userData.bio}</p>

                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <Mail className={`h-5 w-5 ${isDarkMode ? "text-gray-400" : "text-gray-400"} mr-2`} />
                                        <span className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>{userData.email}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Phone className={`h-5 w-5 ${isDarkMode ? "text-gray-400" : "text-gray-400"} mr-2`} />
                                        <span className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>{userData.phone}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <MapPin className={`h-5 w-5 ${isDarkMode ? "text-gray-400" : "text-gray-400"} mr-2`} />
                                        <span className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>{userData.location}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Globe className={`h-5 w-5 ${isDarkMode ? "text-gray-400" : "text-gray-400"} mr-2`} />
                                        <a href={`https://${userData.website}`} className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
                                            {userData.website}
                                        </a>
                                    </div>
                                </div>

                                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                                    <h3 className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"} mb-3`}>Social</h3>
                                    <div className="flex space-x-4">
                                        <a href="#" className={`${isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-400 hover:text-gray-500"} transition-colors duration-200`}>
                                            <span className="sr-only">Twitter</span>
                                            <Twitter className="h-6 w-6" />
                                        </a>
                                        <a href="#" className={`${isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-400 hover:text-gray-500"} transition-colors duration-200`}>
                                            <span className="sr-only">LinkedIn</span>
                                            <Linkedin className="h-6 w-6" />
                                        </a>
                                        <a href="#" className={`${isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-400 hover:text-gray-500"} transition-colors duration-200`}>
                                            <span className="sr-only">GitHub</span>
                                            <Github className="h-6 w-6" />
                                        </a>
                                        <a href="#" className={`${isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-400 hover:text-gray-500"} transition-colors duration-200`}>
                                            <span className="sr-only">YouTube</span>
                                            <Youtube className="h-6 w-6" />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Skills Section */}
                            <div
                                className={`${isDarkMode ? "bg-gray-800 text-white" : "bg-white"} shadow-lg rounded-xl p-6 border ${
                                    isDarkMode ? "border-gray-700" : "border-gray-100"
                                } transform transition-all duration-300 hover:shadow-xl`}
                            >
                                <h2 className={`text-lg font-medium ${isDarkMode ? "text-white" : "text-gray-900"} mb-4 flex items-center`}>
                                    <Code className="h-5 w-5 mr-2 text-indigo-500" /> Skills
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    {userData.skills.map((skill, index) => (
                                        <span
                                            key={index}
                                            className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${
                                                isDarkMode ? "bg-gray-700 text-indigo-300 border border-gray-600" : "bg-indigo-100 text-indigo-800"
                                            } transition-colors duration-200 hover:bg-opacity-80`}
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Achievements Section */}
                            <div
                                className={`${isDarkMode ? "bg-gray-800 text-white" : "bg-white"} shadow-lg rounded-xl p-6 border ${
                                    isDarkMode ? "border-gray-700" : "border-gray-100"
                                } transform transition-all duration-300 hover:shadow-xl`}
                            >
                                <h2 className={`text-lg font-medium ${isDarkMode ? "text-white" : "text-gray-900"} mb-4 flex items-center`}>
                                    <Award className="h-5 w-5 mr-2 text-indigo-500" /> Achievements
                                </h2>
                                <div className="space-y-4">
                                    {userData.achievements.map((achievement) => (
                                        <div
                                            key={achievement.id}
                                            className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-50 hover:bg-gray-100"} transition-colors duration-200`}
                                        >
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
                                                    {achievement.icon === "Award" && <Award className="h-6 w-6" />}
                                                    {achievement.icon === "CheckCircle" && <CheckCircle className="h-6 w-6" />}
                                                    {achievement.icon === "Users" && <Users className="h-6 w-6" />}
                                                    {achievement.icon === "Sparkles" && <Sparkles className="h-6 w-6" />}
                                                    {achievement.icon === "Lightbulb" && <Lightbulb className="h-6 w-6" />}
                                                </div>
                                                <div className="ml-4">
                                                    <h3 className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>{achievement.title}</h3>
                                                    <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"} mt-1`}>{achievement.description}</p>
                                                    <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"} mt-1`}>{achievement.date}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Testimonials */}
                            <div
                                className={`${isDarkMode ? "bg-gray-800 text-white" : "bg-white"} shadow-lg rounded-xl p-6 border ${
                                    isDarkMode ? "border-gray-700" : "border-gray-100"
                                } transform transition-all duration-300 hover:shadow-xl`}
                            >
                                <h2 className={`text-lg font-medium ${isDarkMode ? "text-white" : "text-gray-900"} mb-4 flex items-center`}>
                                    <MessageSquare className="h-5 w-5 mr-2 text-indigo-500" /> Student Testimonials
                                </h2>
                                <div className="space-y-6">
                                    {userData.testimonials.map((testimonial) => (
                                        <div key={testimonial.id} className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-700" : "bg-gray-50"}`}>
                                            <div className="flex items-start">
                                                <div className="flex-shrink-0">
                                                    <Image
                                                        src={testimonial.avatar || "/placeholder.svg"}
                                                        alt={testimonial.name}
                                                        width={40}
                                                        height={40}
                                                        className="h-10 w-10 rounded-full object-cover"
                                                    />
                                                </div>
                                                <div className="ml-3">
                                                    <p className={`text-sm italic ${isDarkMode ? "text-gray-300" : "text-gray-600"} leading-relaxed`}>"{testimonial.content}"</p>
                                                    <div className="mt-2 flex items-center">
                                                        <span className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>{testimonial.name}</span>
                                                        <span className={`mx-1 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>•</span>
                                                        <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{testimonial.course}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Stats Section */}
                            <div
                                className={`${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-lg rounded-xl overflow-hidden border ${
                                    isDarkMode ? "border-gray-700" : "border-gray-100"
                                } transform transition-all duration-300 hover:shadow-xl`}
                            >
                                <div className={`px-6 py-5 ${isDarkMode ? "bg-gray-700" : "bg-gradient-to-r from-purple-500 to-indigo-600"}`}>
                                    <h2 className="text-lg font-medium text-white">Performance Overview</h2>
                                </div>
                                <dl className="grid grid-cols-1 md:grid-cols-4 gap-px bg-gray-200 dark:bg-gray-700">
                                    {userData.role === "Teacher" && (
                                        <>
                                            <div className={`px-4 py-5 sm:p-6 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
                                                <dt className={`text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-500"} truncate`}>Courses Created</dt>
                                                <dd className="mt-1 flex items-baseline justify-between">
                                                    <div className="flex items-baseline text-2xl font-semibold text-indigo-600 dark:text-indigo-400">{userData.stats.coursesCreated}</div>
                                                    <div className="inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                                        <TrendingUp className="-ml-1 mr-0.5 h-4 w-4 text-green-500" />
                                                        <span>12%</span>
                                                    </div>
                                                </dd>
                                            </div>
                                            <div className={`px-4 py-5 sm:p-6 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
                                                <dt className={`text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-500"} truncate`}>Students Enrolled</dt>
                                                <dd className="mt-1 flex items-baseline justify-between">
                                                    <div className="flex items-baseline text-2xl font-semibold text-indigo-600 dark:text-indigo-400">{userData.stats.studentsEnrolled}</div>
                                                    <div className="inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                                        <TrendingUp className="-ml-1 mr-0.5 h-4 w-4 text-green-500" />
                                                        <span>18%</span>
                                                    </div>
                                                </dd>
                                            </div>
                                            <div className={`px-4 py-5 sm:p-6 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
                                                <dt className={`text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-500"} truncate`}>Average Rating</dt>
                                                <dd className="mt-1 flex items-baseline justify-between">
                                                    <div className="flex items-baseline text-2xl font-semibold text-indigo-600 dark:text-indigo-400">
                                                        {userData.stats.averageRating}
                                                        <span className="ml-1 text-sm font-medium text-gray-500 dark:text-gray-400">/ 5.0</span>
                                                    </div>
                                                    <div className="inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                                        <TrendingUp className="-ml-1 mr-0.5 h-4 w-4 text-green-500" />
                                                        <span>4%</span>
                                                    </div>
                                                </dd>
                                            </div>
                                            <div className={`px-4 py-5 sm:p-6 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
                                                <dt className={`text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-500"} truncate`}>Completion Rate</dt>
                                                <dd className="mt-1 flex items-baseline justify-between">
                                                    <div className="flex items-baseline text-2xl font-semibold text-indigo-600 dark:text-indigo-400">{userData.stats.completionRate}%</div>
                                                    <div className="inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                                        <TrendingUp className="-ml-1 mr-0.5 h-4 w-4 text-green-500" />
                                                        <span>7%</span>
                                                    </div>
                                                </dd>
                                            </div>
                                        </>
                                    )}

                                    {userData.role === "Student" && (
                                        <>
                                            <div className={`px-4 py-5 sm:p-6 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
                                                <dt className={`text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-500"} truncate`}>Courses Enrolled</dt>
                                                <dd className="mt-1 flex items-baseline justify-between">
                                                    <div className="flex items-baseline text-2xl font-semibold text-indigo-600 dark:text-indigo-400">8</div>
                                                    <div className="inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                                        <TrendingUp className="-ml-1 mr-0.5 h-4 w-4 text-green-500" />
                                                        <span>New</span>
                                                    </div>
                                                </dd>
                                            </div>
                                            <div className={`px-4 py-5 sm:p-6 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
                                                <dt className={`text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-500"} truncate`}>Completed Courses</dt>
                                                <dd className="mt-1 flex items-baseline justify-between">
                                                    <div className="flex items-baseline text-2xl font-semibold text-indigo-600 dark:text-indigo-400">5</div>
                                                    <div className="inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                                        <TrendingUp className="-ml-1 mr-0.5 h-4 w-4 text-green-500" />
                                                        <span>2</span>
                                                    </div>
                                                </dd>
                                            </div>
                                            <div className={`px-4 py-5 sm:p-6 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
                                                <dt className={`text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-500"} truncate`}>Average Grade</dt>
                                                <dd className="mt-1 flex items-baseline justify-between">
                                                    <div className="flex items-baseline text-2xl font-semibold text-indigo-600 dark:text-indigo-400">A-</div>
                                                    <div className="inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                                        <TrendingUp className="-ml-1 mr-0.5 h-4 w-4 text-green-500" />
                                                        <span>↑</span>
                                                    </div>
                                                </dd>
                                            </div>
                                            <div className={`px-4 py-5 sm:p-6 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
                                                <dt className={`text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-500"} truncate`}>Assignments Due</dt>
                                                <dd className="mt-1 flex items-baseline justify-between">
                                                    <div className="flex items-baseline text-2xl font-semibold text-indigo-600 dark:text-indigo-400">3</div>
                                                    <div className="inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                                                        <Clock className="-ml-1 mr-0.5 h-4 w-4 text-yellow-500" />
                                                        <span>Soon</span>
                                                    </div>
                                                </dd>
                                            </div>
                                        </>
                                    )}

                                    {userData.role === "Admin" && (
                                        <>
                                            <div className={`px-4 py-5 sm:p-6 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
                                                <dt className={`text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-500"} truncate`}>Total Users</dt>
                                                <dd className="mt-1 flex items-baseline justify-between">
                                                    <div className="flex items-baseline text-2xl font-semibold text-indigo-600 dark:text-indigo-400">1,254</div>
                                                    <div className="inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                                        <TrendingUp className="-ml-1 mr-0.5 h-4 w-4 text-green-500" />
                                                        <span>12%</span>
                                                    </div>
                                                </dd>
                                            </div>
                                            <div className={`px-4 py-5 sm:p-6 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
                                                <dt className={`text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-500"} truncate`}>Active Courses</dt>
                                                <dd className="mt-1 flex items-baseline justify-between">
                                                    <div className="flex items-baseline text-2xl font-semibold text-indigo-600 dark:text-indigo-400">87</div>
                                                    <div className="inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                                        <TrendingUp className="-ml-1 mr-0.5 h-4 w-4 text-green-500" />
                                                        <span>8%</span>
                                                    </div>
                                                </dd>
                                            </div>
                                            <div className={`px-4 py-5 sm:p-6 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
                                                <dt className={`text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-500"} truncate`}>System Uptime</dt>
                                                <dd className="mt-1 flex items-baseline justify-between">
                                                    <div className="flex items-baseline text-2xl font-semibold text-indigo-600 dark:text-indigo-400">99.8%</div>
                                                    <div className="inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                                        <TrendingUp className="-ml-1 mr-0.5 h-4 w-4 text-green-500" />
                                                        <span>Stable</span>
                                                    </div>
                                                </dd>
                                            </div>
                                            <div className={`px-4 py-5 sm:p-6 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
                                                <dt className={`text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-500"} truncate`}>Pending Approvals</dt>
                                                <dd className="mt-1 flex items-baseline justify-between">
                                                    <div className="flex items-baseline text-2xl font-semibold text-indigo-600 dark:text-indigo-400">12</div>
                                                    <div className="inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                                                        <Clock className="-ml-1 mr-0.5 h-4 w-4 text-yellow-500" />
                                                        <span>Action</span>
                                                    </div>
                                                </dd>
                                            </div>
                                        </>
                                    )}
                                </dl>
                            </div>

                            {/* Recent Activity */}
                            <div
                                className={`${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-lg rounded-xl overflow-hidden border ${
                                    isDarkMode ? "border-gray-700" : "border-gray-100"
                                } transform transition-all duration-300 hover:shadow-xl`}
                            >
                                <div className={`px-6 py-5 ${isDarkMode ? "bg-gray-700" : "bg-gradient-to-r from-purple-500 to-indigo-600"} flex justify-between items-center`}>
                                    <h2 className="text-lg font-medium text-white">Recent Activity</h2>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white bg-opacity-20 text-white">Last 7 days</span>
                                </div>
                                <div className="p-6">
                                    <div className="flow-root">
                                        <ul className="-mb-8">
                                            {userData.recentActivity.map((activity, index) => (
                                                <li key={activity.id}>
                                                    <div className="relative pb-8">
                                                        {index !== userData.recentActivity.length - 1 && (
                                                            <span
                                                                className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gradient-to-b from-purple-500 to-indigo-500 opacity-20"
                                                                aria-hidden="true"
                                                            ></span>
                                                        )}
                                                        <div className="relative flex items-start space-x-3">
                                                            <div className="relative">
                                                                <div
                                                                    className={`h-10 w-10 rounded-full flex items-center justify-center ring-8 ${isDarkMode ? "ring-gray-800" : "ring-white"} ${
                                                                        activity.type === "course_update"
                                                                            ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                                                                            : activity.type === "assignment_graded"
                                                                            ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
                                                                            : activity.type === "discussion"
                                                                            ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300"
                                                                            : activity.type === "announcement"
                                                                            ? "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300"
                                                                            : "bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300"
                                                                    }`}
                                                                >
                                                                    {activity.type === "course_update" && <BookOpen className="h-5 w-5" />}
                                                                    {activity.type === "assignment_graded" && <FileText className="h-5 w-5" />}
                                                                    {activity.type === "discussion" && <MessageSquare className="h-5 w-5" />}
                                                                    {activity.type === "announcement" && <Bell className="h-5 w-5" />}
                                                                    {activity.type === "live_session" && <Video className="h-5 w-5" />}
                                                                </div>
                                                            </div>
                                                            <div className="min-w-0 flex-1">
                                                                <div>
                                                                    <div className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>{activity.title}</div>
                                                                    <p className={`mt-0.5 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{activity.time}</p>
                                                                </div>
                                                                {activity.details && <div className={`mt-2 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{activity.details}</div>}
                                                            </div>
                                                            <div className="flex-shrink-0 self-center">
                                                                <button
                                                                    className={`rounded-full p-1 ${
                                                                        isDarkMode ? "text-gray-400 hover:text-white hover:bg-gray-700" : "text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                                                                    }`}
                                                                >
                                                                    <span className="sr-only">View details</span>
                                                                    <ChevronDown className="h-5 w-5" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="mt-6">
                                        <a
                                            href="#"
                                            className={`w-full flex justify-center items-center px-4 py-2 border ${
                                                isDarkMode ? "border-gray-700 bg-gray-700 text-white hover:bg-gray-600" : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                                            } shadow-sm text-sm font-medium rounded-md transition-colors duration-200`}
                                        >
                                            View all activity
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Courses Preview */}
                            <div
                                className={`${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-lg rounded-xl overflow-hidden border ${
                                    isDarkMode ? "border-gray-700" : "border-gray-100"
                                } transform transition-all duration-300 hover:shadow-xl`}
                            >
                                <div className={`px-6 py-5 ${isDarkMode ? "bg-gray-700" : "bg-gradient-to-r from-purple-500 to-indigo-600"} flex justify-between items-center`}>
                                    <h2 className="text-lg font-medium text-white">{userData.role === "Student" ? "Enrolled Courses" : "My Courses"}</h2>
                                    <a href="#" className="text-sm font-medium text-white hover:text-indigo-100 flex items-center">
                                        View all <ChevronDown className="ml-1 h-4 w-4 transform rotate-270" />
                                    </a>
                                </div>
                                <div className="p-6 grid gap-6">
                                    {userData.courses.slice(0, 3).map((course) => (
                                        <div
                                            key={course.id}
                                            className={`rounded-xl overflow-hidden shadow-md ${
                                                isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-white hover:bg-gray-50"
                                            } transition-all duration-300 transform hover:-translate-y-1`}
                                        >
                                            <div className="flex flex-col sm:flex-row">
                                                <div className="sm:w-1/3 relative h-40 sm:h-auto">
                                                    <Image src={course.thumbnail || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
                                                    <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent"></div>
                                                    <div className="absolute bottom-2 left-2 flex items-center">
                                                        <div className="flex items-center bg-white/90 rounded-full px-2 py-1 text-xs font-medium text-gray-800">
                                                            <Clock className="h-3 w-3 mr-1" />
                                                            {course.duration}
                                                        </div>
                                                    </div>
                                                    <div className="absolute top-2 right-2">
                                                        <div className="flex items-center bg-indigo-600/90 rounded-full px-2 py-1 text-xs font-medium text-white">{course.level}</div>
                                                    </div>
                                                </div>
                                                <div className="sm:w-2/3 p-4">
                                                    <div className="flex items-center justify-between">
                                                        <h3 className={`text-lg font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>{course.title}</h3>
                                                        <div className="flex items-center">
                                                            <Star className="h-4 w-4 text-yellow-400" />
                                                            <span className={`ml-1 text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>{course.rating}</span>
                                                        </div>
                                                    </div>
                                                    <p className={`mt-1 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"} line-clamp-2`}>{course.description}</p>
                                                    <div className="mt-3 flex items-center text-sm text-gray-500">
                                                        <Users className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                                        <span className={`${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{course.students} students</span>
                                                        <span className="mx-2">•</span>
                                                        <Layers className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                                        <span className={`${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{course.modules} modules</span>
                                                    </div>
                                                    <div className="mt-4">
                                                        <div className="flex items-center justify-between text-sm mb-1">
                                                            <span className={`${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Progress</span>
                                                            <span className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>{course.progress}%</span>
                                                        </div>
                                                        <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                                                            <div className="h-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full" style={{ width: `${course.progress}%` }}></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "courses" && (
                    <div className="space-y-8">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <h2 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>{userData.role === "Student" ? "My Enrolled Courses" : "My Courses"}</h2>
                            <div className="mt-4 sm:mt-0 flex flex-wrap gap-3">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Search className={`h-4 w-4 ${isDarkMode ? "text-gray-400" : "text-gray-400"}`} />
                                    </div>
                                    <input
                                        type="text"
                                        className={`block w-full pl-10 pr-3 py-2 border ${
                                            isDarkMode ? "border-gray-700 bg-gray-700 text-white placeholder-gray-400" : "border-gray-300 bg-white placeholder-gray-500"
                                        } rounded-md leading-5 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-200`}
                                        placeholder="Search courses..."
                                    />
                                </div>
                                {userData.role !== "Student" && (
                                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-md text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200">
                                        <Zap className="h-4 w-4 mr-2" /> Create New Course
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {userData.courses.map((course) => (
                                <div
                                    key={course.id}
                                    className={`rounded-xl overflow-hidden shadow-lg ${isDarkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-50"} border ${
                                        isDarkMode ? "border-gray-700" : "border-gray-100"
                                    } transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl`}
                                >
                                    <div className="h-48 relative">
                                        <Image src={course.thumbnail || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <h3 className="text-xl font-bold text-white">{course.title}</h3>
                                            <div className="mt-1 flex items-center">
                                                <div className="flex items-center">
                                                    <Star className="h-4 w-4 text-yellow-400" />
                                                    <span className="ml-1 text-sm text-white">{course.rating}</span>
                                                </div>
                                                <span className="mx-2 text-white">•</span>
                                                <div className="flex items-center text-white text-sm">
                                                    <Users className="h-4 w-4 mr-1" />
                                                    {course.students}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="absolute top-4 right-4 flex space-x-2">
                                            <div className="bg-indigo-600/90 rounded-full px-2 py-1 text-xs font-medium text-white">{course.level}</div>
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"} line-clamp-2 mb-4`}>{course.description}</p>

                                        <div className="flex items-center justify-between text-sm mb-2">
                                            <div className="flex items-center">
                                                <Clock className={`h-4 w-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"} mr-1`} />
                                                <span className={`${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{course.duration}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <Layers className={`h-4 w-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"} mr-1`} />
                                                <span className={`${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{course.modules} modules</span>
                                            </div>
                                            <div className="flex items-center">
                                                <Clock className={`h-4 w-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"} mr-1`} />
                                                <span className={`${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Updated {course.lastUpdated}</span>
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <div className="flex items-center justify-between text-sm mb-1">
                                                <span className={`${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Progress</span>
                                                <span className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>{course.progress}%</span>
                                            </div>
                                            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                                                <div className="h-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full" style={{ width: `${course.progress}%` }}></div>
                                            </div>
                                        </div>

                                        <div className="flex space-x-3">
                                            <button className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 shadow-md">
                                                {userData.role === "Student" ? "Continue Learning" : "Manage Course"}
                                            </button>
                                            <button
                                                className={`inline-flex items-center px-3 py-2 border ${
                                                    isDarkMode ? "border-gray-600 bg-gray-700 text-white hover:bg-gray-600" : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                                                } shadow-md text-sm leading-4 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200`}
                                            >
                                                <Bookmark className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {userData.role !== "Student" && (
                            <div className={`mt-8 p-6 rounded-xl border-2 border-dashed ${isDarkMode ? "border-gray-700" : "border-gray-300"} flex flex-col items-center justify-center text-center`}>
                                <div className={`h-16 w-16 rounded-full ${isDarkMode ? "bg-gray-700" : "bg-indigo-100"} flex items-center justify-center mb-4`}>
                                    <Zap className={`h-8 w-8 ${isDarkMode ? "text-indigo-400" : "text-indigo-600"}`} />
                                </div>
                                <h3 className={`text-lg font-medium ${isDarkMode ? "text-white" : "text-gray-900"} mb-2`}>Create a New Course</h3>
                                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"} max-w-md mb-4`}>
                                    Share your knowledge with the world. Create a new course and reach thousands of eager students.
                                </p>
                                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-md text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200">
                                    <Zap className="h-4 w-4 mr-2" /> Get Started
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === "activity" && (
                    <div className="space-y-8">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <h2 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Activity Timeline</h2>
                            <div className="mt-4 sm:mt-0 flex items-center space-x-3">
                                <div className="relative inline-block text-left">
                                    <button
                                        className={`inline-flex justify-center w-full rounded-md border ${
                                            isDarkMode ? "border-gray-700 bg-gray-700" : "border-gray-300 bg-white"
                                        } px-4 py-2 text-sm font-medium ${
                                            isDarkMode ? "text-white" : "text-gray-700"
                                        } hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                                    >
                                        <span>Last 7 days</span>
                                        <ChevronDown className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                                    </button>
                                </div>
                                <button
                                    className={`inline-flex items-center px-3 py-2 border ${
                                        isDarkMode ? "border-gray-700 bg-gray-700 text-white hover:bg-gray-600" : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                                    } rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                                >
                                    <span>Filter</span>
                                    <Layers className="ml-2 h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        <div className={`${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-lg rounded-xl overflow-hidden border ${isDarkMode ? "border-gray-700" : "border-gray-100"}`}>
                            <div className="flow-root p-6">
                                <ul className="-mb-8">
                                    {[
                                        ...userData.recentActivity,
                                        {
                                            id: 5,
                                            type: "course_update",
                                            title: 'Enrolled in "Machine Learning Fundamentals"',
                                            time: "1 week ago",
                                            details: "Started a new journey into the world of machine learning",
                                        },
                                        { id: 6, type: "assignment_graded", title: 'Submitted final project for "Web Development"', time: "1 week ago", details: "Received grade: A" },
                                        {
                                            id: 7,
                                            type: "discussion",
                                            title: 'Started a new discussion thread in "Data Structures"',
                                            time: "2 weeks ago",
                                            details: "Topic: Efficient implementations of balanced trees",
                                        },
                                        {
                                            id: 8,
                                            type: "announcement",
                                            title: 'Received certificate for "Python Programming"',
                                            time: "3 weeks ago",
                                            details: "Successfully completed all requirements with distinction",
                                        },
                                    ].map((activity, index, array) => (
                                        <li key={activity.id}>
                                            <div className="relative pb-8">
                                                {index !== array.length - 1 && (
                                                    <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gradient-to-b from-purple-500 to-indigo-500 opacity-20" aria-hidden="true"></span>
                                                )}
                                                <div className="relative flex items-start space-x-3">
                                                    <div className="relative">
                                                        <div
                                                            className={`h-10 w-10 rounded-full flex items-center justify-center ring-8 ${isDarkMode ? "ring-gray-800" : "ring-white"} ${
                                                                activity.type === "course_update"
                                                                    ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                                                                    : activity.type === "assignment_graded"
                                                                    ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
                                                                    : activity.type === "discussion"
                                                                    ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300"
                                                                    : activity.type === "announcement"
                                                                    ? "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300"
                                                                    : "bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300"
                                                            }`}
                                                        >
                                                            {activity.type === "course_update" && <BookOpen className="h-5 w-5" />}
                                                            {activity.type === "assignment_graded" && <FileText className="h-5 w-5" />}
                                                            {activity.type === "discussion" && <MessageSquare className="h-5 w-5" />}
                                                            {activity.type === "announcement" && <Bell className="h-5 w-5" />}
                                                            {activity.type === "live_session" && <Video className="h-5 w-5" />}
                                                        </div>
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <div>
                                                            <div className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>{activity.title}</div>
                                                            <p className={`mt-0.5 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{activity.time}</p>
                                                        </div>
                                                        {activity.details && (
                                                            <div
                                                                className={`mt-2 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"} p-3 rounded-lg ${isDarkMode ? "bg-gray-700" : "bg-gray-50"}`}
                                                            >
                                                                {activity.details}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex-shrink-0 self-center">
                                                        <button
                                                            className={`rounded-full p-1 ${
                                                                isDarkMode ? "text-gray-400 hover:text-white hover:bg-gray-700" : "text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                                                            }`}
                                                        >
                                                            <span className="sr-only">View details</span>
                                                            <ChevronDown className="h-5 w-5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className={`px-6 py-4 ${isDarkMode ? "bg-gray-700" : "bg-gray-50"} border-t ${isDarkMode ? "border-gray-600" : "border-gray-200"} flex justify-between items-center`}>
                                <button className={`${isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-700"}`}>
                                    <ChevronDown className="h-5 w-5 transform rotate-90" />
                                    <span className="sr-only">Previous</span>
                                </button>
                                <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Showing 8 of 24 activities</span>
                                <button className={`${isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-700"}`}>
                                    <ChevronDown className="h-5 w-5 transform -rotate-90" />
                                    <span className="sr-only">Next</span>
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className={`${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-lg rounded-xl overflow-hidden border ${isDarkMode ? "border-gray-700" : "border-gray-100"}`}>
                                <div className={`px-6 py-5 ${isDarkMode ? "bg-gray-700" : "bg-gradient-to-r from-purple-500 to-indigo-600"}`}>
                                    <h2 className="text-lg font-medium text-white">Engagement Summary</h2>
                                </div>
                                <div className="p-6">
                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex items-center justify-between mb-1">
                                                <div className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-700"}`}>Course Completion</div>
                                                <div className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-700"}`}>85%</div>
                                            </div>
                                            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                                                <div className="h-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full" style={{ width: "85%" }}></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex items-center justify-between mb-1">
                                                <div className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-700"}`}>Discussion Participation</div>
                                                <div className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-700"}`}>62%</div>
                                            </div>
                                            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                                                <div className="h-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full" style={{ width: "62%" }}></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex items-center justify-between mb-1">
                                                <div className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-700"}`}>Assignment Submission</div>
                                                <div className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-700"}`}>94%</div>
                                            </div>
                                            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                                                <div className="h-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full" style={{ width: "94%" }}></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex items-center justify-between mb-1">
                                                <div className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-700"}`}>Video Completion</div>
                                                <div className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-700"}`}>78%</div>
                                            </div>
                                            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                                                <div className="h-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full" style={{ width: "78%" }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={`${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-lg rounded-xl overflow-hidden border ${isDarkMode ? "border-gray-700" : "border-gray-100"}`}>
                                <div className={`px-6 py-5 ${isDarkMode ? "bg-gray-700" : "bg-gradient-to-r from-purple-500 to-indigo-600"}`}>
                                    <h2 className="text-lg font-medium text-white">Activity by Course</h2>
                                </div>
                                <div className="p-6">
                                    <div className="space-y-6">
                                        {userData.courses.slice(0, 3).map((course) => (
                                            <div key={course.id} className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-700" : "bg-gray-50"}`}>
                                                <div className="flex items-center justify-between">
                                                    <h3 className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>{course.title}</h3>
                                                    <span
                                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                            course.progress >= 90
                                                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                                                : course.progress >= 50
                                                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                                                                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                                                        }`}
                                                    >
                                                        {course.progress >= 90 ? "Active" : course.progress >= 50 ? "Moderate" : "Low"}
                                                    </span>
                                                </div>
                                                <div className="mt-2 grid grid-cols-3 gap-2 text-center">
                                                    <div className={`p-2 rounded ${isDarkMode ? "bg-gray-600" : "bg-white"}`}>
                                                        <div className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>12</div>
                                                        <div className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Discussions</div>
                                                    </div>
                                                    <div className={`p-2 rounded ${isDarkMode ? "bg-gray-600" : "bg-white"}`}>
                                                        <div className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>8</div>
                                                        <div className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Assignments</div>
                                                    </div>
                                                    <div className={`p-2 rounded ${isDarkMode ? "bg-gray-600" : "bg-white"}`}>
                                                        <div className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>24</div>
                                                        <div className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Hours</div>
                                                    </div>
                                                </div>
                                                <div className="mt-3">
                                                    <div className="flex items-center justify-between text-xs mb-1">
                                                        <span className={`${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Last activity</span>
                                                        <span className={`${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>2 days ago</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "analytics" && userData.role !== "Student" && (
                    <div className="space-y-8">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <h2 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Analytics & Insights</h2>
                            <div className="mt-4 sm:mt-0 flex items-center space-x-3">
                                <div className="relative inline-block text-left">
                                    <button
                                        className={`inline-flex justify-center w-full rounded-md border ${
                                            isDarkMode ? "border-gray-700 bg-gray-700" : "border-gray-300 bg-white"
                                        } px-4 py-2 text-sm font-medium ${
                                            isDarkMode ? "text-white" : "text-gray-700"
                                        } hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                                    >
                                        <span>Last 30 days</span>
                                        <ChevronDown className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                                    </button>
                                </div>
                                <button
                                    className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-md text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200`}
                                >
                                    <span>Export Report</span>
                                    <FileText className="ml-2 h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Performance Overview */}
                            <div className={`${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-lg rounded-xl overflow-hidden border ${isDarkMode ? "border-gray-700" : "border-gray-100"}`}>
                                <div className={`px-6 py-5 ${isDarkMode ? "bg-gray-700" : "bg-gradient-to-r from-purple-500 to-indigo-600"} flex justify-between items-center`}>
                                    <h3 className="text-lg font-medium text-white">Performance Overview</h3>
                                    <button className="text-white hover:text-indigo-100">
                                        <Layers className="h-5 w-5" />
                                    </button>
                                </div>
                                <div className="p-6">
                                    <div className={`h-64 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-6`}>
                                        <div className="text-center">
                                            <PieChart className={`h-12 w-12 ${isDarkMode ? "text-indigo-400" : "text-indigo-500"} mx-auto`} />
                                            <p className={`mt-2 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Analytics chart would appear here</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className={`p-4 rounded-lg ${isDarkMode ? "bg-indigo-900/50 text-indigo-300" : "bg-indigo-50 text-indigo-600"}`}>
                                            <div className="text-2xl font-bold">{userData.stats.completionRate}%</div>
                                            <div className="text-sm">Course Completion Rate</div>
                                        </div>
                                        <div className={`p-4 rounded-lg ${isDarkMode ? "bg-green-900/50 text-green-300" : "bg-green-50 text-green-600"}`}>
                                            <div className="text-2xl font-bold">{userData.stats.averageRating}</div>
                                            <div className="text-sm">Average Rating</div>
                                        </div>
                                        <div className={`p-4 rounded-lg ${isDarkMode ? "bg-purple-900/50 text-purple-300" : "bg-purple-50 text-purple-600"}`}>
                                            <div className="text-2xl font-bold">{userData.stats.teachingHours}</div>
                                            <div className="text-sm">Teaching Hours</div>
                                        </div>
                                        <div className={`p-4 rounded-lg ${isDarkMode ? "bg-yellow-900/50 text-yellow-300" : "bg-yellow-50 text-yellow-600"}`}>
                                            <div className="text-2xl font-bold">${userData.stats.totalRevenue.toLocaleString()}</div>
                                            <div className="text-sm">Total Revenue</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Student Engagement */}
                            <div className={`${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-lg rounded-xl overflow-hidden border ${isDarkMode ? "border-gray-700" : "border-gray-100"}`}>
                                <div className={`px-6 py-5 ${isDarkMode ? "bg-gray-700" : "bg-gradient-to-r from-purple-500 to-indigo-600"} flex justify-between items-center`}>
                                    <h3 className="text-lg font-medium text-white">Student Engagement</h3>
                                    <button className="text-white hover:text-indigo-100">
                                        <BarChart3 className="h-5 w-5" />
                                    </button>
                                </div>
                                <div className="p-6">
                                    <div className={`h-64 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-6`}>
                                        <div className="text-center">
                                            <BarChart3 className={`h-12 w-12 ${isDarkMode ? "text-indigo-400" : "text-indigo-500"} mx-auto`} />
                                            <p className={`mt-2 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Engagement chart would appear here</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex items-center justify-between">
                                                <div className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Discussion Participation</div>
                                                <div className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>78%</div>
                                            </div>
                                            <div className="mt-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                                                <div className="h-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full" style={{ width: "78%" }}></div>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex items-center justify-between">
                                                <div className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Assignment Submission</div>
                                                <div className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>92%</div>
                                            </div>
                                            <div className="mt-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                                                <div className="h-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full" style={{ width: "92%" }}></div>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex items-center justify-between">
                                                <div className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Video Completion</div>
                                                <div className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>65%</div>
                                            </div>
                                            <div className="mt-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                                                <div className="h-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full" style={{ width: "65%" }}></div>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex items-center justify-between">
                                                <div className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Quiz Performance</div>
                                                <div className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>84%</div>
                                            </div>
                                            <div className="mt-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                                                <div className="h-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full" style={{ width: "84%" }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Course Performance */}
                            <div
                                className={`${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-lg rounded-xl overflow-hidden border ${isDarkMode ? "border-gray-700" : "border-gray-100"} lg:col-span-2`}
                            >
                                <div className={`px-6 py-5 ${isDarkMode ? "bg-gray-700" : "bg-gradient-to-r from-purple-500 to-indigo-600"} flex justify-between items-center`}>
                                    <h3 className="text-lg font-medium text-white">Course Performance</h3>
                                    <button className="text-white hover:text-indigo-100">
                                        <FileText className="h-5 w-5" />
                                    </button>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <thead className={`${isDarkMode ? "bg-gray-700" : "bg-gray-50"}`}>
                                            <tr>
                                                <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-500"} uppercase tracking-wider`}>
                                                    Course
                                                </th>
                                                <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-500"} uppercase tracking-wider`}>
                                                    Students
                                                </th>
                                                <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-500"} uppercase tracking-wider`}>
                                                    Completion
                                                </th>
                                                <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-500"} uppercase tracking-wider`}>
                                                    Rating
                                                </th>
                                                <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-500"} uppercase tracking-wider`}>
                                                    Revenue
                                                </th>
                                                <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-500"} uppercase tracking-wider`}>
                                                    Trend
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className={`${isDarkMode ? "bg-gray-800 divide-y divide-gray-700" : "bg-white divide-y divide-gray-200"}`}>
                                            {userData.courses.map((course) => (
                                                <tr key={course.id} className={`${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"} transition-colors duration-150`}>
                                                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                                                        <div className="flex items-center">
                                                            <div className="h-10 w-10 flex-shrink-0 rounded overflow-hidden mr-3">
                                                                <Image src={course.thumbnail || "/placeholder.svg"} alt={course.title} width={40} height={40} className="h-10 w-10 object-cover" />
                                                            </div>
                                                            <div className="truncate max-w-xs">{course.title}</div>
                                                        </div>
                                                    </td>
                                                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? "text-gray-300" : "text-gray-500"}`}>
                                                        <div className="flex items-center">
                                                            <Users className="h-4 w-4 mr-1 text-gray-400" />
                                                            {course.students}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="flex-1 h-2 w-24 bg-gray-200 dark:bg-gray-700 rounded-full">
                                                                <div className="h-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full" style={{ width: `${course.progress}%` }}></div>
                                                            </div>
                                                            <span className={`ml-3 text-sm ${isDarkMode ? "text-gray-300" : "text-gray-500"}`}>{course.progress}%</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <Star className="h-4 w-4 text-yellow-400" />
                                                            <span className={`ml-1 text-sm ${isDarkMode ? "text-gray-300" : "text-gray-500"}`}>{course.rating}</span>
                                                        </div>
                                                    </td>
                                                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? "text-gray-300" : "text-gray-500"}`}>${(course.students * 29.99).toFixed(2)}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <span
                                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                                    course.id % 2 === 0
                                                                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                                                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                                                                }`}
                                                            >
                                                                {course.id % 2 === 0 ? (
                                                                    <TrendingUp className="-ml-0.5 mr-1 h-3 w-3" />
                                                                ) : (
                                                                    <TrendingUp className="-ml-0.5 mr-1 h-3 w-3 transform rotate-45" />
                                                                )}
                                                                {course.id % 2 === 0 ? "+12%" : "+4%"}
                                                            </span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div
                                    className={`px-6 py-4 ${isDarkMode ? "bg-gray-700" : "bg-gray-50"} border-t ${
                                        isDarkMode ? "border-gray-600" : "border-gray-200"
                                    } flex justify-between items-center`}
                                >
                                    <button className={`${isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-700"}`}>
                                        <ChevronDown className="h-5 w-5 transform rotate-90" />
                                        <span className="sr-only">Previous</span>
                                    </button>
                                    <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Showing 4 of 12 courses</span>
                                    <button className={`${isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-700"}`}>
                                        <ChevronDown className="h-5 w-5 transform -rotate-90" />
                                        <span className="sr-only">Next</span>
                                    </button>
                                </div>
                            </div>

                            {/* Geographic Distribution */}
                            <div className={`${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-lg rounded-xl overflow-hidden border ${isDarkMode ? "border-gray-700" : "border-gray-100"}`}>
                                <div className={`px-6 py-5 ${isDarkMode ? "bg-gray-700" : "bg-gradient-to-r from-purple-500 to-indigo-600"} flex justify-between items-center`}>
                                    <h3 className="text-lg font-medium text-white">Geographic Distribution</h3>
                                    <button className="text-white hover:text-indigo-100">
                                        <Globe className="h-5 w-5" />
                                    </button>
                                </div>
                                <div className="p-6">
                                    <div className={`h-64 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-6`}>
                                        <div className="text-center">
                                            <Globe className={`h-12 w-12 ${isDarkMode ? "text-indigo-400" : "text-indigo-500"} mx-auto`} />
                                            <p className={`mt-2 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>World map would appear here</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="h-3 w-3 rounded-full bg-indigo-500 mr-2"></div>
                                                <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>United States</span>
                                            </div>
                                            <div className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>42%</div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="h-3 w-3 rounded-full bg-purple-500 mr-2"></div>
                                                <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Europe</span>
                                            </div>
                                            <div className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>28%</div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                                                <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Asia</span>
                                            </div>
                                            <div className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>18%</div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
                                                <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Other</span>
                                            </div>
                                            <div className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>12%</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Device Usage */}
                            <div className={`${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-lg rounded-xl overflow-hidden border ${isDarkMode ? "border-gray-700" : "border-gray-100"}`}>
                                <div className={`px-6 py-5 ${isDarkMode ? "bg-gray-700" : "bg-gradient-to-r from-purple-500 to-indigo-600"} flex justify-between items-center`}>
                                    <h3 className="text-lg font-medium text-white">Device Usage</h3>
                                    <button className="text-white hover:text-indigo-100">
                                        <Smartphone className="h-5 w-5" />
                                    </button>
                                </div>
                                <div className="p-6">
                                    <div className={`h-64 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-6`}>
                                        <div className="text-center">
                                            <Smartphone className={`h-12 w-12 ${isDarkMode ? "text-indigo-400" : "text-indigo-500"} mx-auto`} />
                                            <p className={`mt-2 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Device chart would appear here</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4 text-center">
                                        <div className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-700" : "bg-gray-50"}`}>
                                            <div className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>45%</div>
                                            <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Desktop</div>
                                        </div>
                                        <div className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-700" : "bg-gray-50"}`}>
                                            <div className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>38%</div>
                                            <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Mobile</div>
                                        </div>
                                        <div className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-700" : "bg-gray-50"}`}>
                                            <div className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>17%</div>
                                            <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Tablet</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "calendar" && (
                    <div className="space-y-8">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <h2 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Calendar</h2>
                            <div className="mt-4 sm:mt-0 flex items-center space-x-3">
                                <button
                                    className={`inline-flex items-center px-3 py-2 border ${
                                        isDarkMode ? "border-gray-700 bg-gray-700 text-white hover:bg-gray-600" : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                                    } rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                                >
                                    <span>Today</span>
                                </button>
                                <div className="flex items-center space-x-2">
                                    <button className={`p-1 rounded-md ${isDarkMode ? "text-gray-400 hover:text-white hover:bg-gray-700" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"}`}>
                                        <ChevronDown className="h-5 w-5 transform rotate-90" />
                                    </button>
                                    <span className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>April 2025</span>
                                    <button className={`p-1 rounded-md ${isDarkMode ? "text-gray-400 hover:text-white hover:bg-gray-700" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"}`}>
                                        <ChevronDown className="h-5 w-5 transform -rotate-90" />
                                    </button>
                                </div>
                                <div className="relative inline-block text-left">
                                    <button
                                        className={`inline-flex justify-center w-full rounded-md border ${
                                            isDarkMode ? "border-gray-700 bg-gray-700" : "border-gray-300 bg-white"
                                        } px-4 py-2 text-sm font-medium ${
                                            isDarkMode ? "text-white" : "text-gray-700"
                                        } hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                                    >
                                        <span>Month</span>
                                        <ChevronDown className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className={`${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-lg rounded-xl overflow-hidden border ${isDarkMode ? "border-gray-700" : "border-gray-100"}`}>
                            <div className={`px-6 py-5 ${isDarkMode ? "bg-gray-700" : "bg-gradient-to-r from-purple-500 to-indigo-600"} flex justify-between items-center`}>
                                <h3 className="text-lg font-medium text-white">Upcoming Events</h3>
                                <button className="inline-flex items-center px-3 py-1 rounded-md bg-white bg-opacity-20 text-sm text-white hover:bg-opacity-30 transition-colors duration-200">
                                    <Zap className="h-4 w-4 mr-1" /> Add Event
                                </button>
                            </div>
                            <div className="p-6">
                                <div className="space-y-6">
                                    {userData.calendar.map((event) => (
                                        <div
                                            key={event.id}
                                            className={`p-4 rounded-lg ${
                                                isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-50 hover:bg-gray-100"
                                            } transition-colors duration-200 flex items-center`}
                                        >
                                            <div
                                                className={`flex-shrink-0 h-12 w-12 rounded-lg flex items-center justify-center ${
                                                    event.type === "live"
                                                        ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
                                                        : event.type === "office_hours"
                                                        ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                                                        : event.type === "deadline"
                                                        ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300"
                                                        : event.type === "lecture"
                                                        ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
                                                        : "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300"
                                                }`}
                                            >
                                                {event.type === "live" && <Video className="h-6 w-6" />}
                                                {event.type === "office_hours" && <Users className="h-6 w-6" />}
                                                {event.type === "deadline" && <Clock className="h-6 w-6" />}
                                                {event.type === "lecture" && <BookOpen className="h-6 w-6" />}
                                                {event.type === "planning" && <Calendar className="h-6 w-6" />}
                                            </div>
                                            <div className="ml-4 flex-1">
                                                <h4 className={`text-base font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>{event.title}</h4>
                                                <div className="mt-1 flex items-center flex-wrap gap-y-1">
                                                    <div className="flex items-center">
                                                        <Clock className={`flex-shrink-0 mr-1 h-4 w-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                                                        <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-500"}`}>{event.date}</span>
                                                    </div>
                                                    {event.duration && (
                                                        <>
                                                            <span className={`mx-2 text-sm ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>•</span>
                                                            <div className="flex items-center">
                                                                <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-500"}`}>{event.duration}</span>
                                                            </div>
                                                        </>
                                                    )}
                                                    {event.course && (
                                                        <>
                                                            <span className={`mx-2 text-sm ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>•</span>
                                                            <div className="flex items-center">
                                                                <BookOpen className={`flex-shrink-0 mr-1 h-4 w-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                                                                <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-500"}`}>{event.course}</span>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="ml-4 flex-shrink-0 flex items-center space-x-2">
                                                <button
                                                    className={`p-2 rounded-full ${
                                                        isDarkMode ? "hover:bg-gray-600 text-gray-400 hover:text-white" : "hover:bg-gray-200 text-gray-400 hover:text-gray-500"
                                                    }`}
                                                >
                                                    <Edit className="h-5 w-5" />
                                                </button>
                                                <button
                                                    className={`p-2 rounded-full ${
                                                        isDarkMode ? "hover:bg-gray-600 text-gray-400 hover:text-white" : "hover:bg-gray-200 text-gray-400 hover:text-gray-500"
                                                    }`}
                                                >
                                                    <Bell className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div
                                className={`${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-lg rounded-xl overflow-hidden border ${isDarkMode ? "border-gray-700" : "border-gray-100"} lg:col-span-2`}
                            >
                                <div className={`px-6 py-5 ${isDarkMode ? "bg-gray-700" : "bg-gradient-to-r from-purple-500 to-indigo-600"}`}>
                                    <h3 className="text-lg font-medium text-white">Monthly Calendar</h3>
                                </div>
                                <div className="p-6">
                                    <div className={`h-96 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center`}>
                                        <div className="text-center">
                                            <Calendar className={`h-12 w-12 ${isDarkMode ? "text-indigo-400" : "text-indigo-500"} mx-auto`} />
                                            <p className={`mt-2 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Calendar would appear here</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={`${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-lg rounded-xl overflow-hidden border ${isDarkMode ? "border-gray-700" : "border-gray-100"}`}>
                                <div className={`px-6 py-5 ${isDarkMode ? "bg-gray-700" : "bg-gradient-to-r from-purple-500 to-indigo-600"}`}>
                                    <h3 className="text-lg font-medium text-white">Event Categories</h3>
                                </div>
                                <div className="p-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center">
                                            <div className="h-4 w-4 rounded-full bg-red-500 mr-3"></div>
                                            <span className={`text-sm ${isDarkMode ? "text-white" : "text-gray-900"}`}>Live Sessions</span>
                                            <span className="ml-auto inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-800 text-xs font-medium dark:bg-red-900 dark:text-red-300">
                                                2
                                            </span>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="h-4 w-4 rounded-full bg-blue-500 mr-3"></div>
                                            <span className={`text-sm ${isDarkMode ? "text-white" : "text-gray-900"}`}>Office Hours</span>
                                            <span className="ml-auto inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-medium dark:bg-blue-900 dark:text-blue-300">
                                                1
                                            </span>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="h-4 w-4 rounded-full bg-yellow-500 mr-3"></div>
                                            <span className={`text-sm ${isDarkMode ? "text-white" : "text-gray-900"}`}>Deadlines</span>
                                            <span className="ml-auto inline-flex items-center justify-center w-6 h-6 rounded-full bg-yellow-100 text-yellow-800 text-xs font-medium dark:bg-yellow-900 dark:text-yellow-300">
                                                3
                                            </span>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="h-4 w-4 rounded-full bg-green-500 mr-3"></div>
                                            <span className={`text-sm ${isDarkMode ? "text-white" : "text-gray-900"}`}>Lectures</span>
                                            <span className="ml-auto inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-800 text-xs font-medium dark:bg-green-900 dark:text-green-300">
                                                2
                                            </span>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="h-4 w-4 rounded-full bg-purple-500 mr-3"></div>
                                            <span className={`text-sm ${isDarkMode ? "text-white" : "text-gray-900"}`}>Planning</span>
                                            <span className="ml-auto inline-flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-800 text-xs font-medium dark:bg-purple-900 dark:text-purple-300">
                                                1
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                                        <h4 className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"} mb-3`}>Quick Add</h4>
                                        <div className="grid grid-cols-2 gap-2">
                                            <button className="inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                                <Video className="h-4 w-4 mr-1" /> Live Session
                                            </button>
                                            <button className="inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                                <Users className="h-4 w-4 mr-1" /> Office Hours
                                            </button>
                                            <button className="inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
                                                <Clock className="h-4 w-4 mr-1" /> Deadline
                                            </button>
                                            <button className="inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                                <BookOpen className="h-4 w-4 mr-1" /> Lecture
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "earnings" && userData.role !== "Student" && (
                    <div className="space-y-8">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <h2 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Earnings</h2>
                            <div className="mt-4 sm:mt-0 flex items-center space-x-3">
                                <div className="relative inline-block text-left">
                                    <button
                                        className={`inline-flex justify-center w-full rounded-md border ${
                                            isDarkMode ? "border-gray-700 bg-gray-700" : "border-gray-300 bg-white"
                                        } px-4 py-2 text-sm font-medium ${
                                            isDarkMode ? "text-white" : "text-gray-700"
                                        } hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                                    >
                                        <span>2025</span>
                                        <ChevronDown className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                                    </button>
                                </div>
                                <button
                                    className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-md text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200`}
                                >
                                    <span>Download Report</span>
                                    <FileText className="ml-2 h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className={`${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-lg rounded-xl overflow-hidden border ${isDarkMode ? "border-gray-700" : "border-gray-100"} p-6`}>
                                <div className="flex items-center">
                                    <div
                                        className={`h-12 w-12 rounded-lg ${isDarkMode ? "bg-green-900" : "bg-green-100"} flex items-center justify-center ${
                                            isDarkMode ? "text-green-300" : "text-green-600"
                                        }`}
                                    >
                                        <DollarSign className="h-6 w-6" />
                                    </div>
                                    <div className="ml-4">
                                        <h3 className={`text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Total Earnings</h3>
                                        <div className="flex items-baseline">
                                            <span className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>${userData.stats.totalRevenue.toLocaleString()}</span>
                                            <span className="ml-2 text-sm text-green-500">+12% from last year</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={`${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-lg rounded-xl overflow-hidden border ${isDarkMode ? "border-gray-700" : "border-gray-100"} p-6`}>
                                <div className="flex items-center">
                                    <div
                                        className={`h-12 w-12 rounded-lg ${isDarkMode ? "bg-blue-900" : "bg-blue-100"} flex items-center justify-center ${
                                            isDarkMode ? "text-blue-300" : "text-blue-600"
                                        }`}
                                    >
                                        <Users className="h-6 w-6" />
                                    </div>
                                    <div className="ml-4">
                                        <h3 className={`text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Paying Students</h3>
                                        <div className="flex items-baseline">
                                            <span className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>{userData.stats.studentsEnrolled}</span>
                                            <span className="ml-2 text-sm text-green-500">+18% from last year</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={`${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-lg rounded-xl overflow-hidden border ${isDarkMode ? "border-gray-700" : "border-gray-100"} p-6`}>
                                <div className="flex items-center">
                                    <div
                                        className={`h-12 w-12 rounded-lg ${isDarkMode ? "bg-purple-900" : "bg-purple-100"} flex items-center justify-center ${
                                            isDarkMode ? "text-purple-300" : "text-purple-600"
                                        }`}
                                    >
                                        <TrendingUp className="h-6 w-6" />
                                    </div>
                                    <div className="ml-4">
                                        <h3 className={`text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Average Per Course</h3>
                                        <div className="flex items-baseline">
                                            <span className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                                                ${(userData.stats.totalRevenue / userData.stats.coursesCreated).toFixed(2)}
                                            </span>
                                            <span className="ml-2 text-sm text-green-500">+8% from last year</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div
                            className={`${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-lg rounded-xl
 overflow-hidden border ${isDarkMode ? "border-gray-700" : "border-gray-100"}`}
                        >
                            <div className={`px-6 py-5 ${isDarkMode ? "bg-gray-700" : "bg-gradient-to-r from-purple-500 to-indigo-600"} flex justify-between items-center`}>
                                <h3 className="text-lg font-medium text-white">Monthly Earnings</h3>
                                <div className="flex items-center space-x-2">
                                    <div className="flex items-center">
                                        <div className="h-3 w-3 rounded-full bg-white mr-1"></div>
                                        <span className="text-sm text-white">2025</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="h-3 w-3 rounded-full bg-white bg-opacity-50 mr-1"></div>
                                        <span className="text-sm text-white">2024</span>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className={`h-80 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center`}>
                                    <div className="text-center">
                                        <BarChart3 className={`h-12 w-12 ${isDarkMode ? "text-indigo-400" : "text-indigo-500"} mx-auto`} />
                                        <p className={`mt-2 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Earnings chart would appear here</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className={`${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-lg rounded-xl overflow-hidden border ${isDarkMode ? "border-gray-700" : "border-gray-100"}`}>
                                <div className={`px-6 py-5 ${isDarkMode ? "bg-gray-700" : "bg-gradient-to-r from-purple-500 to-indigo-600"}`}>
                                    <h3 className="text-lg font-medium text-white">Top Earning Courses</h3>
                                </div>
                                <div className="p-6">
                                    <div className="space-y-6">
                                        {userData.courses.map((course, index) => (
                                            <div key={course.id} className={`flex items-center ${index !== userData.courses.length - 1 ? "pb-6 border-b border-gray-200 dark:border-gray-700" : ""}`}>
                                                <div className="flex-shrink-0 h-12 w-12 rounded overflow-hidden">
                                                    <Image src={course.thumbnail || "/placeholder.svg"} alt={course.title} width={48} height={48} className="h-12 w-12 object-cover" />
                                                </div>
                                                <div className="ml-4 flex-1 min-w-0">
                                                    <h4 className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"} truncate`}>{course.title}</h4>
                                                    <div className="mt-1 flex items-center">
                                                        <Users className={`flex-shrink-0 mr-1 h-4 w-4 ${isDarkMode ? "text-gray-400" : "text-gray-400"}`} />
                                                        <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{course.students} students</span>
                                                    </div>
                                                </div>
                                                <div className="ml-4">
                                                    <span className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>${(course.students * 29.99).toFixed(2)}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className={`${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-lg rounded-xl overflow-hidden border ${isDarkMode ? "border-gray-700" : "border-gray-100"}`}>
                                <div className={`px-6 py-5 ${isDarkMode ? "bg-gray-700" : "bg-gradient-to-r from-purple-500 to-indigo-600"}`}>
                                    <h3 className="text-lg font-medium text-white">Revenue by Category</h3>
                                </div>
                                <div className="p-6">
                                    <div className={`h-64 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-6`}>
                                        <div className="text-center">
                                            <PieChart className={`h-12 w-12 ${isDarkMode ? "text-indigo-400" : "text-indigo-500"} mx-auto`} />
                                            <p className={`mt-2 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Category chart would appear here</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="h-3 w-3 rounded-full bg-indigo-500 mr-2"></div>
                                                <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Programming</span>
                                            </div>
                                            <div className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>45%</div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="h-3 w-3 rounded-full bg-purple-500 mr-2"></div>
                                                <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Data Science</span>
                                            </div>
                                            <div className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>30%</div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
                                                <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Web Development</span>
                                            </div>
                                            <div className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>15%</div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                                                <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Other</span>
                                            </div>
                                            <div className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>10%</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={`${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-lg rounded-xl overflow-hidden border ${isDarkMode ? "border-gray-700" : "border-gray-100"}`}>
                            <div className={`px-6 py-5 ${isDarkMode ? "bg-gray-700" : "bg-gradient-to-r from-purple-500 to-indigo-600"}`}>
                                <h3 className="text-lg font-medium text-white">Recent Transactions</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className={`${isDarkMode ? "bg-gray-700" : "bg-gray-50"}`}>
                                        <tr>
                                            <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-500"} uppercase tracking-wider`}>
                                                Date
                                            </th>
                                            <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-500"} uppercase tracking-wider`}>
                                                Course
                                            </th>
                                            <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-500"} uppercase tracking-wider`}>
                                                Student
                                            </th>
                                            <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-500"} uppercase tracking-wider`}>
                                                Amount
                                            </th>
                                            <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${isDarkMode ? "text-gray-300" : "text-gray-500"} uppercase tracking-wider`}>
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className={`${isDarkMode ? "bg-gray-800 divide-y divide-gray-700" : "bg-white divide-y divide-gray-200"}`}>
                                        {[
                                            { id: 1, date: "Apr 1, 2025", course: "Advanced Python Programming", student: "Sarah Johnson", amount: 29.99, status: "Completed" },
                                            { id: 2, date: "Mar 30, 2025", course: "Data Structures & Algorithms", student: "Michael Chen", amount: 29.99, status: "Completed" },
                                            { id: 3, date: "Mar 28, 2025", course: "Web Development Fundamentals", student: "Emily Rodriguez", amount: 29.99, status: "Completed" },
                                            { id: 4, date: "Mar 25, 2025", course: "Machine Learning Basics", student: "David Kim", amount: 29.99, status: "Completed" },
                                            { id: 5, date: "Mar 22, 2025", course: "Advanced Python Programming", student: "Lisa Wang", amount: 29.99, status: "Completed" },
                                        ].map((transaction) => (
                                            <tr key={transaction.id} className={`${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"} transition-colors duration-150`}>
                                                <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? "text-gray-300" : "text-gray-500"}`}>{transaction.date}</td>
                                                <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? "text-white" : "text-gray-900"}`}>{transaction.course}</td>
                                                <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? "text-gray-300" : "text-gray-500"}`}>{transaction.student}</td>
                                                <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>${transaction.amount}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300`}>
                                                        {transaction.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className={`px-6 py-4 ${isDarkMode ? "bg-gray-700" : "bg-gray-50"} border-t ${isDarkMode ? "border-gray-600" : "border-gray-200"} flex justify-between items-center`}>
                                <button className={`${isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-700"}`}>
                                    <ChevronDown className="h-5 w-5 transform rotate-90" />
                                    <span className="sr-only">Previous</span>
                                </button>
                                <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Showing 5 of 24 transactions</span>
                                <button className={`${isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-700"}`}>
                                    <ChevronDown className="h-5 w-5 transform -rotate-90" />
                                    <span className="sr-only">Next</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "settings" && (
                    <div className="space-y-8">
                        <h2 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Account Settings</h2>

                        <div className={`${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-lg rounded-xl overflow-hidden border ${isDarkMode ? "border-gray-700" : "border-gray-100"}`}>
                            <div className={`px-6 py-5 ${isDarkMode ? "bg-gray-700" : "bg-gradient-to-r from-purple-500 to-indigo-600"}`}>
                                <h3 className="text-lg font-medium text-white">Profile Information</h3>
                            </div>
                            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                    <div>
                                        <label htmlFor="first-name" className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                            First name
                                        </label>
                                        <input
                                            type="text"
                                            name="first-name"
                                            id="first-name"
                                            defaultValue="Alex"
                                            className={`mt-1 block w-full border ${
                                                isDarkMode ? "border-gray-700 bg-gray-700 text-white" : "border-gray-300 bg-white text-gray-900"
                                            } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="last-name" className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                            Last name
                                        </label>
                                        <input
                                            type="text"
                                            name="last-name"
                                            id="last-name"
                                            defaultValue="Johnson"
                                            className={`mt-1 block w-full border ${
                                                isDarkMode ? "border-gray-700 bg-gray-700 text-white" : "border-gray-300 bg-white text-gray-900"
                                            } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            defaultValue={userData.email}
                                            className={`mt-1 block w-full border ${
                                                isDarkMode ? "border-gray-700 bg-gray-700 text-white" : "border-gray-300 bg-white text-gray-900"
                                            } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                            Phone
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            id="phone"
                                            defaultValue={userData.phone}
                                            className={`mt-1 block w-full border ${
                                                isDarkMode ? "border-gray-700 bg-gray-700 text-white" : "border-gray-300 bg-white text-gray-900"
                                            } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                                        />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label htmlFor="bio" className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                            Bio
                                        </label>
                                        <textarea
                                            id="bio"
                                            name="bio"
                                            rows={4}
                                            defaultValue={userData.bio}
                                            className={`mt-1 block w-full border ${
                                                isDarkMode ? "border-gray-700 bg-gray-700 text-white" : "border-gray-300 bg-white text-gray-900"
                                            } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                <h3 className={`text-lg font-medium ${isDarkMode ? "text-white" : "text-gray-900"} mb-4`}>Profile Picture</h3>
                                <div className="flex items-center space-x-6">
                                    <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-100 ring-4 ring-indigo-500">
                                        <Image src={userData.avatar || "/placeholder.svg"} alt="User avatar" width={96} height={96} className="h-full w-full object-cover" />
                                    </div>
                                    <div>
                                        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-md text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200">
                                            <Upload className="h-4 w-4 mr-2" /> Upload new picture
                                        </button>
                                        <p className={`mt-2 text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>JPG, GIF or PNG. 1MB max.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                <h3 className={`text-lg font-medium ${isDarkMode ? "text-white" : "text-gray-900"} mb-4`}>Password</h3>
                                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                    <div>
                                        <label htmlFor="current-password" className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                            Current password
                                        </label>
                                        <input
                                            type="password"
                                            name="current-password"
                                            id="current-password"
                                            className={`mt-1 block w-full border ${
                                                isDarkMode ? "border-gray-700 bg-gray-700 text-white" : "border-gray-300 bg-white text-gray-900"
                                            } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                                        />
                                    </div>
                                    <div></div>
                                    <div>
                                        <label htmlFor="new-password" className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                            New password
                                        </label>
                                        <input
                                            type="password"
                                            name="new-password"
                                            id="new-password"
                                            className={`mt-1 block w-full border ${
                                                isDarkMode ? "border-gray-700 bg-gray-700 text-white" : "border-gray-300 bg-white text-gray-900"
                                            } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="confirm-password" className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                            Confirm password
                                        </label>
                                        <input
                                            type="password"
                                            name="confirm-password"
                                            id="confirm-password"
                                            className={`mt-1 block w-full border ${
                                                isDarkMode ? "border-gray-700 bg-gray-700 text-white" : "border-gray-300 bg-white text-gray-900"
                                            } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                <h3 className={`text-lg font-medium ${isDarkMode ? "text-white" : "text-gray-900"} mb-4`}>Notifications</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input
                                                id="email-notifications"
                                                name="email-notifications"
                                                type="checkbox"
                                                defaultChecked
                                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="email-notifications" className={`font-medium ${isDarkMode ? "text-white" : "text-gray-700"}`}>
                                                Email notifications
                                            </label>
                                            <p className={`${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Get notified when someone comments on your courses or messages you.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input
                                                id="push-notifications"
                                                name="push-notifications"
                                                type="checkbox"
                                                defaultChecked
                                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="push-notifications" className={`font-medium ${isDarkMode ? "text-white" : "text-gray-700"}`}>
                                                Push notifications
                                            </label>
                                            <p className={`${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Receive push notifications on your mobile device.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="marketing-emails" name="marketing-emails" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="marketing-emails" className={`font-medium ${isDarkMode ? "text-white" : "text-gray-700"}`}>
                                                Marketing emails
                                            </label>
                                            <p className={`${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Receive emails about new courses, features and updates.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                <h3 className={`text-lg font-medium ${isDarkMode ? "text-white" : "text-gray-900"} mb-4`}>Social Profiles</h3>
                                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                    <div>
                                        <label htmlFor="twitter" className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                            Twitter
                                        </label>
                                        <div className="mt-1 flex rounded-md shadow-sm">
                                            <span
                                                className={`inline-flex items-center px-3 rounded-l-md border border-r-0 ${
                                                    isDarkMode ? "border-gray-700 bg-gray-800 text-gray-400" : "border-gray-300 bg-gray-50 text-gray-500"
                                                } sm:text-sm`}
                                            >
                                                twitter.com/
                                            </span>
                                            <input
                                                type="text"
                                                name="twitter"
                                                id="twitter"
                                                defaultValue={userData.socialLinks.twitter}
                                                className={`flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md ${
                                                    isDarkMode ? "border-gray-700 bg-gray-700 text-white" : "border-gray-300 bg-white text-gray-900"
                                                } focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="linkedin" className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                            LinkedIn
                                        </label>
                                        <div className="mt-1 flex rounded-md shadow-sm">
                                            <span
                                                className={`inline-flex items-center px-3 rounded-l-md border border-r-0 ${
                                                    isDarkMode ? "border-gray-700 bg-gray-800 text-gray-400" : "border-gray-300 bg-gray-50 text-gray-500"
                                                } sm:text-sm`}
                                            >
                                                linkedin.com/in/
                                            </span>
                                            <input
                                                type="text"
                                                name="linkedin"
                                                id="linkedin"
                                                defaultValue={userData.socialLinks.linkedin}
                                                className={`flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md ${
                                                    isDarkMode ? "border-gray-700 bg-gray-700 text-white" : "border-gray-300 bg-white text-gray-900"
                                                } focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="github" className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                            GitHub
                                        </label>
                                        <div className="mt-1 flex rounded-md shadow-sm">
                                            <span
                                                className={`inline-flex items-center px-3 rounded-l-md border border-r-0 ${
                                                    isDarkMode ? "border-gray-700 bg-gray-800 text-gray-400" : "border-gray-300 bg-gray-50 text-gray-500"
                                                } sm:text-sm`}
                                            >
                                                github.com/
                                            </span>
                                            <input
                                                type="text"
                                                name="github"
                                                id="github"
                                                defaultValue={userData.socialLinks.github}
                                                className={`flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md ${
                                                    isDarkMode ? "border-gray-700 bg-gray-700 text-white" : "border-gray-300 bg-white text-gray-900"
                                                } focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="website" className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                            Website
                                        </label>
                                        <div className="mt-1 flex rounded-md shadow-sm"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
