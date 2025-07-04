"use client";

import { memo, useState } from "react";
import { Route, Globe, X } from "lucide-react";
import { Select } from "@/components/ui/select";
import { FormSection } from "@/components/formSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const RoutesSection = memo(function RoutesSection({ handlers = {}, formData = {}, sectionRef, isActive }) {
    const { handleInputChange, addRoute, removeRoute } = handlers;
    const [routes, setRoutes] = useState([]);
    const availableRoutes = [
        { label: "GET /users - Get Users", value: "1", method: "GET", endPoint: "/users" },
        { label: "POST /users - Create User", value: "2", method: "POST", endPoint: "/users" },
        { label: "PUT /users/:id - Update User", value: "3", method: "PUT", endPoint: "/users/:id" },
        { label: "DELETE /users/:id - Delete User", value: "4", method: "DELETE", endPoint: "/users/:id" },
        { label: "GET /courses - Get Courses", value: "5", method: "GET", endPoint: "/courses" },
        { label: "POST /courses - Create Course", value: "6", method: "POST", endPoint: "/courses" },
        { label: "PUT /courses/:id - Update Course", value: "7", method: "PUT", endPoint: "/courses/:id" },
        { label: "DELETE /courses/:id - Delete Course", value: "8", method: "DELETE", endPoint: "/courses/:id" },
    ];

    const getMethodColor = (method) => {
        const colors = {
            GET: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
            POST: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
            PUT: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
            DELETE: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
            PATCH: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
        };
        return colors[method] || "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
    };

    const selectedRoutes = routes.filter((option) => formData.routes.includes(option)) || [];

    return (
        <FormSection
            id="routes"
            title="Associated Routes"
            icon={<Route className="h-5 w-5" />}
            description="Select the API routes that this privilege grants access to"
            sectionRef={sectionRef}
            isActive={isActive}
        >
            <div className="space-y-6">
                <Select
                    label="Add Routes"
                    labelIcon={<Globe className="h-3.5 w-3.5" />}
                    name="routes"
                    placeholder="Select routes to add"
                    value={formData.routes}
                    onChange={handleInputChange}
                    options={availableRoutes}
                    optionsUrl={{
                        url: "/route?responseType=dropdown",
                        customLabel: (data) => `${data.method} ${data.endPoint} ${" - "} ${data.name}`,
                        // onLoadData: setRoutes,
                    }}
                    isMulti
                    isSearchable
                    helperText="Choose which API routes this privilege should grant access to"
                />

                {selectedRoutes.length > 0 && (
                    <div className="space-y-3">
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Selected Routes</h4>
                        <div className="space-y-2">
                            {selectedRoutes.map((route, index) => (
                                <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                                    <div className="flex items-center space-x-3">
                                        <Route className="h-4 w-4 text-gray-500" />
                                        <div>
                                            <div className="flex items-center space-x-2">
                                                <Badge className={`text-xs ${getMethodColor(route.method)}`}>{route.method}</Badge>
                                                <span className="text-sm font-medium text-gray-900 dark:text-white">{route.endPoint}</span>
                                            </div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{route.name}</p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="sm" onClick={() => removeRoute(index)} className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30">
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="bg-orange-50 dark:bg-orange-950/10 rounded-lg p-4 border border-orange-100 dark:border-orange-900/20">
                    <p className="text-sm text-orange-700 dark:text-orange-400 flex items-center gap-2">
                        <Route className="h-4 w-4" />
                        <span>Routes define which API endpoints users with this privilege can access. Select all routes that should be available when this privilege is granted.</span>
                    </p>
                </div>
            </div>
        </FormSection>
    );
});
