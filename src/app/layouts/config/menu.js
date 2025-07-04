// app/components/dashboard/menuConfig.js
import { BookOpen, GraduationCap, Users, Shield, Video, FileText, PieChart, MessageSquare, Settings, Home, Calendar, DollarSign, Layout, Award, LucideShieldCheck, Lock } from "lucide-react";

export const lmsMenuItems = [
    {
        id: "dashboard",
        label: "Dashboard",
        icon: Home,
        path: "/dashboard",
    },
    {
        id: "users",
        label: "User Management",
        icon: Users,
        path: "/users",
        subMenus: [
            { id: "users-overview", label: "Overview", path: "/users" },
            { id: "users-students", label: "Students", path: "/users/students" },
            { id: "users-instructors", label: "Instructors", path: "/users/instructors" },
            { id: "users-admins", label: "Administrators", path: "/users/admins" },
        ],
    },
    {
        id: "permissions",
        label: "Roles & Permissions",
        icon: Shield,
        path: "/rbac",
        subMenus: [
            { id: "api-routes", label: "API Routes", path: "/rbac/routes" },
            { id: "privilege-groups", label: "Privilege Groups", path: "/rbac/privilege-groups" },
            { id: "privilege", label: "Privilege", path: "/rbac/privileges" },
            { id: "roles", label: "Roles", path: "/rbac/roles" },
        ],
    },
    {
        id: "courses",
        label: "Course Management",
        icon: BookOpen,
        path: "/courses",
        subMenus: [
            { id: "courses-overview", label: "Overview", path: "/courses" },
            { id: "courses-modules", label: "Course Modules", path: "/modules" },
            { id: "courses-categories", label: "Categories", path: "/courses/categories" },
            { id: "courses-reviews", label: "Reviews", path: "/courses/reviews" },
            { id: "courses-certificates", label: "Certificates", path: "/courses/certificates" },
        ],
    },
    {
        id: "instructors",
        label: "Instructor Management",
        icon: GraduationCap,
        path: "/instructors",
        subMenus: [
            { id: "instructors-overview", label: "Overview", path: "/instructors" },
            { id: "instructors-applications", label: "Applications", path: "/instructors/applications" },
            { id: "instructors-performance", label: "Performance", path: "/instructors/performance" },
            { id: "instructors-payouts", label: "Payouts", path: "/instructors/payouts" },
        ],
    },
    {
        id: "content",
        label: "Content Management",
        icon: Layout,
        path: "/content",
        subMenus: [
            { id: "content-overview", label: "Overview", path: "/content" },
            { id: "content-lessons", label: "Lessons", path: "/content/lessons" },
            { id: "content-quizzes", label: "Quizzes", path: "/content/quizzes" },
            { id: "content-assessments", label: "Assessments", path: "/content/assessments" },
            { id: "content-assignments", label: "Assignments", path: "/content/assignments" },
        ],
    },
    {
        id: "media",
        label: "Media Management",
        icon: Video,
        path: "/media",
        subMenus: [
            { id: "media-overview", label: "Overview", path: "/media" },
            { id: "media-videos", label: "Videos", path: "/media/videos" },
            { id: "media-documents", label: "Documents", path: "/media/documents" },
            { id: "media-storage", label: "Storage", path: "/media/storage" },
        ],
    },
    {
        id: "communications",
        label: "Communications",
        icon: MessageSquare,
        path: "/communications",
        subMenus: [
            { id: "communications-announcements", label: "Announcements", path: "/communications/announcements" },
            { id: "communications-emails", label: "Email Templates", path: "/communications/emails" },
            { id: "communications-forums", label: "Forums", path: "/communications/forums" },
            { id: "communications-messages", label: "Messages", path: "/communications/messages" },
        ],
    },
    {
        id: "reports",
        label: "Reports & Analytics",
        icon: PieChart,
        path: "/reports",
        subMenus: [
            { id: "reports-overview", label: "Overview", path: "/reports" },
            { id: "reports-engagement", label: "User Engagement", path: "/reports/engagement" },
            { id: "reports-progress", label: "Learning Progress", path: "/reports/progress" },
            { id: "reports-financial", label: "Financial Reports", path: "/reports/financial" },
        ],
    },
    {
        id: "events",
        label: "Events & Webinars",
        icon: Calendar,
        path: "/events",
        subMenus: [
            { id: "events-overview", label: "Overview", path: "/events" },
            { id: "events-webinars", label: "Webinars", path: "/events/webinars" },
            { id: "events-live-sessions", label: "Live Sessions", path: "/events/live-sessions" },
        ],
    },
    {
        id: "finance",
        label: "Financial Management",
        icon: DollarSign,
        path: "/finance",
        subMenus: [
            { id: "finance-overview", label: "Overview", path: "/finance" },
            { id: "finance-transactions", label: "Transactions", path: "/finance/transactions" },
            { id: "finance-subscriptions", label: "Subscriptions", path: "/finance/subscriptions" },
            { id: "finance-coupons", label: "Coupons & Discounts", path: "/finance/coupons" },
        ],
    },
    {
        id: "gamification",
        label: "Gamification",
        icon: Award,
        path: "/gamification",
        subMenus: [
            { id: "gamification-badges", label: "Badges", path: "/gamification/badges" },
            { id: "gamification-points", label: "Points", path: "/gamification/points" },
            { id: "gamification-leaderboards", label: "Leaderboards", path: "/gamification/leaderboards" },
        ],
    },
    {
        id: "settings",
        label: "System Settings",
        icon: Settings,
        path: "/settings",
        subMenus: [
            { id: "settings-general", label: "General", path: "/settings/general" },
            { id: "settings-appearance", label: "Appearance", path: "/settings/appearance" },
            { id: "settings-integrations", label: "Integrations", path: "/settings/integrations" },
            { id: "settings-security", label: "Security", path: "/settings/security" },
        ],
    },
];

export const ICON = {
    LMS: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-orange-500"
        >
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
    ),
};
