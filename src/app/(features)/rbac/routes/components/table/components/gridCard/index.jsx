"use client";

import { useState, useEffect } from "react";
import { Route, Globe, Lock, Unlock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigation } from "@/components/navigation";
import GlobalUtils from "@/lib/utils";

export default function RouteCard({ data }) {
    const { navigate } = useNavigation();
    const [routeData, setRouteData] = useState({
        id: "1",
        name: "Get Users",
        basePath: "/api/v1",
        endPoint: "/users",
        method: "GET",
        description: "Retrieve all users from the system",
        isPublic: false,
        type: "API",
    });

    useEffect(() => {
        if (data) {
            setRouteData((prevData) => ({ ...prevData, ...data }));
        }
    }, [data]);

    const handleCardClick = () => {
        navigate(`/rbac/routes/details/${routeData.id}`);
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

    return (
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
                            <h3 className="font-semibold text-sm text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">{routeData.name}</h3>
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
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/rbac/routes/form/${routeData.id}`);
                        }}
                        className="text-xs text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-300 font-medium"
                    >
                        Edit Route
                    </button>
                </div>
            </div>
        </div>
    );
}
