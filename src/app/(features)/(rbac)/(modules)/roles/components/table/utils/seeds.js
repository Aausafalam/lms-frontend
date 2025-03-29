const samplePermissionGroupTableData = {
    totalPages: 10,
    totalDocuments: 100,
    records: [
        {
            name: "Admin",
            permissionCount: 50,
            usersCount: 10,
            status: "Active",
            description: "Has full access to all system features.",
        },
        {
            name: "Teacher",
            permissionCount: 30,
            usersCount: 8,
            status: "Active",
            description: "Can edit content but has limited admin privileges.",
        },
        {
            name: "Student",
            permissionCount: 10,
            usersCount: 20,
            status: "Active",
            description: "Can view content but cannot make changes.",
        },
        {
            name: "Content Manager",
            permissionCount: 25,
            usersCount: 5,
            status: "Active",
            description: "Can manage user comments and community interactions.",
        },
        {
            name: "Support",
            permissionCount: 15,
            usersCount: 7,
            status: "Active",
            description: "Handles customer support and user inquiries.",
        },
        {
            name: "HR Manager",
            permissionCount: 35,
            usersCount: 3,
            status: "Active",
            description: "Manages employee records and HR functions.",
        },
        {
            name: "Finance",
            permissionCount: 20,
            usersCount: 4,
            status: "Active",
            description: "Handles billing and financial reports.",
        },
        {
            name: "IT Support",
            permissionCount: 25,
            usersCount: 6,
            status: "Active",
            description: "Manages IT-related issues and system maintenance.",
        },
        {
            name: "Project Manager",
            permissionCount: 40,
            usersCount: 5,
            status: "Active",
            description: "Oversees project timelines and team collaboration.",
        },
        {
            name: "Marketing",
            permissionCount: 20,
            usersCount: 6,
            status: "Inactive",
            description: "Handles marketing campaigns and branding.",
        },
    ],
};

export default samplePermissionGroupTableData;
