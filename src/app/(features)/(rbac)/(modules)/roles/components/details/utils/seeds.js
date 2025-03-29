// utils/seeds.js
const sampleRolesDetails = [
    {
        id: 1,
        name: "Admin",
        description: "Full system access with all permissions. System administrators and superusers who manage the entire application.",
        icon: "shield",
        iconColor: "indigo",
        status: "Active",
        createdBy: "System",
        createdDate: "2023-01-15",
        lastModified: "2023-05-23",
        totalUsers: 6,
        users: [
            { id: 1, initials: "JD", name: "John Doe", email: "john.doe@example.com", color: "indigo" },
            { id: 2, initials: "AS", name: "Alice Smith", email: "alice.smith@example.com", color: "green" },
            { id: 3, initials: "RJ", name: "Robert Johnson", email: "robert.j@example.com", color: "blue" },
            { id: 4, initials: "MP", name: "Mary Parker", email: "mary.p@example.com", color: "purple" },
            { id: 5, initials: "DW", name: "David Wilson", email: "david.w@example.com", color: "red" },
            { id: 6, initials: "SL", name: "Sarah Lee", email: "sarah.l@example.com", color: "yellow" },
        ],
        permissions: [
            {
                module: "User Module",
                icon: "user",
                iconColor: "indigo",
                count: 12,
                items: [
                    { name: "View User Profile", description: "View user profile information" },
                    { name: "Create User", description: "Create new user accounts" },
                    { name: "Edit User", description: "Modify user information" },
                    { name: "Delete User", description: "Remove user accounts" },
                ],
            },
            {
                module: "Course Module",
                icon: "book",
                iconColor: "green",
                count: 10,
                items: [
                    { name: "Create Course", description: "Add new courses to the platform" },
                    { name: "View Course Content", description: "Access course materials and modules" },
                    { name: "Edit Course", description: "Modify course details and content" },
                    { name: "Delete Course", description: "Remove courses from the platform" },
                ],
            },
            {
                module: "Admin Module",
                icon: "settings",
                iconColor: "red",
                count: 15,
                items: [
                    { name: "Manage Roles", description: "Create and manage user roles" },
                    { name: "Manage Permissions", description: "Assign permissions to roles" },
                    { name: "System Configuration", description: "Configure system settings" },
                    { name: "View Audit Logs", description: "Access system activity logs" },
                ],
            },
        ],
    },
    {
        id: 2,
        name: "Instructor",
        description: "Access to create and manage courses and content. Can view student progress and grades.",
        icon: "academic",
        iconColor: "blue",
        status: "Active",
        createdBy: "Admin",
        createdDate: "2023-02-10",
        lastModified: "2023-06-05",
        totalUsers: 8,
        users: [
            { id: 7, initials: "PT", name: "Paul Thompson", email: "paul.t@example.com", color: "blue" },
            { id: 8, initials: "LM", name: "Lisa Morgan", email: "lisa.m@example.com", color: "green" },
        ],
        permissions: [
            {
                module: "Course Module",
                icon: "book",
                iconColor: "green",
                count: 8,
                items: [
                    { name: "Create Course", description: "Add new courses to the platform" },
                    { name: "View Course Content", description: "Access course materials and modules" },
                    { name: "Edit Course", description: "Modify course details and content" },
                ],
            },
            {
                module: "Student Module",
                icon: "users",
                iconColor: "purple",
                count: 6,
                items: [
                    { name: "View Student Progress", description: "Monitor student course progress" },
                    { name: "Grade Assignments", description: "Evaluate and grade student work" },
                    { name: "Send Announcements", description: "Communicate with enrolled students" },
                ],
            },
        ],
    },
    {
        id: 3,
        name: "Student",
        description: "Basic access to view and participate in assigned courses. Can submit assignments and view grades.",
        icon: "graduation",
        iconColor: "yellow",
        status: "Active",
        createdBy: "Admin",
        createdDate: "2023-02-15",
        lastModified: "2023-05-20",
        totalUsers: 45,
        users: [
            { id: 9, initials: "EJ", name: "Emma Johnson", email: "emma.j@example.com", color: "pink" },
            { id: 10, initials: "MB", name: "Michael Brown", email: "michael.b@example.com", color: "orange" },
        ],
        permissions: [
            {
                module: "Course Module",
                icon: "book",
                iconColor: "green",
                count: 4,
                items: [
                    { name: "View Course Content", description: "Access course materials and modules" },
                    { name: "Submit Assignments", description: "Upload and submit course assignments" },
                    { name: "View Grades", description: "Access personal grade information" },
                ],
            },
            {
                module: "Discussion Module",
                icon: "chat",
                iconColor: "blue",
                count: 3,
                items: [
                    { name: "View Discussions", description: "Read discussion threads" },
                    { name: "Create Posts", description: "Add new posts to discussions" },
                    { name: "Reply to Posts", description: "Respond to existing discussion posts" },
                ],
            },
        ],
    },
];

export default sampleRolesDetails;
