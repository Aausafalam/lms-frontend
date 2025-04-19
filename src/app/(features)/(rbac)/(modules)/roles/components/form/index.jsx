"use client";

import React, { useMemo } from "react";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, AlertCircle, CheckCircle, X, ChevronRight, SparklesIcon, Shield, User, Layers2 } from "lucide-react";
import Tabs from "@/components/tab";
import GeneralInformation from "./components/generalInformationForm";
import GeneralRoleInformation from "./components/generalInformationForm";
import PermissionForm from "./components/permissionsForm";
import UsersTable from "../../../users/components/table";
import AssignUsersForm from "./components/assignUsersForm";

// Components
export const Button = ({ children, type = "button", variant = "primary", size = "md", className = "", disabled = false, onClick }) => {
    const baseStyles =
        "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-purple-500 disabled:opacity-50 disabled:pointer-events-none";

    const variantStyles = {
        primary: "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow",
        secondary: "bg-purple-100 text-purple-900 hover:bg-purple-200",
        outline: "border border-gray-300 bg-white hover:bg-gray-50 text-gray-700",
        ghost: "hover:bg-gray-100 text-gray-700",
        link: "text-purple-600 hover:underline p-0 h-auto",
    };

    const sizeStyles = {
        sm: "text-xs px-3 h-8 rounded-md",
        md: "text-sm px-4 h-10 rounded-md",
        lg: "text-base px-6 h-12 rounded-md",
        icon: "h-9 w-9 rounded-md",
    };

    return (
        <button type={type} className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`} disabled={disabled} onClick={onClick}>
            {children}
        </button>
    );
};

export const Input = ({ id, value, onChange, placeholder, className = "", type = "text", required = false }) => {
    return (
        <input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${className}`}
        />
    );
};

export const Textarea = ({ id, value, onChange, placeholder, rows = 3, className = "" }) => {
    return (
        <textarea
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none ${className}`}
        />
    );
};

export const Checkbox = ({ checked, onCheckedChange, className = "" }) => {
    return (
        <div
            className={`flex h-5 w-5 items-center justify-center rounded border border-gray-300 ${checked ? "bg-purple-600 border-purple-600" : "bg-white"} ${className}`}
            onClick={(e) => {
                e.stopPropagation();
                onCheckedChange();
            }}
        >
            {checked && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 1L3.5 6.5L1 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )}
        </div>
    );
};

export const Badge = ({ children, variant = "default", className = "" }) => {
    const variantStyles = {
        default: "bg-purple-100 text-purple-800",
        outline: "bg-white border border-gray-300 text-gray-700",
        secondary: "bg-gray-100 text-gray-800",
    };

    return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantStyles[variant]} ${className}`}>{children}</span>;
};

export const Avatar = ({ src, alt, fallback, className = "" }) => {
    const [imgError, setImgError] = useState(false);

    return (
        <div className={`relative inline-block rounded-full overflow-hidden bg-gray-100 ${className}`}>
            {!imgError && src ? (
                <img src={src || "/placeholder.svg"} alt={alt} className="h-full w-full object-cover" onError={() => setImgError(true)} />
            ) : (
                <div className="flex h-full w-full items-center justify-center bg-purple-100 text-purple-800 font-medium">{fallback}</div>
            )}
        </div>
    );
};

export const Progress = ({ value = 0, className = "" }) => {
    return (
        <div className={`h-2 w-full bg-gray-200 rounded-full overflow-hidden ${className}`}>
            <div className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-300 ease-in-out" style={{ width: `${value}%` }} />
        </div>
    );
};

export const Alert = ({ children, variant = "default", className = "" }) => {
    const variantStyles = {
        default: "bg-blue-50 border-blue-200 text-blue-800",
        destructive: "bg-red-50 border-red-200 text-red-800",
        success: "bg-green-50 border-green-200 text-green-800",
    };

    return <div className={`flex p-4 border rounded-md ${variantStyles[variant]} ${className}`}>{children}</div>;
};

export const Card = ({ children, className = "" }) => {
    return <div className={`bg-white rounded-xl shadow-xl overflow-hidden ${className}`}>{children}</div>;
};

// Generate mock data

