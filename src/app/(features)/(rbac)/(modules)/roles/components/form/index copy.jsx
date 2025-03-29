"use client";

import React, { useMemo } from "react";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Search, AlertCircle, CheckCircle, X, ChevronRight, Sparkles, Calendar, Shield } from "lucide-react";
import DynamicForm from "@/components/form";
import Tabs from "@/components/tab";

// Mock data with many permissions per module to demonstrate scalability
const generatePermissions = (moduleId, baseName, count) => {
    return Array.from({ length: count }, (_, i) => ({
        id: `${moduleId}-${i + 1}`,
        name: `${baseName} ${i + 1}`,
    }));
};

export default function AddRolePage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("general");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [notification, setNotification] = useState({
        show: false,
        type: "success",
        message: "",
    });

    // General tab state
    const [roleName, setRoleName] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [description, setDescription] = useState("");

    // Permissions tab state
    const [selectedPermissions, setSelectedPermissions] = useState([]);
    const [permissionGroups, setPermissionGroups] = useState([]);
    const [permissionActiveTab, setPermissionActiveTab] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoadingPermissions, setIsLoadingPermissions] = useState(false);

    // Users tab state
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [users, setUsers] = useState([]);
    const [userSearchQuery, setUserSearchQuery] = useState("");
    const [isLoadingUsers, setIsLoadingUsers] = useState(false);

    // Fetch permission groups
    const fetchPermissionGroups = useCallback(async () => {
        setIsLoadingPermissions(true);
        try {
            const response = await fetch("/api/permission-groups");
            if (!response.ok) {
                throw new Error("Failed to fetch permission groups");
            }
            const data = await response.json();
            setPermissionGroups(data);
            if (data.length > 0) {
                setPermissionActiveTab(data[0].id);
            }
        } catch (error) {
            console.error("Error fetching permission groups:", error);
            // Fallback to mock data
            const mockPermissionGroups = [
                {
                    id: "user-management",
                    name: "User Management",
                    permissions: generatePermissions("user", "User Permission", 35),
                },
                {
                    id: "course-management",
                    name: "Course Management",
                    permissions: generatePermissions("course", "Course Permission", 40),
                },
                {
                    id: "content-management",
                    name: "Content Management",
                    permissions: generatePermissions("content", "Content Permission", 30),
                },
                {
                    id: "reporting",
                    name: "Reporting & Analytics",
                    permissions: generatePermissions("report", "Report Permission", 25),
                },
                {
                    id: "settings",
                    name: "System Settings",
                    permissions: generatePermissions("setting", "Setting Permission", 20),
                },
            ];
            setPermissionGroups(mockPermissionGroups);
            setPermissionActiveTab(mockPermissionGroups[0].id);
        } finally {
            setIsLoadingPermissions(false);
        }
    }, []);

    // Fetch permissions for a specific group
    const fetchPermissions = useCallback(async (groupId) => {
        setIsLoadingPermissions(true);
        try {
            const response = await fetch(`/api/permissions/${groupId}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch permissions for group ${groupId}`);
            }
            const data = await response.json();

            // Update the permissions for this specific group
            setPermissionGroups((prev) => prev.map((group) => (group.id === groupId ? { ...group, permissions: data } : group)));
        } catch (error) {
            console.error(`Error fetching permissions for group ${groupId}:`, error);
            // We don't need to set fallback data here as it's already in the permissionGroups state
        } finally {
            setIsLoadingPermissions(false);
        }
    }, []);

    // Fetch users
    const fetchUsers = useCallback(async () => {
        setIsLoadingUsers(true);
        try {
            const response = await fetch("/api/user-list");
            if (!response.ok) {
                throw new Error("Failed to fetch users");
            }
            const { data } = await response.json();
            setUsers(data.records);
        } catch (error) {
            console.error("Error fetching users:", error);
            // Fallback to mock data
            const mockUsers = Array.from({ length: 20 }, (_, i) => ({
                id: `user-${i + 1}`,
                name: `User ${i + 1}`,
                email: `user${i + 1}@example.com`,
                department: ["HR", "IT", "Marketing", "Sales", "Support"][Math.floor(Math.random() * 5)],
                avatar: `/placeholder.svg?height=40&width=40`,
            }));
            setUsers(mockUsers);
        } finally {
            setIsLoadingUsers(false);
        }
    }, []);

    // Initial data loading
    useEffect(() => {
        fetchPermissionGroups();
    }, [fetchPermissionGroups]);

    // Load permissions when tab changes
    useEffect(() => {
        if (permissionActiveTab) {
            fetchPermissions(permissionActiveTab);
        }
    }, [permissionActiveTab, fetchPermissions]);

    // Load users when tab changes to users
    useEffect(() => {
        if (activeTab === "users") {
            fetchUsers();
        }
    }, [activeTab, fetchUsers]);

    // Filter permissions based on search query
    const filteredPermissionGroups = permissionGroups
        .map((group) => ({
            ...group,
            permissions: group.permissions.filter((permission) => permission.name.toLowerCase().includes(searchQuery.toLowerCase())),
        }))
        .filter((group) => group.permissions.length > 0);

    // Filter users based on search query
    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
            user.department.toLowerCase().includes(userSearchQuery.toLowerCase())
    );

    // Handle permission selection
    const handlePermissionChange = useCallback((permissionId) => {
        setSelectedPermissions((prev) => {
            if (prev.includes(permissionId)) {
                return prev.filter((id) => id !== permissionId);
            } else {
                return [...prev, permissionId];
            }
        });
    }, []);

    // Handle user selection
    const handleUserChange = useCallback((userId) => {
        setSelectedUsers((prev) => {
            if (prev.includes(userId)) {
                return prev.filter((id) => id !== userId);
            } else {
                return [...prev, userId];
            }
        });
    }, []);

    // Handle select all permissions in a group
    const handleSelectAllInGroup = useCallback(
        (groupId) => {
            const group = permissionGroups.find((g) => g.id === groupId);
            if (!group) return;

            const groupPermissionIds = group.permissions?.map((p) => p.id);
            const allSelected = groupPermissionIds.every((id) => selectedPermissions.includes(id));

            if (allSelected) {
                setSelectedPermissions((prev) => prev.filter((id) => !groupPermissionIds.includes(id)));
            } else {
                setSelectedPermissions((prev) => {
                    const newPermissions = [...prev];
                    groupPermissionIds.forEach((id) => {
                        if (!newPermissions.includes(id)) {
                            newPermissions.push(id);
                        }
                    });
                    return newPermissions;
                });
            }
        },
        [permissionGroups, selectedPermissions]
    );

    // Handle select all users
    const handleSelectAllUsers = useCallback(() => {
        const allUserIds = filteredUsers.map((user) => user.id);
        const allSelected = allUserIds.every((id) => selectedUsers.includes(id));

        if (allSelected) {
            setSelectedUsers([]);
        } else {
            setSelectedUsers(allUserIds);
        }
    }, [filteredUsers, selectedUsers]);

    // Navigate to next tab
    const handleNextTab = () => {
        if (activeTab === "general") {
            if (!roleName.trim()) {
                showNotification("error", "Role name is required");
                return;
            }
            setActiveTab("permissions");
        } else if (activeTab === "permissions") {
            if (selectedPermissions.length === 0) {
                showNotification("error", "Please select at least one permission");
                return;
            }
            setActiveTab("users");
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!roleName.trim()) {
            showNotification("error", "Role name is required");
            return;
        }

        if (selectedPermissions.length === 0) {
            showNotification("error", "Please select at least one permission");
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch("/api/add-role", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: roleName,
                    shortDescription,
                    description,
                    permissions: selectedPermissions,
                    users: selectedUsers,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to create role");
            }

            showNotification("success", "Role created successfully");

            // Reset form after successful submission
            setRoleName("");
            setShortDescription("");
            setDescription("");
            setSelectedPermissions([]);
            setSelectedUsers([]);

            // Redirect after a short delay to show success message
            setTimeout(() => {
                router.push("/roles");
            }, 1500);
        } catch (error) {
            showNotification("error", error instanceof Error ? error.message : "Failed to create role");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Show notification
    const showNotification = (type, message) => {
        setNotification({ show: true, type, message });
        setTimeout(() => {
            setNotification((prev) => ({ ...prev, show: false }));
        }, 5000);
    };

    // Auto-hide notification after 5 seconds
    useEffect(() => {
        if (notification.show) {
            const timer = setTimeout(() => {
                setNotification((prev) => ({ ...prev, show: false }));
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [notification.show]);

    // Calculate stats
    const totalPermissions = permissionGroups.reduce((acc, group) => acc + group.permissions.length, 0);
    const selectedPermissionsCount = selectedPermissions.length;
    const percentSelected = totalPermissions > 0 ? Math.round((selectedPermissionsCount / totalPermissions) * 100) : 0;

    // Calculate completion percentage
    const calculateCompletion = () => {
        let steps = 0;
        let completed = 0;

        // Role name is required
        steps++;
        if (roleName.trim()) completed++;

        // At least one permission is required
        steps++;
        if (selectedPermissions.length > 0) completed++;

        return Math.round((completed / steps) * 100);
    };

    // Notification Component
    const NotificationComponent = () => {
        if (!notification.show) return null;

        return (
            <div className={`fixed top-4 right-4 z-50 max-w-md transform transition-all duration-300 ease-in-out`}>
                <Alert variant={notification.type === "success" ? "default" : "destructive"} className="border-l-4 shadow-lg">
                    <div className="flex items-center">
                        {notification.type === "success" ? <CheckCircle className="h-5 w-5 mr-2" /> : <AlertCircle className="h-5 w-5 mr-2" />}
                        <AlertDescription>{notification.message}</AlertDescription>
                        <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setNotification((prev) => ({ ...prev, show: false }))}>
                            <X className="h-4 w-4" />
                            <span className="sr-only">Close</span>
                        </Button>
                    </div>
                </Alert>
            </div>
        );
    };

    const formData = useMemo(() => [
        {
            type: "text",
            name: "name",
            label: "Role Name",
            grid: 1,
            placeholder: "Enter role name",
            validationRules: { required: true },
            validateOnChange: true,
            customOnChange: (event) => {
                setRoleName(event.target.value);
            },
        },
        {
            type: "text",
            name: "shortDescription",
            label: "Short Description",
            grid: 1,
            placeholder: "Enter short description",
            validationRules: { required: true },
            validateOnChange: true,
            customOnChange: (event) => {
                setShortDescription(event.target.value);
            },
        },
        {
            type: "textarea",
            name: "description",
            label: "Full Description",
            grid: 1,
            placeholder: "Enter full description",
            validationRules: { required: true },
            validateOnChange: true,
            customOnChange: (event) => {
                setDescription(event.target.value);
            },
        },
    ]);

    const formButtons = useMemo(
        () => [
            {
                label: "Save and Next",
                type: "button",
                loading: false,
                onClick: handleNextTab,
            },
        ],
        []
    );

    const tabs = useMemo(
        () => [
            {
                id: "general",
                label: "General Information",
                icon: <Sparkles className="size-4" />,
                content: <DynamicForm key={"role-form"} formData={formData} formButtons={formButtons} formId={"role-form"} />,
            },
            {
                id: "permissions",
                label: (
                    <div>
                        {" "}
                        Permissions
                        {selectedPermissionsCount > 0 && (
                            <Badge variant="secondary" className="ml-1">
                                {selectedPermissionsCount}
                            </Badge>
                        )}
                    </div>
                ),
                icon: <Shield className="size-4" />,
                content: (
                    <div value="permissions" className="p-0 m-0">
                        <div className="p-6 md:p-8">
                            <div className="space-y-6">
                                {/* Search and stats */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
                                    <div className="relative flex-1 max-w-md">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Search className="h-4 w-4 text-muted-foreground" />
                                        </div>
                                        <Input type="text" placeholder="Search permissions..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
                                    </div>
                                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                        <span className="font-medium">
                                            {selectedPermissionsCount} of {totalPermissions} selected
                                        </span>
                                        <Progress value={percentSelected} className="w-24 h-2" />
                                        <span>{percentSelected}%</span>
                                    </div>
                                </div>

                                {/* Module tabs */}
                                <div className="mb-6 border-b">
                                    <div className="flex overflow-x-auto hide-scrollbar space-x-1">
                                        {permissionGroups.map((group) => (
                                            <Button
                                                key={group.id}
                                                type="button"
                                                variant={permissionActiveTab === group.id ? "default" : "ghost"}
                                                onClick={() => setPermissionActiveTab(group.id)}
                                                className={`rounded-none rounded-t-lg ${
                                                    permissionActiveTab === group.id ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white" : "text-muted-foreground"
                                                }`}
                                            >
                                                {group.name}
                                                <Badge variant="outline" className="ml-2 bg-white/20 text-white">
                                                    {group.permissions.length}
                                                </Badge>
                                            </Button>
                                        ))}
                                    </div>
                                </div>

                                {/* Bulk actions */}
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-medium">{permissionGroups.find((g) => g.id === permissionActiveTab)?.name} Permissions</h3>
                                    <div className="flex space-x-2">
                                        <Button type="button" variant="outline" size="sm" onClick={() => handleSelectAllInGroup(permissionActiveTab)}>
                                            Select All
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                const group = permissionGroups.find((g) => g.id === permissionActiveTab);
                                                if (group) {
                                                    const groupPermissionIds = group.permissions.map((p) => p.id);
                                                    setSelectedPermissions((prev) => prev.filter((id) => !groupPermissionIds.includes(id)));
                                                }
                                            }}
                                        >
                                            Deselect All
                                        </Button>
                                    </div>
                                </div>

                                {/* Permissions grid */}
                                <div className="bg-muted/20 rounded-lg border overflow-hidden">
                                    <div className="max-h-[400px] overflow-y-auto p-1">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 p-2">
                                            {isLoadingPermissions
                                                ? Array.from({ length: 9 }).map((_, index) => <div key={index} className="bg-muted/30 animate-pulse h-12 rounded-lg" />)
                                                : permissionGroups
                                                      .find((g) => g.id === permissionActiveTab)
                                                      ?.permissions.filter((permission) => permission.name.toLowerCase().includes(searchQuery.toLowerCase()))
                                                      .map((permission) => (
                                                          <label
                                                              key={permission.id}
                                                              className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-150 ${
                                                                  selectedPermissions.includes(permission.id) ? "bg-indigo-50 border border-indigo-200" : "bg-white border hover:bg-muted/10"
                                                              }`}
                                                          >
                                                              <Checkbox
                                                                  checked={selectedPermissions.includes(permission.id)}
                                                                  onCheckedChange={() => handlePermissionChange(permission.id)}
                                                                  className="mr-2 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                                                              />
                                                              <span className="text-sm truncate">{permission.name}</span>
                                                          </label>
                                                      ))}
                                        </div>
                                    </div>
                                </div>

                                {/* No results message */}
                                {searchQuery && filteredPermissionGroups.length === 0 && (
                                    <div className="text-center py-8">
                                        <div className="mx-auto h-12 w-12 text-muted-foreground">
                                            <Search className="h-12 w-12" />
                                        </div>
                                        <h3 className="mt-2 text-sm font-medium">No permissions found</h3>
                                        <p className="mt-1 text-sm text-muted-foreground">Try adjusting your search terms.</p>
                                    </div>
                                )}
                            </div>

                            <div className="mt-8 flex justify-end">
                                <Button
                                    type="button"
                                    onClick={handleNextTab}
                                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Save and Next <ChevronRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                ),
            },
            {
                id: "shift-employees",
                label: "Shift Employees",
                icon: <User className="size-4" />,
                content: (
                    <EmployeeShiftTable
                        isProjectManager={isProjectManager}
                        setShow={setShow}
                        setEmployeeShiftDetails={setEmployeeShiftDetails}
                        refreshTable={refreshTable}
                        setSelectedRow={setSelectedRow}
                    />
                ),
            },
        ],
        [isNotEmployee, isProjectManager, refreshTable]
    );

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-purple-50 p-4 md:p-8">
            {/* Notification */}
            <NotificationComponent />

            <div className="max-w-6xl mx-auto shadow-xl overflow-hidden border-0">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 md:p-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-white">Create New Role</h1>
                    <p className="text-indigo-100 mt-2">Define role details, permissions, and assign users</p>
                </div>
                <Tabs tabs={tabs} variant={"underline"} />
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <div className="border-b">
                        <div className="flex overflow-x-auto hide-scrollbar">
                            <TabsList className="bg-transparent h-auto p-0">
                                <TabsTrigger
                                    value="general"
                                    className={`px-6 py-4 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 rounded-none`}
                                >
                                    General Information
                                </TabsTrigger>
                                <TabsTrigger
                                    value="permissions"
                                    className={`px-6 py-4 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 rounded-none flex items-center gap-2`}
                                >
                                    Permissions
                                    {selectedPermissionsCount > 0 && (
                                        <Badge variant="secondary" className="ml-1">
                                            {selectedPermissionsCount}
                                        </Badge>
                                    )}
                                </TabsTrigger>
                                <TabsTrigger
                                    value="users"
                                    className={`px-6 py-4 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 rounded-none flex items-center gap-2`}
                                >
                                    Assign Users
                                    {selectedUsers.length > 0 && (
                                        <Badge variant="secondary" className="ml-1">
                                            {selectedUsers.length}
                                        </Badge>
                                    )}
                                </TabsTrigger>
                            </TabsList>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <TabsContent value="users" className="p-0 m-0">
                            <CardContent className="p-6 md:p-8">
                                <div className="space-y-6">
                                    {/* Search and stats */}
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
                                        <div className="relative flex-1 max-w-md">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Search className="h-4 w-4 text-muted-foreground" />
                                            </div>
                                            <Input type="text" placeholder="Search users..." value={userSearchQuery} onChange={(e) => setUserSearchQuery(e.target.value)} className="pl-10" />
                                        </div>
                                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                            <span className="font-medium">
                                                {selectedUsers.length} of {filteredUsers.length} selected
                                            </span>
                                        </div>
                                    </div>

                                    {/* Bulk actions */}
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-lg font-medium">Assign Users to Role</h3>
                                        <div className="flex space-x-2">
                                            <Button type="button" variant="outline" size="sm" onClick={handleSelectAllUsers}>
                                                {filteredUsers.length > 0 && filteredUsers.every((user) => selectedUsers.includes(user.id)) ? "Deselect All" : "Select All"}
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Users list */}
                                    <div className="bg-white rounded-lg border overflow-hidden">
                                        <div className="max-h-[475px] overflow-y-auto">
                                            <table className="min-w-full divide-y">
                                                <thead className="bg-muted/20 sticky top-0">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                                            <Checkbox
                                                                checked={filteredUsers.length > 0 && filteredUsers.every((user) => selectedUsers.includes(user.id))}
                                                                onCheckedChange={handleSelectAllUsers}
                                                                className="data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                                                            />
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                                            User
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                                            Department
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y">
                                                    {isLoadingUsers
                                                        ? Array.from({ length: 5 }).map((_, index) => (
                                                              <tr key={index}>
                                                                  <td className="px-6 py-4 whitespace-nowrap">
                                                                      <div className="h-4 w-4 bg-muted/30 animate-pulse rounded" />
                                                                  </td>
                                                                  <td className="px-6 py-4 whitespace-nowrap">
                                                                      <div className="flex items-center">
                                                                          <div className="h-10 w-10 bg-muted/30 animate-pulse rounded-full" />
                                                                          <div className="ml-4 space-y-2">
                                                                              <div className="h-4 w-32 bg-muted/30 animate-pulse rounded" />
                                                                              <div className="h-3 w-40 bg-muted/30 animate-pulse rounded" />
                                                                          </div>
                                                                      </div>
                                                                  </td>
                                                                  <td className="px-6 py-4 whitespace-nowrap">
                                                                      <div className="h-5 w-20 bg-muted/30 animate-pulse rounded" />
                                                                  </td>
                                                              </tr>
                                                          ))
                                                        : filteredUsers.map((user) => (
                                                              <tr
                                                                  key={user.id}
                                                                  className={`${selectedUsers.includes(user.id) ? "bg-indigo-50" : "hover:bg-muted/5"} cursor-pointer`}
                                                                  onClick={() => handleUserChange(user.id)}
                                                              >
                                                                  <td className="px-6 py-4 whitespace-nowrap">
                                                                      <Checkbox
                                                                          checked={selectedUsers.includes(user.id)}
                                                                          onCheckedChange={() => handleUserChange(user.id)}
                                                                          onClick={(e) => e.stopPropagation()}
                                                                          className="data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                                                                      />
                                                                  </td>
                                                                  <td className="px-6 py-4 whitespace-nowrap">
                                                                      <div className="flex items-center">
                                                                          <Avatar className="h-10 w-10">
                                                                              <AvatarImage src="/profileIcon.webp" alt={user.name} />
                                                                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                                                          </Avatar>
                                                                          <div className="ml-4">
                                                                              <div className="text-sm font-medium">{user.name}</div>
                                                                              <div className="text-sm text-muted-foreground">{user.email}</div>
                                                                          </div>
                                                                      </div>
                                                                  </td>
                                                                  <td className="px-6 py-4 whitespace-nowrap">
                                                                      <Badge variant="outline" className="bg-muted/10">
                                                                          {user.department}
                                                                      </Badge>
                                                                  </td>
                                                              </tr>
                                                          ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    {/* No results message */}
                                    {userSearchQuery && filteredUsers.length === 0 && (
                                        <div className="text-center py-8">
                                            <div className="mx-auto h-12 w-12 text-muted-foreground">
                                                <Search className="h-12 w-12" />
                                            </div>
                                            <h3 className="mt-2 text-sm font-medium">No users found</h3>
                                            <p className="mt-1 text-sm text-muted-foreground">Try adjusting your search terms.</p>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-8 flex justify-end">
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        {isSubmitting ? (
                                            <div className="flex items-center">
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    ></path>
                                                </svg>
                                                Creating Role...
                                            </div>
                                        ) : (
                                            "Create Role"
                                        )}
                                    </Button>
                                </div>
                            </CardContent>
                        </TabsContent>
                    </form>
                </Tabs>

                {/* Progress indicator */}
                <div className="p-6 border-t bg-muted/10">
                    <div className="flex justify-between items-center max-w-3xl mx-auto">
                        <div className="text-sm text-muted-foreground">
                            {!roleName.trim() && <span className="text-amber-600">Role name is required</span>}
                            {roleName.trim() && selectedPermissions.length === 0 && <span className="text-amber-600">Please select at least one permission</span>}
                            {roleName.trim() && selectedPermissions.length > 0 && (
                                <span>
                                    Ready to create role with {selectedPermissions.length} permission
                                    {selectedPermissions.length !== 1 ? "s" : ""}
                                    {selectedUsers.length > 0 ? ` and assign to ${selectedUsers.length} user${selectedUsers.length !== 1 ? "s" : ""}` : ""}
                                </span>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-muted-foreground">Completion: {calculateCompletion()}%</span>
                            <Progress value={calculateCompletion()} className="w-24 h-2" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
