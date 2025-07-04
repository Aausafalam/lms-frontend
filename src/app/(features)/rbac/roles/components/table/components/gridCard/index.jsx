"use client";

import { useState, useEffect } from "react";
import { UserCheck, Key, Users, ChevronRight, Shield, Crown, X, Calendar, ChevronDown, ChevronUp, User, Mail, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigation } from "@/components/navigation";

export default function RoleCard({ data, view }) {
    const { navigate } = useNavigation();
    const [showPopup, setShowPopup] = useState(false);
    const [expandedGroups, setExpandedGroups] = useState({});
    const [roleData, setRoleData] = useState({
        id: "1",
        name: "Administrator",
        description: "Full system access with all administrative privileges and user management capabilities",
        privilegeGroups: [
            {
                id: "1",
                name: "User Management",
                privilegeCount: 4,
                privileges: [
                    { id: "1", name: "Create User", description: "Create new user accounts" },
                    { id: "2", name: "Edit User", description: "Modify user information" },
                    { id: "3", name: "Delete User", description: "Remove user accounts" },
                    { id: "4", name: "View Users", description: "Access user listings" },
                ],
            },
            {
                id: "2",
                name: "System Configuration",
                privilegeCount: 8,
                privileges: [
                    { id: "5", name: "System Settings", description: "Configure system parameters" },
                    { id: "6", name: "Database Management", description: "Manage database operations" },
                    { id: "7", name: "Security Settings", description: "Configure security policies" },
                    { id: "8", name: "Backup Management", description: "Handle system backups" },
                    { id: "9", name: "Log Management", description: "Access system logs" },
                    { id: "10", name: "API Configuration", description: "Configure API settings" },
                    { id: "11", name: "Integration Settings", description: "Manage third-party integrations" },
                    { id: "12", name: "Performance Monitoring", description: "Monitor system performance" },
                ],
            },
            {
                id: "3",
                name: "Content Administration",
                privilegeCount: 3,
                privileges: [
                    { id: "13", name: "Content Management", description: "Manage content across platform" },
                    { id: "14", name: "Media Management", description: "Handle media files and assets" },
                    { id: "15", name: "Template Management", description: "Manage content templates" },
                ],
            },
        ],
        users: [
            {
                id: "1",
                name: "John Smith",
                email: "john.smith@company.com",
                phone: "+1-555-0123",
                isActive: true,
                lastLogin: "2024-01-28",
            },
            {
                id: "2",
                name: "Sarah Johnson",
                email: "sarah.johnson@company.com",
                phone: "+1-555-0124",
                isActive: true,
                lastLogin: "2024-01-27",
            },
            {
                id: "3",
                name: "Mike Wilson",
                email: "mike.wilson@company.com",
                phone: "+1-555-0125",
                isActive: false,
                lastLogin: "2024-01-20",
            },
        ],
        isActive: true,
        createdAt: "2024-01-10",
    });

    useEffect(() => {
        if (data) {
            setRoleData((prevData) => ({ ...prevData, ...data }));
        }
    }, [data]);

    const handleCardClick = () => {
        navigate(`/rbac/roles/details/${roleData.id}`);
    };

    const handleNameClick = (e) => {
        e.stopPropagation();
        setShowPopup(true);
    };

    const toggleGroup = (groupId) => {
        setExpandedGroups((prev) => ({
            ...prev,
            [groupId]: !prev[groupId],
        }));
    };

    const getRoleIcon = (roleName, tableView) => {
        const name = roleName.toLowerCase();
        if (name.includes("admin")) return <Crown className={` ${tableView ? "h-4 w-4 text-orange-600 dark:text-orange-400" : "w-5 h-5"}`} />;
        if (name.includes("manager")) return <Shield className={` ${tableView ? "h-4 w-4 text-orange-600 dark:text-orange-400" : "w-5 h-5"}`} />;
        return <UserCheck className={` ${tableView ? "h-4 w-4 text-orange-600 dark:text-orange-400" : "w-5 h-5"}`} />;
    };

    const getRoleColor = (roleName) => {
        const name = roleName.toLowerCase();
        if (name.includes("admin")) return "from-red-500 via-red-600 to-red-700";
        if (name.includes("manager")) return "from-blue-500 via-blue-600 to-blue-700";
        return "from-orange-500 via-orange-600 to-orange-700";
    };

    const DetailsPopup = () => (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowPopup(false)}>
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
                {/* Header with Gradient */}
                <div className={`relative bg-gradient-to-r ${getRoleColor(roleData.name)} p-6 text-white`}>
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm border border-white/30">{getRoleIcon(roleData.name)}</div>
                            <div>
                                <h2 className="text-xl capitalize font-semibold">{roleData.name}</h2>
                                <Badge className={`mt-1 bg-white/20 text-white border-white/30 hover:bg-white/30`}>{roleData.isActive ? "Active Role" : "Inactive Role"}</Badge>
                            </div>
                        </div>
                        <button onClick={() => setShowPopup(false)} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-150px)]">
                    {/* Description */}
                    <div className="mb-6">
                        <h3 className="text-[0.8rem] font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-2">Description</h3>
                        <p className="text-gray-600 text-sm dark:text-gray-400 leading-relaxed">{roleData.description || "No description provided"}</p>
                    </div>

                    {/* Stats Grid */}
                    {/* <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="bg-orange-50 dark:bg-orange-950/20 p-4 pb-3 rounded-xl border border-orange-100 dark:border-orange-900/30">
                            <div className="flex items-center space-x-2 mb-1">
                                <Shield className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                                <span className="text-sm font-medium text-orange-700 dark:text-orange-300">Groups</span>
                            </div>
                            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{roleData.privilegeGroups?.length || 0}</div>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 pb-3 rounded-xl border border-blue-100 dark:border-blue-900/30">
                            <div className="flex items-center space-x-2 mb-1">
                                <Key className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Privileges</span>
                            </div>
                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{roleData.privilegeCount}</div>
                        </div>
                        <div className="bg-green-50 dark:bg-green-950/20 p-4 pb-3 rounded-xl border border-green-100 dark:border-green-900/30">
                            <div className="flex items-center space-x-2 mb-1">
                                <Users className="h-4 w-4 text-green-600 dark:text-green-400" />
                                <span className="text-sm font-medium text-green-700 dark:text-green-300">Users</span>
                            </div>
                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{roleData.userCount}</div>
                        </div>
                    </div> */}

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Privilege Groups and Privileges */}
                        <div>
                            <h3 className="text-[0.8rem] font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-3">Privilege Groups & Privileges</h3>
                            <div className="space-y-3 max-h-96 overflow-y-auto">
                                {roleData.privilegeGroups?.map((group) => (
                                    <div key={group.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                                        {/* Group Header */}
                                        <div
                                            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                            onClick={() => toggleGroup(group.id)}
                                        >
                                            <div className="flex items-center space-x-2">
                                                <Shield className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                                                <span className="text-sm font-medium text-gray-900 dark:text-white">{group.name}</span>
                                                <Badge variant="secondary" className="text-xs">
                                                    {group.privileges?.length || 0} privileges
                                                </Badge>
                                            </div>
                                            {expandedGroups[group.id] ? <ChevronUp className="h-4 w-4 text-gray-500" /> : <ChevronDown className="h-4 w-4 text-gray-500" />}
                                        </div>

                                        {/* Privileges List */}
                                        {expandedGroups[group.id] && (
                                            <div className="p-3 space-y-2 bg-white dark:bg-gray-900">
                                                {group.privileges?.map((privilege) => (
                                                    <div key={privilege.id} className="flex items-start space-x-2 p-2 rounded-md bg-gray-50 dark:bg-gray-800/50">
                                                        <Key className="h-3 w-3 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                                                        <div className="min-w-0 flex-1">
                                                            <div className="text-sm font-medium text-gray-900 dark:text-white">{privilege.name}</div>
                                                            <div className="text-xs text-gray-500 dark:text-gray-400">{privilege.description}</div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Users List */}
                        <div>
                            <h3 className="text-[0.8rem]  font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-3">Assigned Users</h3>
                            <div className="space-y-3 max-h-80 overflow-y-auto">
                                {roleData.users?.map((user) => (
                                    <div key={user.id} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center space-x-3">
                                                <div className={`p-2 rounded-lg ${user.isActive ? "bg-green-100 dark:bg-green-900/30" : "bg-gray-100 dark:bg-gray-800"}`}>
                                                    <User className={`h-4 w-4 ${user.isActive ? "text-green-600 dark:text-green-400" : "text-gray-500"}`} />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <div className="font-medium text-gray-900 dark:text-white">{user.name}</div>
                                                    <div className="flex items-center space-x-2 mt-1">
                                                        <div className="flex items-center space-x-1">
                                                            <Mail className="h-3 w-3 text-gray-400" />
                                                            <span className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center space-x-1 mt-1">
                                                        <Phone className="h-3 w-3 text-gray-400" />
                                                        <span className="text-xs text-gray-500 dark:text-gray-400">{user.phone}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <Badge
                                                    variant={user.isActive ? "default" : "secondary"}
                                                    className={`text-xs mb-1 ${
                                                        user.isActive
                                                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                                            : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                                                    }`}
                                                >
                                                    {user.isActive ? "Active" : "Inactive"}
                                                </Badge>
                                                <div className="text-xs text-gray-500 dark:text-gray-400">Last login: {new Date(user.lastLogin).toLocaleDateString()}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Meta Information */}
                    <div className="border-t border-gray-100 dark:border-gray-700 pt-4 mt-6">
                        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex items-center space-x-2">
                                <Calendar className="h-4 w-4" />
                                <span>Created {new Date(roleData.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => {
                                        setShowPopup(false);
                                        navigate(`/rbac/roles/form/${roleData.id}`);
                                    }}
                                    className="px-3 py-1 text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-300 font-medium rounded-md hover:bg-orange-50 dark:hover:bg-orange-950/30 transition-all"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => {
                                        setShowPopup(false);
                                        handleCardClick();
                                    }}
                                    className="px-3 py-1 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-colors"
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    // Table Row Layout
    if (view?.table) {
        return (
            <>
                <div className="w-full">
                    {/* Table Row */}
                    <div
                        className="grid grid-cols-12 gap-4 px-4 py-3 dark:hover:bg-gray-800/50 border-b group relative w-full overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-300 hover:shadow-lg dark:bg-gray-900 dark:hover:bg-gray-900 cursor-pointer border border-gray-200 dark:border-gray-800 hover:border-orange-300 dark:hover:border-orange-600"
                        onClick={handleCardClick}
                    >
                        {/* Name and Status */}
                        <div className="col-span-3 flex items-center space-x-3">
                            <div className="p-1.5 rounded-md bg-orange-100 dark:bg-orange-900/30 group-hover:bg-orange-200 dark:group-hover:bg-orange-900/50 transition-colors">
                                {getRoleIcon(roleData.name, true)}
                            </div>
                            <div className="min-w-0 flex-1">
                                <h3
                                    className="capitalize hover:underline w-fit font-medium text-sm text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors truncate cursor-pointer"
                                    onClick={handleNameClick}
                                >
                                    {roleData.name}
                                </h3>
                                <div className="flex items-center space-x-1 mt-1">
                                    <Badge
                                        variant={roleData.isActive ? "default" : "secondary"}
                                        className={`text-xs ${
                                            roleData.isActive ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                                        }`}
                                    >
                                        {roleData.isActive ? "Active" : "Inactive"}
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="col-span-5 flex items-center">
                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2" title={roleData.description}>
                                {roleData.description || "No description provided"}
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="col-span-3 flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                                <Key className="h-3 w-3 text-orange-600 dark:text-orange-400" />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{roleData.rolePrivileges?.length || 0}</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">Privileges</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <Users className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{roleData.users?.length}</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">Users</span>
                            </div>
                        </div>

                        {/* Created Date */}
                        <div className="col-span-1 flex items-center justify-end">
                            <span className="text-xs text-gray-500 dark:text-gray-400">{new Date(roleData.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
                {showPopup && <DetailsPopup />}
            </>
        );
    }

    // Card Layout (Default)
    return (
        <>
            <div
                className="group relative w-full overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:shadow-xl dark:bg-gray-900 dark:hover:bg-gray-900 cursor-pointer border border-gray-200 dark:border-gray-800 hover:border-orange-300 dark:hover:border-orange-500"
                onClick={handleCardClick}
            >
                {/* Card Content */}
                <div className="relative p-6">
                    {/* Title and Status */}
                    <div className="mb-4">
                        <div className="flex items-start justify-between mb-2">
                            <h3
                                className="capitalize text-lg font-bold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-200 line-clamp-1 hover:underline cursor-pointer"
                                onClick={handleNameClick}
                            >
                                {roleData.name}
                            </h3>
                            <Badge
                                variant={roleData.isActive ? "default" : "secondary"}
                                className={`text-xs ${
                                    roleData.isActive ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                                }`}
                            >
                                {roleData.isActive ? "Active" : "Inactive"}
                            </Badge>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed min-h-[40px]">{roleData.description || "No description provided"}</p>
                    </div>

                    {/* Privilege Groups Preview */}
                    <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">Privilege Groups</h4>
                            <Badge variant="secondary" className="text-xs">
                                {roleData.privilegeGroups?.length || 0} groups
                            </Badge>
                        </div>
                        <div className="space-y-1 h-20 overflow-y-auto">
                            {roleData.privilegeGroups?.slice(0, 2).map((group, index) => (
                                <div key={index} className="flex items-center justify-between p-2 rounded-md bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
                                    <div className="flex items-center space-x-2">
                                        <Key className="h-3 w-3 text-gray-500" />
                                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate">{group.name}</span>
                                    </div>
                                    <Badge variant="outline" className="text-xs">
                                        {group.rolePrivileges?.length || 0}
                                    </Badge>
                                </div>
                            ))}
                            {roleData.privilegeGroups?.length > 2 && (
                                <div className="text-xs text-gray-500 dark:text-gray-400 text-center py-1">+{roleData.privilegeGroups.length - 2} more groups</div>
                            )}
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="flex items-center space-x-2 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30">
                            <div className="p-1.5 rounded-md bg-blue-100 dark:bg-blue-900/40">
                                <Key className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <div className="text-sm font-bold text-blue-700 dark:text-blue-300">{roleData.rolePrivileges?.length || 0}</div>
                                <div className="text-xs text-blue-600 dark:text-blue-400">Privileges</div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2 p-3 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900/30">
                            <div className="p-1.5 rounded-md bg-green-100 dark:bg-green-900/40">
                                <Users className="h-3 w-3 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                                <div className="text-sm font-bold text-green-700 dark:text-green-300">{roleData.users?.length}</div>
                                <div className="text-xs text-green-600 dark:text-green-400">Users</div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                        <div className="flex items-center space-x-2">
                            <div className="text-xs text-gray-500 dark:text-gray-400">Created {new Date(roleData.createdAt).toLocaleDateString()}</div>
                        </div>

                        <div className="flex items-center space-x-2">
                            {/* <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/rbac/roles/form/${roleData.id}`);
                                }}
                                className="text-xs text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-300 font-medium px-3 py-1 rounded-md hover:bg-orange-50 dark:hover:bg-orange-950/30 transition-all"
                            >
                                Edit
                            </button> */}
                            <div className="flex items-center justify-center rounded-full h-8 w-8 bg-orange-500 text-white transition-all duration-300 hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/20 group-hover:scale-110">
                                <ChevronRight className="h-4 w-4" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hover overlay */}
                {/* <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div> */}
            </div>
            {showPopup && <DetailsPopup />}
        </>
    );
}
