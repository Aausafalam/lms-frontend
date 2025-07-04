"use client";

import { useState, useEffect } from "react";
import { User, Mail, Phone, Shield, Clock, ChevronRight, Crown, UsersIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigation } from "@/components/navigation";

export default function UserCard({ data }) {
    const { navigate } = useNavigation();
    const [userData, setUserData] = useState({
        id: "1",
        name: "John Doe",
        email: "john.doe@example.com",
        mobile: "+1234567890",
        gender: "MALE",
        status: "ACTIVE",
        roles: ["Admin", "Manager"],
        lastLogin: "2024-01-15T10:30:00Z",
        createdAt: "2024-01-01T00:00:00Z",
    });

    useEffect(() => {
        if (data) {
            setUserData((prevData) => ({ ...prevData, ...data }));
        }
    }, [data]);

    const handleCardClick = () => {
        navigate(`/rbac/users/details/${userData.id}`);
    };

    const getStatusColor = (status) => {
        const colors = {
            ACTIVE: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
            INACTIVE: "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400",
            SUSPENDED: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
            PENDING: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
        };
        return colors[status] || "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
    };

    const getRoleIcon = (role) => {
        switch (role.toLowerCase()) {
            case "admin":
                return <Crown className="h-3 w-3" />;
            case "manager":
                return <Shield className="h-3 w-3" />;
            default:
                return <User className="h-3 w-3" />;
        }
    };

    const getRoleColor = (role) => {
        switch (role.toLowerCase()) {
            case "admin":
                return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";
            case "manager":
                return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400";
            default:
                return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
        }
    };

    const formatLastLogin = (dateString) => {
        if (!dateString) return "Never";
        const date = new Date(dateString);
        const now = new Date();
        const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

        if (diffInHours < 1) return "Just now";
        if (diffInHours < 24) return `${diffInHours}h ago`;
        if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
        return date.toLocaleDateString();
    };

    return (
        <div
            className="group relative w-full overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:shadow-xl dark:bg-gray-800/90 dark:hover:bg-gray-800 cursor-pointer border border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-500"
            onClick={handleCardClick}
        >
            {/* Card Content */}
            <div className="relative p-6">
                {/* Profile Section */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                            {userData.profilePic ? (
                                <img src={userData.profilePic || "/placeholder.svg"} alt={userData.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-500 font-bold text-lg">{userData.name.charAt(0).toUpperCase()}</div>
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-200 truncate">
                                {userData.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{userData.gender.toLowerCase().replace("_", " ")}</p>
                        </div>
                    </div>
                    <Badge variant="outline" className={`text-xs ${getStatusColor(userData.status)} border-current`}>
                        {userData.status}
                    </Badge>
                </div>

                {/* Contact Info */}
                <div className="mb-4 space-y-2">
                    <div className="flex items-center space-x-2">
                        <Mail className="h-3 w-3 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400 truncate">{userData.email}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Phone className="h-3 w-3 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{userData.mobile || "---"}</span>
                    </div>
                </div>

                {/* Roles Section */}
                <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">Assigned Roles</h4>
                        <Badge variant="secondary" className="text-xs">
                            {userData.roles?.length || 0} roles
                        </Badge>
                    </div>
                    <div className="flex flex-wrap gap-1">
                        {userData.roles?.slice(0, 2).map((role, index) => (
                            <Badge key={index} className={`text-xs px-2 py-1 ${getRoleColor(role)} flex items-center gap-1`}>
                                {getRoleIcon(role)}
                                {role}
                            </Badge>
                        ))}
                        {userData.roles?.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                                +{userData.roles.length - 2} more
                            </Badge>
                        )}
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center space-x-2 p-3 rounded-lg bg-orange-50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/30">
                        <div className="p-1.5 rounded-md bg-orange-100 dark:bg-orange-900/40">
                            <Clock className="h-3 w-3 text-orange-600 dark:text-orange-400" />
                        </div>
                        <div>
                            <div className="text-sm font-bold text-orange-700 dark:text-orange-300">{formatLastLogin(userData.lastLogin)}</div>
                            <div className="text-xs text-orange-600 dark:text-orange-400">Last Login</div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2 p-3 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900/30">
                        <div className="p-1.5 rounded-md bg-green-100 dark:bg-green-900/40">
                            <UsersIcon className="h-3 w-3 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                            <div className="text-sm font-bold text-green-700 dark:text-green-300">{userData.status === "ACTIVE" ? "Active" : "Inactive"}</div>
                            <div className="text-xs text-green-600 dark:text-green-400">Status</div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center space-x-2">
                        <div className="text-xs text-gray-500 dark:text-gray-400">Joined {new Date(userData.createdAt).toLocaleDateString()}</div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/rbac/users/form/${userData.id}`);
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
