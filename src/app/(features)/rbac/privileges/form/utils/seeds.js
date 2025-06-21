export const samplePrivilegeData = {
  id: "1",
  name: "User Create",
  description: "Permission to create new user accounts and set initial user properties and configurations",
  privilegeGroupId: "1",
  routes: [
    { id: "1", name: "Create User", method: "POST", endPoint: "/users" },
    { id: "2", name: "Validate User", method: "POST", endPoint: "/users/validate" },
  ],
  isActive: true,
}
