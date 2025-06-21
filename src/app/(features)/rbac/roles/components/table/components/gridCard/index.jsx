"use client";

import { useState, useEffect } from "react";
import { UserCheck, Key, Users, ChevronRight, Shield, Crown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigation } from "@/components/navigation";

export default function RoleCard({ data }) {
    const { navigate } = useNavigation();
    const [roleData, setRoleData] = useState({
        id: "1",
        name: "Administrator",
        description: "Full system access with all administrative privileges and user management capabilities",
        privilegeCount: 15,
        userCount: 3,
        privilegeGroups: [
            { id: "1", name: "User Management", privilegeCount: 4 },
            { id: "2", name: "System Configuration", privilegeCount: 8 },
            { id: "3", name: "Content Administration", privilegeCount: 3 },
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

    const getRoleIcon = (roleName) => {
        const name = roleName.toLowerCase();
        if (name.includes("admin")) return <Crown className="h-5 w-5 text-white" />;
        if (name.includes("manager")) return <Shield className="h-5 w-5 text-white" />;
        return <UserCheck className="h-5 w-5 text-white" />;
    };

    const getRoleColor = (roleName) => {
        const name = roleName.toLowerCase();
        if (name.includes("admin")) return "from-red-500 via-red-600 to-red-700";
        if (name.includes("manager")) return "from-blue-500 via-blue-600 to-blue-700";
        return "from-orange-500 via-orange-600 to-orange-700";
    };

    return (
        <div
            className="group relative w-full overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:shadow-xl dark:bg-gray-800/90 dark:hover:bg-gray-800 cursor-pointer border border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-500"
            onClick={handleCardClick}
        >
            {/* Gradient Header */}
            {/* <div className={`relative h-20 bg-gradient-to-br ${getRoleColor(roleData.name)} overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        <div className="absolute top-3 right-3">
          <div className={`w-3 h-3 rounded-full ${roleData.isActive ? "bg-green-400" : "bg-gray-400"} shadow-lg`}></div>
        </div>
        <div className="absolute bottom-3 left-4">
          <div className="p-2 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30">
            {getRoleIcon(roleData.name)}
          </div>
        </div>
       
        <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-white/10"></div>
        <div className="absolute -bottom-2 -left-2 w-12 h-12 rounded-full bg-white/5"></div>
      </div> */}

            {/* Card Content */}
            <div className="relative p-6">
                {/* Title and Status */}
                <div className="mb-4">
                    <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-200 line-clamp-1">
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
                                    {group.privilegeCount}
                                </Badge>
                            </div>
                        ))}
                        {roleData.privilegeGroups?.length > 2 && <div className="text-xs text-gray-500 dark:text-gray-400 text-center py-1">+{roleData.privilegeGroups.length - 2} more groups</div>}
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center space-x-2 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30">
                        <div className="p-1.5 rounded-md bg-blue-100 dark:bg-blue-900/40">
                            <Key className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <div className="text-sm font-bold text-blue-700 dark:text-blue-300">{roleData.privilegeCount}</div>
                            <div className="text-xs text-blue-600 dark:text-blue-400">Privileges</div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2 p-3 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900/30">
                        <div className="p-1.5 rounded-md bg-green-100 dark:bg-green-900/40">
                            <Users className="h-3 w-3 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                            <div className="text-sm font-bold text-green-700 dark:text-green-300">{roleData.userCount}</div>
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
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/rbac/roles/form/${roleData.id}`);
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
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </div>
    );
}
