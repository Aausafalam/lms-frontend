"use client";

import { useState, useEffect } from "react";
import { Route, Globe, Lock, Unlock, X, Calendar, User, Shield, Code, Info, Key, ChevronRight, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigation } from "@/components/navigation";
import GlobalUtils from "@/lib/utils";

export default function RouteCard({ data, view }) {
    const { navigate } = useNavigation();
    const [showPopup, setShowPopup] = useState(false);
    const [routeData, setRouteData] = useState({
        id: "1",
        name: "Get Users",
        basePath: "/api/v1",
        endPoint: "/users",
        method: "GET",
        description: "Retrieve all users from the system",
        isPublic: false,
        // type: "API",
        createdAt: "2024-01-15",
        updatedAt: "2024-01-20",
        // createdBy: "admin@example.com",
        // tags: ["users", "read-only"],
        // version: "v1.0",
        // responseFormat: "JSON",
        // authentication: "Bearer Token",
        // rateLimit: "100 req/min",
        permissions: [
            { id: "p1", name: "users.read" },
            { id: "p2", name: "users.list" },
            { id: "p3", name: "api.access" },
        ],
    });

    useEffect(() => {
        if (data) {
            setRouteData((prevData) => ({ ...prevData, ...data }));
        }
    }, [data]);

    const handleCardClick = () => {
        // navigate(`/rbac/routes/details/${routeData.id}`);
    };

    const handleNameClick = (e) => {
        e.stopPropagation();
        setShowPopup(true);
    };

    const handlePermissionClick = (permissionName) => {
        navigate(`/rbac/privileges?searchText=${permissionName}`);
        setShowPopup(false);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    const getMethodColor = (method) => {
        const colors = {
            GET: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
            POST: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
            PUT: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
            DELETE: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
            PATCH: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
        };
        return colors[method] || "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    };

    // Enhanced Popup Component
    const RouteDetailsPopup = () => (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="relative w-full max-w-4xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                {/* Gradient Header */}
                <div className="relative bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700 p-6 text-white">
                    <button onClick={closePopup} className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
                        <X className="h-4 w-4" />
                    </button>

                    <div className="flex items-start space-x-4">
                        <div className="p-3 rounded-xl bg-white/20">
                            <Route className="h-6 w-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h2 className="text-2xl font-bold mb-2">{routeData.name}</h2>
                            <div className="flex items-center space-x-3 mb-3">
                                <Badge className={`${getMethodColor(routeData.method)} border-white/30`}>{routeData.method}</Badge>
                                <Badge className="bg-white/20 text-white border-white/30">{routeData.type}</Badge>
                                <div className="flex items-center space-x-1">
                                    {routeData.isPublic ? <Unlock className="h-4 w-4 text-green-300" /> : <Lock className="h-4 w-4 text-red-300" />}
                                    <span className="text-orange-100 text-sm">{routeData.isPublic ? "Public" : "Protected"}</span>
                                </div>
                            </div>

                            {/* Route Path */}
                            <div className="font-mono text-sm bg-white/10 rounded-lg px-3 py-2 backdrop-blur-sm">
                                <span className="text-orange-200">{routeData.basePath}</span>
                                <span className="text-white font-semibold">{routeData.endPoint}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 max-h-[60vh] overflow-y-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column - Description & Details */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Description */}
                            <div>
                                <h3 className="flex items-center text-lg font-semibold text-gray-900 dark:text-white mb-3">
                                    <Info className="h-5 w-5 mr-2 text-orange-500" />
                                    Description
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 leading-relaxed">
                                    {routeData.description || "No description provided"}
                                </p>
                            </div>

                            {/* Security & Access */}
                            <div>
                                <h3 className="flex items-center text-lg font-semibold text-gray-900 dark:text-white mb-3">
                                    <Shield className="h-5 w-5 mr-2 text-orange-500" />
                                    Security & Access
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Access Type:</span>
                                                <div className="flex items-center space-x-2">
                                                    {routeData.isPublic ? <Unlock className="h-4 w-4 text-green-500" /> : <Lock className="h-4 w-4 text-red-500" />}
                                                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{routeData.isPublic ? "Public" : "Protected"}</span>
                                                </div>
                                            </div>
                                            {routeData.authentication && (
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Auth Type:</span>
                                                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{routeData.authentication}</span>
                                                </div>
                                            )}
                                            {routeData.rateLimit && (
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Rate Limit:</span>
                                                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{routeData.rateLimit}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                                        <div className="space-y-3">
                                            {routeData.version && (
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Version:</span>
                                                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{routeData.version}</span>
                                                </div>
                                            )}
                                            {routeData.responseFormat && (
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Response:</span>
                                                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{routeData.responseFormat}</span>
                                                </div>
                                            )}
                                            {routeData.createdBy && (
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Created By:</span>
                                                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{routeData.createdBy}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tags */}
                            {routeData.tags && routeData.tags.length > 0 && (
                                <div>
                                    <h3 className="flex items-center text-lg font-semibold text-gray-900 dark:text-white mb-3">
                                        <Code className="h-5 w-5 mr-2 text-orange-500" />
                                        Tags
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {routeData.tags.map((tag, index) => (
                                            <Badge key={index} variant="secondary" className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Column - Permissions & Timeline */}
                        <div className="space-y-6">
                            {/* Permissions */}
                            <div>
                                <div className="flex items-center space-x-2 mb-4">
                                    <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/40">
                                        <Key className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white">Permissions ({routeData.permissions?.length || 0})</h3>
                                </div>
                                <div className="space-y-2 max-h-48 overflow-y-auto">
                                    {routeData.permissions?.map((permission) => (
                                        <div
                                            key={permission.id}
                                            onClick={() => handlePermissionClick(permission.name)}
                                            className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-orange-50 dark:hover:bg-orange-900/20 cursor-pointer transition-colors group border border-transparent hover:border-orange-200 dark:hover:border-orange-800"
                                        >
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-orange-600 dark:group-hover:text-orange-400 font-mono">
                                                {permission.name}
                                            </span>
                                            <ChevronRight className="h-3 w-3 text-gray-400 group-hover:text-orange-500" />
                                        </div>
                                    ))}
                                    {(!routeData.permissions || routeData.permissions.length === 0) && (
                                        <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                                            <Key className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                            <p className="text-sm">No permissions assigned</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Timeline */}
                            <div>
                                <div className="flex items-center space-x-2 mb-4">
                                    <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                                        <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white">Timeline</h3>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 space-y-3">
                                    {routeData.createdAt && (
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Created:</span>
                                            <span className="text-sm font-semibold text-gray-900 dark:text-white">{new Date(routeData.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    )}
                                    {routeData.updatedAt && (
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Updated:</span>
                                            <span className="text-sm font-semibold text-gray-900 dark:text-white">{new Date(routeData.updatedAt).toLocaleDateString()}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                {/* <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
                    <button
                        onClick={() => {
                            closePopup();
                            handleCardClick();
                        }}
                        className="w-full px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                    >
                        <Eye className="h-4 w-4" />
                        <span>View Full Details</span>
                    </button>
                </div> */}
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
                        className={`grid grid-cols-12 gap-4 px-4 py-3 dark:hover:bg-gray-800/50 border-b group relative w-full overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-300 hover:shadow-lg dark:bg-gray-900 dark:hover:bg-gray-900 cursor-pointer border border-gray-200 dark:border-gray-800 hover:border-orange-300 dark:hover:border-orange-600`}
                        onClick={handleCardClick}
                    >
                        {/* Route Info */}
                        <div className="col-span-3 flex items-center space-x-3">
                            <div className="p-1.5 rounded-md bg-orange-100 dark:bg-orange-900/30 group-hover:bg-orange-200 dark:group-hover:bg-orange-900/50 transition-colors">
                                <Route className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <h3
                                    className="hover:underline w-fit font-medium text-sm text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors truncate cursor-pointer"
                                    onClick={handleNameClick}
                                >
                                    {routeData.name}
                                </h3>
                                <div className="flex items-center space-x-1 mt-1">
                                    <Badge className={GlobalUtils.cn("text-xs font-medium", getMethodColor(routeData.method))}>{routeData.method}</Badge>
                                    <Badge variant="outline" className="text-xs">
                                        {routeData.type}
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        {/* Route Path */}
                        <div className="col-span-4 flex items-center">
                            <div className="flex items-center space-x-1 text-sm font-mono bg-gray-50 dark:bg-gray-800/50 rounded-md px-2 py-1 w-fit min-w-0">
                                <Globe className="h-3 w-3 text-gray-500 flex-shrink-0" />
                                <span className="text-gray-600 dark:text-gray-400">{routeData.basePath}</span>
                                <span title={routeData.endPoint} className="text-gray-900 dark:text-white font-medium truncate">
                                    {routeData.endPoint}
                                </span>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="col-span-4 flex items-center">
                            <p className="text-sm text-gray-600 dark:text-gray-400 truncate" title={routeData.description}>
                                {routeData.description || "No description provided"}
                            </p>
                        </div>

                        {/* Access Status */}
                        <div className="col-span-1 flex items-center justify-center">
                            {routeData.isPublic ? <Unlock className="h-4 w-4 text-green-500" title="Public Route" /> : <Lock className="h-4 w-4 text-red-500" title="Protected Route" />}
                        </div>
                    </div>
                </div>
                {showPopup && <RouteDetailsPopup />}
            </>
        );
    }

    // Card Layout (Original)
    return (
        <>
            <div
                className="group relative w-full overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-300 hover:shadow-lg dark:bg-gray-900 dark:hover:bg-gray-900 cursor-pointer border border-gray-200 dark:border-gray-800 hover:border-orange-300 dark:hover:border-orange-600"
                onClick={handleCardClick}
            >
                <div className="p-4">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30 group-hover:bg-orange-200 dark:group-hover:bg-orange-900/50 transition-colors">
                                <Route className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                            </div>
                            <div>
                                <h3
                                    className="hover:underline w-fit font-semibold text-sm text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors cursor-pointer"
                                    onClick={handleNameClick}
                                >
                                    {routeData.name}
                                </h3>
                                <div className="flex items-center space-x-2 mt-1">
                                    <Badge className={GlobalUtils.cn("text-xs font-medium", getMethodColor(routeData.method))}>{routeData.method}</Badge>
                                    <Badge variant="outline" className="text-xs">
                                        {routeData.type}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            {routeData.isPublic ? <Unlock className="h-4 w-4 text-green-500" title="Public Route" /> : <Lock className="h-4 w-4 text-red-500" title="Protected Route" />}
                        </div>
                    </div>

                    {/* Route Path */}
                    <div className="mb-4">
                        <div title={routeData.endPoint} className="flex items-center space-x-1 text-sm font-mono bg-gray-50 dark:bg-gray-800/50 rounded-md px-3 py-2 line-clamp-1 text-nowrap">
                            <Globe className="h-4 w-4 text-gray-500" />
                            <span className="text-gray-600 dark:text-gray-400">{routeData.basePath}</span>
                            <span className="text-gray-900 dark:text-white font-medium">{routeData.endPoint}</span>
                        </div>
                    </div>

                    {/* Description */}
                    <p title={routeData.description} className="text-[0.83rem] text-gray-600 dark:text-gray-400 line-clamp-2 mb-4 min-h-10">
                        {routeData.description || "No description provided"}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                        <div className="flex items-center space-x-2">
                            <div className={GlobalUtils.cn("w-2 h-2 rounded-full", routeData.isPublic ? "bg-green-500" : "bg-red-500")} />
                            <span className="text-xs text-gray-500 dark:text-gray-400">{routeData.isPublic ? "Public Access" : "Protected"}</span>
                        </div>
                    </div>
                </div>
            </div>
            {showPopup && <RouteDetailsPopup />}
        </>
    );
}
