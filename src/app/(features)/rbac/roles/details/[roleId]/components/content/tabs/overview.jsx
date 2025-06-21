"use client";

import { Calendar, Key, Users, Shield, CheckCircle, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function OverviewTab({ roleData }) {
    return (
        <div className=" space-y-6 ">
            {/* General Information */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <Shield className="h-5 w-5 mr-2 text-orange-500" />
                        General Information
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Role Name</label>
                            <p className="text-sm text-gray-900 dark:text-white mt-1">{roleData.name}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                            <div className="mt-1">
                                <Badge
                                    variant={roleData.isActive ? "default" : "secondary"}
                                    className={`text-xs ${
                                        roleData.isActive ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                                    }`}
                                >
                                    {roleData.isActive ? <CheckCircle className="h-3 w-3 mr-1" /> : <XCircle className="h-3 w-3 mr-1" />}
                                    {roleData.isActive ? "Active" : "Inactive"}
                                </Badge>
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Created Date</label>
                            <p className="text-sm text-gray-900 dark:text-white mt-1 flex items-center">
                                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                                {new Date(roleData.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Last Updated</label>
                            <p className="text-sm text-gray-900 dark:text-white mt-1 flex items-center">
                                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                                {new Date(roleData.updatedAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                        <p className="text-sm text-gray-900 dark:text-white mt-1 leading-relaxed">{roleData.description}</p>
                    </div>
                </CardContent>
            </Card>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Privileges</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{roleData.privilegeCount}</p>
                            </div>
                            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30">
                                <Key className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Assigned Users</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{roleData.userCount}</p>
                            </div>
                            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30">
                                <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Privilege Groups</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{roleData.privilegeGroups.length}</p>
                            </div>
                            <div className="p-3 rounded-full bg-orange-100 dark:bg-orange-900/30">
                                <Shield className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Privilege Groups Overview */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <Shield className="h-5 w-5 mr-2 text-orange-500" />
                        Privilege Groups Overview
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {roleData.privilegeGroups.map((group) => (
                            <div key={group.id} className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-medium text-gray-900 dark:text-white">{group.name}</h4>
                                    <Badge variant="outline" className="text-xs">
                                        {group.privilegeCount} privileges
                                    </Badge>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{group.description}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