export default function AddRolePage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [activeTab, setActiveTab] = useState({ id: "general", label: "General Information" });
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

    // Users tab state
    const [selectedUsers, setSelectedUsers] = useState({});
    const [users, setUsers] = useState([]);
    const [userSearchQuery, setUserSearchQuery] = useState("");
    const [isLoadingUsers, setIsLoadingUsers] = useState(false);

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

    // Load users when tab changes to users
    useEffect(() => {
        if (activeTab === "users") {
            fetchUsers();
        }
    }, [activeTab, fetchUsers]);

    // Filter users based on search query
    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
            user.department.toLowerCase().includes(userSearchQuery.toLowerCase())
    );

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
            <div className="fixed top-4 right-4 z-50 max-w-md transform transition-all duration-300 ease-in-out">
                <Alert variant={notification.type === "success" ? "success" : "destructive"} className="shadow-lg">
                    <div className="flex items-center">
                        {notification.type === "success" ? <CheckCircle className="h-5 w-5 mr-2" /> : <AlertCircle className="h-5 w-5 mr-2" />}
                        <div className="ml-2">{notification.message}</div>
                        <button className="ml-auto text-gray-500 hover:text-gray-700" onClick={() => setNotification((prev) => ({ ...prev, show: false }))}>
                            <X className="h-4 w-4" />
                            <span className="sr-only">Close</span>
                        </button>
                    </div>
                </Alert>
            </div>
        );
    };

    // Render Users Tab Content
    const UsersTabContent = ({ userSearchQuery, setUserSearchQuery }) => (
        <div className="p-6 md:p-8">
            <div className="space-y-6">
                {/* Search and stats */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
                    <div className="relative flex-1 max-w-md">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-gray-400" />
                        </div>
                        <Input id="search-users" type="text" placeholder="Search users..." value={userSearchQuery} onChange={(e) => setUserSearchQuery(e.target.value)} className="pl-10" />
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span className="font-medium">
                            {selectedUsers.length} of {filteredUsers.length} selected
                        </span>
                    </div>
                </div>

                {/* Bulk actions */}
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-800">Assign Users to Role</h3>
                    <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={handleSelectAllUsers}>
                            {filteredUsers.length > 0 && filteredUsers.every((user) => selectedUsers.includes(user.id)) ? "Deselect All" : "Select All"}
                        </Button>
                    </div>
                </div>

                {/* Users list */}
                <div className="bg-white rounded-lg border overflow-hidden">
                    <div className="max-h-[475px] overflow-y-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50 sticky top-0">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        <Checkbox checked={filteredUsers.length > 0 && filteredUsers.every((user) => selectedUsers.includes(user.id))} onCheckedChange={handleSelectAllUsers} />
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        User
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Department
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {isLoadingUsers
                                    ? Array.from({ length: 5 }).map((_, index) => (
                                          <tr key={index}>
                                              <td className="px-6 py-4 whitespace-nowrap">
                                                  <div className="h-4 w-4 bg-gray-200 animate-pulse rounded" />
                                              </td>
                                              <td className="px-6 py-4 whitespace-nowrap">
                                                  <div className="flex items-center">
                                                      <div className="h-10 w-10 bg-gray-200 animate-pulse rounded-full" />
                                                      <div className="ml-4 space-y-2">
                                                          <div className="h-4 w-32 bg-gray-200 animate-pulse rounded" />
                                                          <div className="h-3 w-40 bg-gray-200 animate-pulse rounded" />
                                                      </div>
                                                  </div>
                                              </td>
                                              <td className="px-6 py-4 whitespace-nowrap">
                                                  <div className="h-5 w-20 bg-gray-200 animate-pulse rounded" />
                                              </td>
                                          </tr>
                                      ))
                                    : filteredUsers.map((user) => (
                                          <tr
                                              key={user.id}
                                              className={`${selectedUsers.includes(user.id) ? "bg-purple-50" : "hover:bg-gray-50"} cursor-pointer`}
                                              onClick={() => handleUserChange(user.id)}
                                          >
                                              <td className="px-6 py-4 whitespace-nowrap">
                                                  <Checkbox checked={selectedUsers.includes(user.id)} onCheckedChange={() => handleUserChange(user.id)} />
                                              </td>
                                              <td className="px-6 py-4 whitespace-nowrap">
                                                  <div className="flex items-center">
                                                      <Avatar src="/profileIcon.webp" alt={user.name} fallback={user.name.charAt(0)} className="h-10 w-10" />
                                                      <div className="ml-4">
                                                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                          <div className="text-sm text-gray-500">{user.email}</div>
                                                      </div>
                                                  </div>
                                              </td>
                                              <td className="px-6 py-4 whitespace-nowrap">
                                                  <Badge variant="outline">{user.department}</Badge>
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
                        <div className="mx-auto h-12 w-12 text-gray-400">
                            <Search className="h-12 w-12" />
                        </div>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
                        <p className="mt-1 text-sm text-gray-500">Try adjusting your search terms.</p>
                    </div>
                )}
            </div>

            <div className="mt-8 flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
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
        </div>
    );

    const [formValues, setFormValues] = useState({});

    const onChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const setQueryParam = (key, value) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        router.replace(`?${params.toString()}`);
    };

    // Navigate to next tab
    const handleNextTab = (response) => {
        if (activeTab.id === "general") {
            setQueryParam("roleId", response.data.id);
            setFormValues((prev) => ({ ...prev, ...response.data }));
            setActiveTab({ id: "permissions", label: "Permissions" });
        } else if (activeTab.id === "permissions") {
            if (selectedPermissions.length === 0) {
                showNotification("error", "Please select at least one permission");
                return;
            }
            setActiveTab({ id: "users", label: "Assign Users" });
        }
    };
    console.log("activeTab", activeTab);
    const tabs = [
        {
            id: "general",
            label: "General Information",
            icon: <SparklesIcon className="size-4" />,
            content: <GeneralRoleInformation onChange={onChange} formValues={formValues} handleNextTab={handleNextTab} />,
        },
        {
            id: "permissions",
            label: "Permissions",
            icon: <Layers2 className="size-4" />,
            content: <PermissionForm selectedPermissions={selectedPermissions} setSelectedPermissions={setSelectedPermissions} handleNextTab={handleNextTab} />,
        },
        {
            id: "users",
            label: "Assign Users",
            icon: <User className="size-4" />,
            content: <AssignUsersForm selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />,
        },
    ];

    return (
        <div className="">
            {/* Notification */}
            <NotificationComponent />

            <Card className="mx-auto border-0 w-full">
                <div>
                    <Tabs defaultTab={activeTab} tabs={tabs} variant={"underline"} onTabChange={(tab) => setActiveTab(tab)} />
                </div>
            </Card>
        </div>
    );
}
