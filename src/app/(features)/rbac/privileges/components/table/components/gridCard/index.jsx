"use client";

import { useState, useEffect } from "react";
import { Key, Route, ChevronRight, Shield, Lock, Settings, X, Calendar, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigation } from "@/components/navigation";

export default function PrivilegeCard({ data, view }) {
    const { navigate } = useNavigation();
    const [showPopup, setShowPopup] = useState(false);
    const [privilegeData, setPrivilegeData] = useState({
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
            { id: "3", name: "Update User", method: "PUT", endPoint: "/users/:id" },
            { id: "4", name: "Delete User", method: "DELETE", endPoint: "/users/:id" },
        ],
        roles: [
            { id: "1", name: "Admin", description: "Full system access", isActive: true },
            { id: "2", name: "Manager", description: "Department management access", isActive: true },
            { id: "3", name: "User", description: "Basic user access", isActive: false },
        ],
        roleCount: 3,
        isActive: true,
        createdAt: "2024-01-15",
    });

    useEffect(() => {
        if (data) {
            setPrivilegeData((prevData) => ({ ...prevData, ...data }));
        }
    }, [data]);

    const handleCardClick = () => {
        // navigate(`/rbac/privileges/details/${privilegeData.id}`);
    };

    const handleNameClick = (e) => {
        e.stopPropagation();
        setShowPopup(true);
    };

    const DetailsPopup = () => (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowPopup(false)}>
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
                {/* Header with Gradient */}
                <div className="relative bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                <Key className="h-6 w-6" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold capitalize">{privilegeData.name}</h2>
                                <Badge className="mt-1 bg-white/20 text-white border-white/30 hover:bg-white/30">{privilegeData.privilegeGroup?.name}</Badge>
                            </div>
                        </div>
                        <button onClick={() => setShowPopup(false)} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                    {/* Description */}
                    <div className="mb-6">
                        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-2">Description</h3>
                        <p className="text-gray-600 text-sm dark:text-gray-400 leading-relaxed">{privilegeData.description || "No description provided"}</p>
                    </div>

                    {/* Associated Routes */}
                    <div className="mb-6">
                        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-3">Associated Routes</h3>
                        <div className="space-y-2 max-h-52 overflow-y-auto">
                            {privilegeData.routes?.map((route, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700">
                                    <div className="flex items-center space-x-3">
                                        <Route className="h-4 w-4 text-gray-500" />
                                        <div>
                                            <span className="text-sm font-medium text-gray-900 dark:text-white">{route.name}</span>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">{route.endPoint}</div>
                                        </div>
                                    </div>
                                    {/* <Badge className={`text-xs ${getMethodColor(route.method)}`}>{route.method}</Badge> */}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Associated Roles */}
                    <div className="mb-6">
                        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-3">Associated Roles</h3>
                        <div className="space-y-2 max-h-52 overflow-y-auto">
                            {privilegeData.roles?.map((role, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700">
                                    <div className="flex items-center space-x-3">
                                        <div className={`p-1.5 rounded-md ${role.isActive ? "bg-green-100 dark:bg-green-900/30" : "bg-gray-100 dark:bg-gray-800"}`}>
                                            <Shield className={`h-4 w-4 ${role.isActive ? "text-green-600 dark:text-green-400" : "text-gray-500"}`} />
                                        </div>
                                        <div>
                                            <span className="text-sm font-medium text-gray-900 dark:text-white">{role.name}</span>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">{role.description}</div>
                                        </div>
                                    </div>
                                    <Badge
                                        variant={role.isActive ? "default" : "secondary"}
                                        className={`text-xs ${
                                            role.isActive ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                                        }`}
                                    >
                                        {role.isActive ? "Active" : "Inactive"}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Meta Information */}
                    <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
                        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex items-center space-x-2">
                                <Calendar className="h-4 w-4" />
                                <span>Created {new Date(privilegeData.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => {
                                        setShowPopup(false);
                                        navigate(`/rbac/privileges/form/${privilegeData.id}`);
                                    }}
                                    className="px-3 py-1 text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-300 font-medium rounded-md hover:bg-orange-50 dark:hover:bg-orange-950/30 transition-all"
                                >
                                    Edit
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
                                <Key className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <h3
                                    className="hover:underline capitalize w-fit font-medium text-sm text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors truncate cursor-pointer"
                                    onClick={handleNameClick}
                                >
                                    {privilegeData.name}
                                </h3>
                                <div className="flex items-center space-x-1 mt-1">
                                    <Badge
                                        variant={privilegeData.isActive ? "default" : "secondary"}
                                        className={`text-xs ${
                                            privilegeData.isActive
                                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                                : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                                        }`}
                                    >
                                        {privilegeData.isActive ? "Active" : "Inactive"}
                                    </Badge>
                                    <Badge variant="outline" className="text-xs bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/30 dark:text-orange-400 dark:border-orange-800">
                                        {privilegeData.privilegeGroup?.name}
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="col-span-5 flex items-center">
                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2" title={privilegeData.description}>
                                {privilegeData.description || "No description provided"}
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="col-span-3 flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                                <Route className="h-3 w-3 text-orange-600 dark:text-orange-400" />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{privilegeData.routes?.length || 0}</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">Routes</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <Shield className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{privilegeData.roleCount}</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">Roles</span>
                            </div>
                        </div>

                        {/* Created Date */}
                        <div className="col-span-1 flex items-center justify-end">
                            <span className="text-xs text-gray-500 dark:text-gray-400">{new Date(privilegeData.createdAt).toLocaleDateString()}</span>
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
                    {/* Title and Group */}
                    <div className="mb-4">
                        <div className="flex items-start justify-between mb-2">
                            <h3
                                className="capitalize text-lg font-semibold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-200 line-clamp-1 hover:underline cursor-pointer"
                                onClick={handleNameClick}
                            >
                                {privilegeData.name}
                            </h3>
                            <Badge variant="outline" className="text-xs bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/30 dark:text-orange-400 dark:border-orange-800">
                                {privilegeData.privilegeGroup?.name}
                            </Badge>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed min-h-[40px]">{privilegeData.description || "No description provided"}</p>
                    </div>

                    {/* Routes Section */}
                    <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">Associated Routes</h4>
                            <Badge variant="secondary" className="text-xs">
                                {privilegeData.routes?.length || 0} routes
                            </Badge>
                        </div>
                        <div className="space-y-2 h-20 overflow-y-auto">
                            {privilegeData.routes?.slice(0, 2).map((route, index) => (
                                <div key={index} className="flex items-center justify-between p-2 rounded-md bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
                                    <div className="flex items-center space-x-2">
                                        <Route className="h-3 w-3 text-gray-500" />
                                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate">{route.name}</span>
                                    </div>
                                    {/* <Badge className={`text-xs px-2 py-0.5 ${getMethodColor(route.method)}`}>{route.method}</Badge> */}
                                </div>
                            ))}
                            {privilegeData.routes?.length > 2 && <div className="text-xs text-gray-500 dark:text-gray-400 text-center py-1">+{privilegeData.routes.length - 2} more routes</div>}
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="flex items-center space-x-2 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30">
                            <div className="p-1.5 rounded-md bg-blue-100 dark:bg-blue-900/40">
                                <Shield className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <div className="text-sm font-bold text-blue-700 dark:text-blue-300">{privilegeData.roleCount}</div>
                                <div className="text-xs text-blue-600 dark:text-blue-400">Roles</div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2 p-3 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900/30">
                            <div className="p-1.5 rounded-md bg-green-100 dark:bg-green-900/40">
                                <Lock className="h-3 w-3 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                                <div className="text-sm font-bold text-green-700 dark:text-green-300">{privilegeData.isActive ? "Active" : "Inactive"}</div>
                                <div className="text-xs text-green-600 dark:text-green-400">Status</div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                        <div className="flex items-center space-x-2">
                            <div className="text-xs text-gray-500 dark:text-gray-400">Created {new Date(privilegeData.createdAt).toLocaleDateString()}</div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/rbac/privileges/form/${privilegeData.id}`);
                                }}
                                className="text-xs text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-300 font-medium px-3 py-1 rounded-md hover:bg-orange-50 dark:hover:bg-orange-950/30 transition-all"
                            >
                                Edit
                            </button>
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
