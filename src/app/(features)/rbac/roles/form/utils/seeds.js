export const sampleRoleData = {
  id: "1",
  name: "Administrator",
  description: "Full system access with all administrative privileges and user management capabilities",
  privileges: [
    {
      id: "1",
      name: "User Create",
      description: "Permission to create new user accounts",
      routeCount: 2,
    },
    {
      id: "2",
      name: "User Read",
      description: "Permission to view user profiles",
      routeCount: 2,
    },
    {
      id: "11",
      name: "System Settings",
      description: "Permission to modify system-wide settings",
      routeCount: 2,
    },
  ],
  isActive: true,
}
