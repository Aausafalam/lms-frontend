const samplePermissionGroupTableData = {
    totalPages: 10,
    totalDocuments: 100,
    records: [
        {
            id: 1,
            name: "User Module",
            description: "User management permissions",
            iconColor: "blue",
            iconName: "USER",
            permissions: [
                { name: "View User Profile", routes: [{ name: "/users/view" }, { name: "/users/profile" }] },
                { name: "Create User", routes: [{ name: "/users/create" }] },
                { name: "Edit User", routes: [{ name: "/users/edit" }] },
                { name: "Delete User", routes: [{ name: "/users/delete" }] },
                { name: "View User Profile", routes: [{ name: "/users/view" }, { name: "/users/profile" }] },
                { name: "Create User", routes: [{ name: "/users/create" }] },
                { name: "Edit User", routes: [{ name: "/users/edit" }] },
                { name: "Delete User", routes: [{ name: "/users/delete" }] },
            ],
        },
        {
            id: 2,
            name: "Course Module",
            description: "Course management permissions",
            iconColor: "green",
            iconName: "BOOK",
            permissions: [
                { name: "Create Course", routes: [{ name: "/courses/create" }, { name: "/courses/draft" }] },
                { name: "View Course Content", routes: [{ name: "/courses/view" }, { name: "/courses/content" }, { name: "/courses/lessons" }, { name: "/courses/materials" }] },
                { name: "Edit Course", routes: [{ name: "/courses/edit" }, { name: "/courses/update" }] },
                { name: "Delete Course", routes: [{ name: "/courses/delete" }] },
            ],
        },
        {
            id: 3,
            name: "Student Module",
            description: "Student management permissions",
            iconColor: "purple",
            iconName: "ACADEMIC_CAP",
            permissions: [
                { name: "View Student Profile", routes: [{ name: "/students/view" }, { name: "/students/profile" }] },
                { name: "Manage Enrollments", routes: [{ name: "/students/enroll" }, { name: "/students/unenroll" }, { name: "/students/transfer" }] },
                { name: "View Progress Reports", routes: [{ name: "/students/progress" }, { name: "/students/reports" }] },
                {
                    name: "Manage Assignments",
                    routes: [{ name: "/students/assignments/view" }, { name: "/students/assignments/grade" }, { name: "/students/assignments/comment" }, { name: "/students/assignments/extend" }],
                },
            ],
        },
        {
            id: 4,
            name: "Teacher Module",
            description: "Teacher management permissions",
            iconColor: "yellow",
            iconName: "ACADEMIC_BUILDING",
            permissions: [
                { name: "View Teacher Profile", routes: [{ name: "/teachers/view" }, { name: "/teachers/profile" }] },
                {
                    name: "Manage Classes",
                    routes: [{ name: "/teachers/classes/create" }, { name: "/teachers/classes/edit" }, { name: "/teachers/classes/schedule" }, { name: "/teachers/classes/archive" }],
                },
                { name: "Grade Assignments", routes: [{ name: "/teachers/grade" }, { name: "/teachers/feedback" }, { name: "/teachers/rubrics" }] },
                { name: "Create Assessments", routes: [{ name: "/teachers/assessments/create" }, { name: "/teachers/assessments/edit" }] },
            ],
        },
        {
            id: 5,
            name: "Admin Module",
            description: "System administration permissions",
            iconColor: "red",
            iconName: "COG",
            permissions: [
                {
                    name: "Manage Roles",
                    routes: [{ name: "/admin/roles/create" }, { name: "/admin/roles/edit" }, { name: "/admin/roles/delete" }, { name: "/admin/roles/assign" }, { name: "/admin/roles/revoke" }],
                },
                {
                    name: "Manage Permissions",
                    routes: [{ name: "/admin/permissions/create" }, { name: "/admin/permissions/edit" }, { name: "/admin/permissions/delete" }, { name: "/admin/permissions/assign" }],
                },
                {
                    name: "System Configuration",
                    routes: [
                        { name: "/admin/config/general" },
                        { name: "/admin/config/security" },
                        { name: "/admin/config/email" },
                        { name: "/admin/config/integrations" },
                        { name: "/admin/config/backup" },
                        { name: "/admin/config/maintenance" },
                    ],
                },
                { name: "View Audit Logs", routes: [{ name: "/admin/logs/view" }, { name: "/admin/logs/export" }] },
            ],
        },
        {
            id: 6,
            name: "Analytics Module",
            description: "Data analysis permissions",
            iconColor: "indigo",
            iconName: "CHART_BAR",
            permissions: [
                { name: "View Dashboard", routes: [{ name: "/analytics/dashboard" }, { name: "/analytics/overview" }, { name: "/analytics/summary" }] },
                {
                    name: "Generate Reports",
                    routes: [{ name: "/analytics/reports/create" }, { name: "/analytics/reports/schedule" }, { name: "/analytics/reports/customize" }, { name: "/analytics/reports/share" }],
                },
                { name: "Export Data", routes: [{ name: "/analytics/export/csv" }, { name: "/analytics/export/pdf" }] },
                { name: "Performance Metrics", routes: [{ name: "/analytics/metrics/view" }, { name: "/analytics/metrics/compare" }, { name: "/analytics/metrics/trend" }] },
            ],
        },
    ],
};

export default samplePermissionGroupTableData;
