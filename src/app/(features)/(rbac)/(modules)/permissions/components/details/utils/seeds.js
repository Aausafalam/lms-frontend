const permissionDetails = {
    id: 1,
    name: "View User Profile",
    permissionGroup: "User Module",
    description: "Allows users to view profile information including personal details, account settings, and activity history.",
    createdBy: "Admin User",
    lastUpdatedBy: "2023-04-12 10:45 AM",
    roles: [{ name: "Admin" }, { name: "Teacher" }, { name: "Student" }, { name: "Content Manager" }],
    routes: [
        {
            path: "/api/v1/user",
            method: "GET",
            name: "Get user profile information",
        },
        {
            path: "/api/v1/user/settings",
            method: "GET",
            name: "Get user settings",
        },
        {
            path: "/api/v1/user/activity",
            method: "GET",
            name: "Get user activity history",
        },
    ],
};
export default permissionDetails;
