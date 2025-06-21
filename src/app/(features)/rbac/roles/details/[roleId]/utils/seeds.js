export const sampleRoleDetailsData = {
  id: "1",
  name: "Administrator",
  description: "Full system access with all administrative privileges and user management capabilities",
  privilegeCount: 15,
  userCount: 3,
  isActive: true,
  createdAt: "2024-01-10",
  updatedAt: "2024-03-15",
  privilegeGroups: [
    {
      id: "1",
      name: "User Management",
      description: "Permissions related to user account management",
      privilegeCount: 4,
      privileges: [
        {
          id: "1",
          name: "User Create",
          description: "Permission to create new user accounts",
          isActive: true,
          routes: [
            { id: "1", name: "Create User", method: "POST", endPoint: "/users" },
            { id: "2", name: "Validate User", method: "POST", endPoint: "/users/validate" },
          ],
        },
        {
          id: "2",
          name: "User Read",
          description: "Permission to view user profiles",
          isActive: true,
          routes: [
            { id: "3", name: "Get Users", method: "GET", endPoint: "/users" },
            { id: "4", name: "Get User Details", method: "GET", endPoint: "/users/:id" },
          ],
        },
        {
          id: "3",
          name: "User Update",
          description: "Permission to modify user accounts",
          isActive: true,
          routes: [
            { id: "5", name: "Update User", method: "PUT", endPoint: "/users/:id" },
            { id: "6", name: "Patch User", method: "PATCH", endPoint: "/users/:id" },
          ],
        },
        {
          id: "4",
          name: "User Delete",
          description: "Permission to delete user accounts",
          isActive: true,
          routes: [{ id: "7", name: "Delete User", method: "DELETE", endPoint: "/users/:id" }],
        },
      ],
    },
    {
      id: "2",
      name: "System Configuration",
      description: "High-level system configuration permissions",
      privilegeCount: 8,
      privileges: [
        {
          id: "11",
          name: "System Settings",
          description: "Permission to modify system-wide settings",
          isActive: true,
          routes: [
            { id: "20", name: "Get Settings", method: "GET", endPoint: "/system/settings" },
            { id: "21", name: "Update Settings", method: "PUT", endPoint: "/system/settings" },
          ],
        },
        {
          id: "12",
          name: "System Backup",
          description: "Permission to create and manage backups",
          isActive: true,
          routes: [
            { id: "22", name: "Create Backup", method: "POST", endPoint: "/system/backup" },
            { id: "23", name: "Restore Backup", method: "POST", endPoint: "/system/restore" },
          ],
        },
      ],
    },
    {
      id: "3",
      name: "Content Administration",
      description: "Administrative permissions for content management",
      privilegeCount: 3,
      privileges: [
        {
          id: "9",
          name: "Content Publish",
          description: "Permission to publish content",
          isActive: true,
          routes: [
            { id: "15", name: "Publish Content", method: "POST", endPoint: "/content/publish" },
            { id: "16", name: "Schedule Content", method: "POST", endPoint: "/content/schedule" },
          ],
        },
        {
          id: "10",
          name: "Content Moderate",
          description: "Permission to review and moderate content",
          isActive: true,
          routes: [
            { id: "17", name: "Review Content", method: "GET", endPoint: "/content/review" },
            { id: "18", name: "Approve Content", method: "PUT", endPoint: "/content/:id/approve" },
          ],
        },
      ],
    },
  ],
  assignedUsers: [
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@example.com",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      status: "active",
      assignedAt: "2024-01-15",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      status: "active",
      assignedAt: "2024-02-01",
    },
    {
      id: "3",
      name: "Michael Brown",
      email: "michael.brown@example.com",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
      status: "pending",
      assignedAt: "2024-03-10",
    },
  ],
  activityLog: [
    {
      type: "role_created",
      action: "Role Created",
      description: "Administrator role was created with full system privileges",
      timestamp: "2024-01-10T10:00:00Z",
      user: {
        name: "System Admin",
        avatar: "https://randomuser.me/api/portraits/men/10.jpg",
      },
    },
    {
      type: "privilege_added",
      action: "Privilege Added",
      description: "User Management privileges were added to the role",
      timestamp: "2024-01-10T10:30:00Z",
      user: {
        name: "System Admin",
        avatar: "https://randomuser.me/api/portraits/men/10.jpg",
      },
    },
    {
      type: "user_assigned",
      action: "User Assigned",
      description: "John Smith was assigned to Administrator role",
      timestamp: "2024-01-15T14:20:00Z",
      user: {
        name: "HR Manager",
        avatar: "https://randomuser.me/api/portraits/women/5.jpg",
      },
    },
    {
      type: "role_updated",
      action: "Role Updated",
      description: "Role description was updated to include new responsibilities",
      timestamp: "2024-02-20T09:15:00Z",
      user: {
        name: "System Admin",
        avatar: "https://randomuser.me/api/portraits/men/10.jpg",
      },
    },
    {
      type: "user_assigned",
      action: "User Assigned",
      description: "Sarah Johnson was assigned to Administrator role",
      timestamp: "2024-02-01T11:45:00Z",
      user: {
        name: "HR Manager",
        avatar: "https://randomuser.me/api/portraits/women/5.jpg",
      },
    },
  ],
}
