"use client";
import { Shield, Route, Users, Key, UserCheck, Settings } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigation } from "@/components/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";

const RBACDashboard = () => {
    const { navigate } = useNavigation();

    const breadcrumbItems = [
        {
            title: "RBAC Management",
            href: "/rbac",
            icon: <Shield className="h-3.5 w-3.5" />,
        },
    ];

    const rbacModules = [
        {
            id: "routes",
            title: "API Routes",
            description: "Manage API endpoints and route configurations",
            icon: <Route className="h-8 w-8" />,
            color: "bg-blue-100 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400",
            path: "/rbac/routes",
            stats: { total: 45, active: 42 },
        },
        {
            id: "privilege-groups",
            title: "Privilege Groups",
            description: "Organize privileges into logical groups",
            icon: <Settings className="h-8 w-8" />,
            color: "bg-green-100 dark:bg-green-950/70 text-green-600 dark:text-green-400",
            path: "/rbac/privilege-groups",
            stats: { total: 8, active: 8 },
        },
        {
            id: "privileges",
            title: "Privileges",
            description: "Define specific permissions and access rights",
            icon: <Key className="h-8 w-8" />,
            color: "bg-purple-100 dark:bg-purple-950/70 text-purple-600 dark:text-purple-400",
            path: "/rbac/privileges",
            stats: { total: 24, active: 22 },
        },
        {
            id: "roles",
            title: "Roles",
            description: "Create and manage user roles with privileges",
            icon: <UserCheck className="h-8 w-8" />,
            color: "bg-orange-100 dark:bg-orange-950/70 text-orange-600 dark:text-orange-400",
            path: "/rbac/roles",
            stats: { total: 6, active: 5 },
        },
        {
            id: "users",
            title: "User Management",
            description: "Assign roles to users and manage permissions",
            icon: <Users className="h-8 w-8" />,
            color: "bg-red-100 dark:bg-red-950/70 text-red-600 dark:text-red-400",
            path: "/rbac/users",
            stats: { total: 156, active: 142 },
        },
    ];

    return (
        <div className="space-y-6">
            <Breadcrumb items={breadcrumbItems} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rbacModules.map((module) => (
                    <Card key={module.id} className="hover:shadow-lg transition-all duration-300 cursor-pointer group" onClick={() => navigate(module.path)}>
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <div className={`p-3 rounded-lg ${module.color}  group-hover:scale-110 transition-transform`}>{module.icon}</div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{module.stats.total}</div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">{module.stats.active} active</div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <CardTitle className="text-lg mb-2 group-hover:text-orange-600 transition-colors">{module.title}</CardTitle>
                            <CardDescription className="text-sm text-gray-600 dark:text-gray-400 mb-4">{module.description}</CardDescription>
                            <Button
                                variant="outline"
                                size="sm"
                                className="w-full dark:group-hover:bg-orange-900/70 group-hover:bg-orange-50 group-hover:border-orange-200 dark:group-hover:border-orange-600 group-hover:text-orange-600 dark:group-hover:text-orange-200 dark:border-gray-700"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(module.path);
                                }}
                            >
                                Manage {module.title}
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Quick Actions */}
            <Card>
                <CardHeader className="space-y-0">
                    <CardTitle className="flex items-center text-lg mb-0">Quick Actions</CardTitle>
                    <CardDescription className="text-sm text-gray-600 dark:text-gray-400">Common RBAC management tasks</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Button
                            variant="outline"
                            className="h-auto p-4 flex flex-col items-center space-y-2 w-full dark:hover:bg-orange-900/70 hover:bg-orange-50 hover:border-orange-200 dark:hover:border-orange-600 hover:text-orange-600 dark:hover:text-orange-200 dark:border-gray-700"
                            onClick={() => navigate("/rbac/roles/form/add")}
                        >
                            <UserCheck className="h-6 w-6" />
                            <span>Create Role</span>
                        </Button>
                        <Button
                            variant="outline"
                            className="h-auto p-4 flex flex-col items-center space-y-2 w-full dark:hover:bg-orange-900/70 hover:bg-orange-50 hover:border-orange-200 dark:hover:border-orange-600 hover:text-orange-600 dark:hover:text-orange-200 dark:border-gray-700"
                            onClick={() => navigate("/rbac/privileges/form/add")}
                        >
                            <Key className="h-6 w-6" />
                            <span>Add Privilege</span>
                        </Button>
                        <Button
                            variant="outline"
                            className="h-auto p-4 flex flex-col items-center space-y-2 w-full dark:hover:bg-orange-900/70 hover:bg-orange-50 hover:border-orange-200 dark:hover:border-orange-600 hover:text-orange-600 dark:hover:text-orange-200 dark:border-gray-700"
                            onClick={() => navigate("/rbac/routes/form/add")}
                        >
                            <Route className="h-6 w-6" />
                            <span>Register Route</span>
                        </Button>
                        <Button
                            variant="outline"
                            className="h-auto p-4 flex flex-col items-center space-y-2 w-full dark:hover:bg-orange-900/70 hover:bg-orange-50 hover:border-orange-200 dark:hover:border-orange-600 hover:text-orange-600 dark:hover:text-orange-200 dark:border-gray-700"
                            onClick={() => navigate("/rbac/users")}
                        >
                            <Users className="h-6 w-6" />
                            <span>Assign Roles</span>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default RBACDashboard;
