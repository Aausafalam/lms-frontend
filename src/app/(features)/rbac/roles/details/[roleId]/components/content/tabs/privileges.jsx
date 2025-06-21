"use client";

import { Key, Route, ChevronDown, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";

export function PrivilegesTab({ roleData }) {
    const [expandedGroups, setExpandedGroups] = useState(new Set(["1"]));

    const toggleGroup = (groupId) => {
        const newExpanded = new Set(expandedGroups);
        if (newExpanded.has(groupId)) {
            newExpanded.delete(groupId);
        } else {
            newExpanded.add(groupId);
        }
        setExpandedGroups(newExpanded);
    };

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

    return (
        <div className=" space-y-6">
            {/* Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardContent className="p-4">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{roleData.privilegeCount}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Total Privileges</div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{roleData.privilegeGroups.length}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Privilege Groups</div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{roleData.privilegeGroups.reduce((acc, group) => acc + group.privileges.length, 0)}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Total Routes</div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Privileges by Group */}
            <div className="space-y-4">
                {roleData.privilegeGroups.map((group) => (
                    <Card key={group.id}>
                        <Collapsible open={expandedGroups.has(group.id)} onOpenChange={() => toggleGroup(group.id)}>
                            <CollapsibleTrigger asChild>
                                <CardHeader className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                    <CardTitle className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <Key className="h-5 w-5 mr-2 text-orange-500" />
                                            {group.name}
                                            <Badge variant="outline" className="ml-2 text-xs">
                                                {group.privileges.length} privileges
                                            </Badge>
                                        </div>
                                        {expandedGroups.has(group.id) ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                                    </CardTitle>
                                </CardHeader>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <CardContent className="pt-0">
                                    <div className="space-y-4">
                                        {group.privileges.map((privilege) => (
                                            <div key={privilege.id} className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                                                <div className="flex items-start justify-between mb-3">
                                                    <div>
                                                        <h4 className="font-medium text-gray-900 dark:text-white mb-1">{privilege.name}</h4>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">{privilege.description}</p>
                                                    </div>
                                                    <Badge
                                                        variant={privilege.isActive ? "default" : "secondary"}
                                                        className={`text-xs ${
                                                            privilege.isActive
                                                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                                                : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                                                        }`}
                                                    >
                                                        {privilege.isActive ? "Active" : "Inactive"}
                                                    </Badge>
                                                </div>

                                                {/* Associated Routes */}
                                                {privilege.routes && privilege.routes.length > 0 && (
                                                    <div>
                                                        <h5 className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-2">
                                                            Associated Routes ({privilege.routes.length})
                                                        </h5>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                            {privilege.routes.map((route, index) => (
                                                                <div
                                                                    key={index}
                                                                    className="flex items-center justify-between p-2 rounded-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700"
                                                                >
                                                                    <div className="flex items-center space-x-2">
                                                                        <Route className="h-3 w-3 text-gray-500" />
                                                                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate">{route.endPoint}</span>
                                                                    </div>
                                                                    <Badge className={`text-xs px-2 py-0.5 ${getMethodColor(route.method)}`}>{route.method}</Badge>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </CollapsibleContent>
                        </Collapsible>
                    </Card>
                ))}
            </div>
        </div>
    );
}
