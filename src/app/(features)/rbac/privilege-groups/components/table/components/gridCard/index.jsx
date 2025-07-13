"use client";

import { useState, useEffect } from "react";
import { Settings, Key, ChevronRight, Shield, X, Users, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigation } from "@/components/navigation";

export default function PrivilegeGroupCard({ data, view }) {
    const { navigate } = useNavigation();
    const [showPopup, setShowPopup] = useState(false);
    const [privilegeGroupData, setPrivilegeGroupData] = useState({
        id: "1",
        name: "User Management",
        description: "Permissions related to user account management, creation, editing, and deletion",
        createdAt: "2024-01-15",
        privileges: [
            { id: "p1", name: "Create User" },
            { id: "p2", name: "Edit User" },
            { id: "p3", name: "Delete User" },
            { id: "p4", name: "View User Details" },
        ],
        roles: [
            { id: "r1", name: "Admin" },
            { id: "r2", name: "Manager" },
            { id: "r3", name: "Supervisor" },
        ],
    });

    useEffect(() => {
        if (data) {
            setPrivilegeGroupData((prevData) => ({ ...prevData, ...data, isActive: data.status === "ACTIVE" }));
        }
    }, [data]);

    const handleCardClick = () => {
        navigate(`/rbac/privileges?filterBy[privilegeGroupId]=${privilegeGroupData.id}&onPrivilegeGroupClick=${privilegeGroupData.id}`);
    };
    const handleNameClick = (e) => {
        e.stopPropagation();
        setShowPopup(true);
    };

    const handlePrivilegeClick = (privilegeName) => {
        navigate(`/rbac/privileges/?searchText=${privilegeName}`);
        setShowPopup(false);
    };

    const handleRoleClick = (roleId) => {
        navigate(`/rbac/role/details/${roleId}`);
        setShowPopup(false);
    };

    const DetailsPopup = () => (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                {/* Header with gradient */}
                <div className="relative bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700 p-6 text-white">
                    <button onClick={() => setShowPopup(false)} className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
                        <X className="h-4 w-4" />
                    </button>
                    <h2 className="text-xl font-semibold mb-2 capitalize">{privilegeGroupData.name}</h2>
                    <p className="text-orange-100 text-sm">{privilegeGroupData.description}</p>
                    <div className="flex items-center space-x-4 mt-4">
                        <Badge className="bg-white/20 text-white border-white/30">{privilegeGroupData.isActive ? "Active" : "Inactive"}</Badge>
                        <span className="text-orange-100 text-sm">Created {new Date(privilegeGroupData.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 max-h-96 overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Privileges Section */}
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/40">
                                    <Key className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                                </div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">Privileges ({privilegeGroupData.privileges?.length})</h3>
                            </div>
                            <div className="space-y-2">
                                {privilegeGroupData.privileges?.map((privilege) => (
                                    <div
                                        key={privilege.id}
                                        onClick={() => handlePrivilegeClick(privilege.name)}
                                        className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-orange-50 dark:hover:bg-orange-900/20 cursor-pointer transition-colors group"
                                    >
                                        <span className="text-sm capitalize font-medium text-gray-700 dark:text-gray-300 group-hover:text-orange-600 dark:group-hover:text-orange-400">
                                            {privilege.name}
                                        </span>
                                        <ChevronRight className="h-3 w-3 text-gray-400 group-hover:text-orange-500" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Roles Section */}
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                                    <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">Roles ({privilegeGroupData.roles?.length})</h3>
                            </div>
                            <div className="space-y-2">
                                {privilegeGroupData.roles?.map((role) => (
                                    <div
                                        key={role.id}
                                        onClick={() => handleRoleClick(role.id)}
                                        className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer transition-colors group"
                                    >
                                        <span className="capitalize text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">{role.name}</span>
                                        <ChevronRight className="h-3 w-3 text-gray-400 group-hover:text-blue-500" />
                                    </div>
                                ))}
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
                                <Settings className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <h3
                                    className="hover:underline capitalize w-fit font-medium text-sm text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors truncate cursor-pointer"
                                    onClick={handleNameClick}
                                >
                                    {privilegeGroupData.name}
                                </h3>
                                <div className="flex items-center space-x-1 mt-1">
                                    <Badge
                                        variant={privilegeGroupData.isActive ? "default" : "secondary"}
                                        className={`text-xs ${
                                            privilegeGroupData.isActive
                                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                                : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                                        }`}
                                    >
                                        {privilegeGroupData.isActive ? "Active" : "Inactive"}
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="col-span-6 flex items-center">
                            <p className="text-sm text-gray-600 dark:text-gray-400" title={privilegeGroupData.description}>
                                {privilegeGroupData.description || "No description provided"}
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="col-span-2 flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                                <Key className="h-3 w-3 text-orange-600 dark:text-orange-400" />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{privilegeGroupData.privileges?.length}</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">Privileges</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <Shield className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{privilegeGroupData.roles?.length}</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">Roles</span>
                            </div>
                        </div>

                        {/* Created Date */}
                        <div className="col-span-1 flex items-center justify-end">
                            <span className="text-xs text-gray-500 dark:text-gray-400">{new Date(privilegeGroupData.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
                {showPopup && <DetailsPopup />}
            </>
        );
    }

    // Card Layout (default)
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
                                className="text-lg capitalize font-semibold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-200 line-clamp-1 hover:underline cursor-pointer"
                                onClick={handleNameClick}
                            >
                                {privilegeGroupData.name}
                            </h3>
                            <Badge
                                variant={privilegeGroupData.isActive ? "default" : "secondary"}
                                className={`text-xs ${
                                    privilegeGroupData.isActive
                                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                        : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                                }`}
                            >
                                {privilegeGroupData.isActive ? "Active" : "Inactive"}
                            </Badge>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed min-h-[69px]">{privilegeGroupData.description || "No description provided"}</p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center space-x-3 p-3 rounded-lg bg-orange-50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/30">
                            <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/40">
                                <Key className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                            </div>
                            <div>
                                <div className="text-lg font-bold text-orange-700 dark:text-orange-300">{privilegeGroupData.privileges?.length}</div>
                                <div className="text-xs text-orange-600 dark:text-orange-400">Privileges</div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30">
                            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                                <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <div className="text-lg font-bold text-blue-700 dark:text-blue-300">{privilegeGroupData.roles?.length}</div>
                                <div className="text-xs text-blue-600 dark:text-blue-400">Roles</div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                        <div className="flex items-center space-x-2">
                            <div className="text-xs text-gray-500 dark:text-gray-400">Created {new Date(privilegeGroupData.createdAt).toLocaleDateString()}</div>
                        </div>

                        <div className="flex items-center space-x-2">
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
