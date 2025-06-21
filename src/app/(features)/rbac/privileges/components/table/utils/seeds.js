const samplePrivilegesTableData = {
  totalPages: 3,
  totalDocuments: 24,
  records: [
    {
      id: "1",
      name: "User Create",
      description: "Permission to create new user accounts and set initial user properties",
      privilegeGroup: {
        id: "1",
        name: "User Management",
      },
      routes: [
        { id: "1", name: "Create User", method: "POST", endPoint: "/users" },
        { id: "2", name: "Validate User", method: "POST", endPoint: "/users/validate" },
      ],
      roleCount: 3,
      isActive: true,
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      name: "User Read",
      description: "Permission to view user profiles and account information",
      privilegeGroup: {
        id: "1",
        name: "User Management",
      },
      routes: [
        { id: "3", name: "Get Users", method: "GET", endPoint: "/users" },
        { id: "4", name: "Get User Details", method: "GET", endPoint: "/users/:id" },
      ],
      roleCount: 5,
      isActive: true,
      createdAt: "2024-01-16",
    },
    {
      id: "3",
      name: "User Update",
      description: "Permission to modify existing user accounts and update user information",
      privilegeGroup: {
        id: "1",
        name: "User Management",
      },
      routes: [
        { id: "5", name: "Update User", method: "PUT", endPoint: "/users/:id" },
        { id: "6", name: "Patch User", method: "PATCH", endPoint: "/users/:id" },
      ],
      roleCount: 2,
      isActive: true,
      createdAt: "2024-01-17",
    },
    {
      id: "4",
      name: "User Delete",
      description: "Permission to delete user accounts and remove user data from the system",
      privilegeGroup: {
        id: "1",
        name: "User Management",
      },
      routes: [{ id: "7", name: "Delete User", method: "DELETE", endPoint: "/users/:id" }],
      roleCount: 1,
      isActive: true,
      createdAt: "2024-01-18",
    },
    {
      id: "5",
      name: "Course Create",
      description: "Permission to create new courses and educational content",
      privilegeGroup: {
        id: "2",
        name: "Course Management",
      },
      routes: [
        { id: "8", name: "Create Course", method: "POST", endPoint: "/courses" },
        { id: "9", name: "Upload Course Media", method: "POST", endPoint: "/courses/media" },
      ],
      roleCount: 3,
      isActive: true,
      createdAt: "2024-01-20",
    },
    {
      id: "6",
      name: "Course Read",
      description: "Permission to view course details and educational content",
      privilegeGroup: {
        id: "2",
        name: "Course Management",
      },
      routes: [
        { id: "10", name: "Get Courses", method: "GET", endPoint: "/courses" },
        { id: "11", name: "Get Course Details", method: "GET", endPoint: "/courses/:id" },
      ],
      roleCount: 6,
      isActive: true,
      createdAt: "2024-01-21",
    },
    {
      id: "7",
      name: "Course Update",
      description: "Permission to modify existing courses and update course content",
      privilegeGroup: {
        id: "2",
        name: "Course Management",
      },
      routes: [
        { id: "12", name: "Update Course", method: "PUT", endPoint: "/courses/:id" },
        { id: "13", name: "Update Course Status", method: "PATCH", endPoint: "/courses/:id/status" },
      ],
      roleCount: 2,
      isActive: true,
      createdAt: "2024-01-22",
    },
    {
      id: "8",
      name: "Course Delete",
      description: "Permission to delete courses and remove educational content",
      privilegeGroup: {
        id: "2",
        name: "Course Management",
      },
      routes: [{ id: "14", name: "Delete Course", method: "DELETE", endPoint: "/courses/:id" }],
      roleCount: 1,
      isActive: false,
      createdAt: "2024-01-23",
    },
    {
      id: "9",
      name: "Content Publish",
      description: "Permission to publish and make content available to users",
      privilegeGroup: {
        id: "3",
        name: "Content Administration",
      },
      routes: [
        { id: "15", name: "Publish Content", method: "POST", endPoint: "/content/publish" },
        { id: "16", name: "Schedule Content", method: "POST", endPoint: "/content/schedule" },
      ],
      roleCount: 2,
      isActive: true,
      createdAt: "2024-02-01",
    },
    {
      id: "10",
      name: "Content Moderate",
      description: "Permission to review and moderate user-generated content",
      privilegeGroup: {
        id: "3",
        name: "Content Administration",
      },
      routes: [
        { id: "17", name: "Review Content", method: "GET", endPoint: "/content/review" },
        { id: "18", name: "Approve Content", method: "PUT", endPoint: "/content/:id/approve" },
        { id: "19", name: "Reject Content", method: "PUT", endPoint: "/content/:id/reject" },
      ],
      roleCount: 3,
      isActive: true,
      createdAt: "2024-02-02",
    },
    {
      id: "11",
      name: "System Settings",
      description: "Permission to modify system-wide configuration and settings",
      privilegeGroup: {
        id: "4",
        name: "System Configuration",
      },
      routes: [
        { id: "20", name: "Get Settings", method: "GET", endPoint: "/system/settings" },
        { id: "21", name: "Update Settings", method: "PUT", endPoint: "/system/settings" },
      ],
      roleCount: 1,
      isActive: true,
      createdAt: "2024-02-10",
    },
    {
      id: "12",
      name: "System Backup",
      description: "Permission to create and manage system backups",
      privilegeGroup: {
        id: "4",
        name: "System Configuration",
      },
      routes: [
        { id: "22", name: "Create Backup", method: "POST", endPoint: "/system/backup" },
        { id: "23", name: "Restore Backup", method: "POST", endPoint: "/system/restore" },
      ],
      roleCount: 1,
      isActive: true,
      createdAt: "2024-02-11",
    },
  ],
}

export default samplePrivilegesTableData
