"use client";

import { useCallback } from "react";
import Dropdown from "@/components/DropDown";
import TableICON from "@/components/table/utils/icon";
import TableUtils from "@/components/table/utils";
import RolesICONS from "../table/utils/icons";

const RolesGridView = ({ actionData = [], data, rows = [] }) => {
    // Sample actions if none provided
    const defaultActions = [
        { name: "edit", label: "Edit", functions: (row) => console.log("Edit", row) },
        { name: "delete", label: "Delete", functions: (row) => console.log("Delete", row) },
        { name: "view", label: "View Details", functions: (row) => console.log("View", row) },
    ];

    // Use provided actions or default
    const actions = actionData.length > 0 ? actionData : defaultActions;

    const handleActionClick = useCallback((action, row, event) => {
        try {
            event.stopPropagation();
            action.functions?.(row);
        } catch (error) {
            console.error("Error handling action click:", error);
        }
    }, []);

    // Memoize action filtering
    const getVisibleActions = useCallback(
        (actions, row) => {
            return actions?.filter((action) => !TableUtils.shouldHideAction?.(action, row)) || [];
        },
        [TableUtils.shouldHideAction]
    );

    const ActionButtons = useCallback(
        ({ actions, row }) => {
            const visibleActions = getVisibleActions(actions, row);

            if (!visibleActions.length) return null;

            // Split the array into two parts
            const primaryActions = visibleActions.slice(0, 2); // First two items
            const dropdownActions = visibleActions.slice(2); // Remaining items

            return (
                <div className="flex items-center justify-end space-x-1">
                    {/* Render the first two actions directly */}
                    {primaryActions.map((action, index) => (
                        <button
                            key={`${action.name}-${index}`}
                            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-all duration-200"
                            onClick={(e) => handleActionClick(action, rows[index], e)}
                            title={action.label}
                        >
                            {TableICON[action.name.toUpperCase()]}
                        </button>
                    ))}

                    {/* Render the rest in the Dropdown */}
                    {dropdownActions.length > 0 && (
                        <Dropdown
                            trigger={<button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-all duration-200">{TableICON.FILL_VERTICAL_MENU}</button>}
                            content={dropdownActions.map((action, index) => (
                                <button
                                    key={`dropdown-${action.name}-${index}`}
                                    onClick={(e) => handleActionClick(action, row, e)}
                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left transition-colors duration-150"
                                    title={action.label}
                                >
                                    <span className="text-gray-500">{TableICON[action.name.toUpperCase()]}</span>
                                    <span className="ml-2">{action.label}</span>
                                </button>
                            ))}
                        />
                    )}
                </div>
            );
        },
        [getVisibleActions, handleActionClick]
    );

    // Light theme configurations
    const themeConfig = {
        ADMIN: {
            icon: RolesICONS.ADMIN,
            color: "bg-white",
            accent: "text-violet-600",
            iconBg: "bg-violet-100",
            border: "border-violet-200",
            badge: "bg-violet-100 text-violet-700",
        },
        TEACHER: {
            icon: RolesICONS.TEACHER,
            color: "bg-white",
            accent: "text-blue-600",
            iconBg: "bg-blue-100",
            border: "border-blue-200",
            badge: "bg-blue-100 text-blue-700",
        },
        STUDENT: {
            icon: RolesICONS.STUDENT,
            color: "bg-white",
            accent: "text-emerald-600",
            iconBg: "bg-emerald-100",
            border: "border-emerald-200",
            badge: "bg-emerald-100 text-emerald-700",
        },
        CONTENT_MANAGER: {
            icon: RolesICONS.CONTENT_MANAGER,
            color: "bg-white",
            accent: "text-pink-600",
            iconBg: "bg-pink-100",
            border: "border-pink-200",
            badge: "bg-pink-100 text-pink-700",
        },
    };

    // Function to generate random avatars for demo
    const getRandomAvatars = (count = 3) => {
        const colors = ["bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-red-500", "bg-purple-500", "bg-pink-500"];
        const initials = ["JD", "AB", "CD", "EF", "GH", "IJ", "KL"];

        return Array.from({ length: Math.min(count, 5) }, (_, i) => ({
            color: colors[Math.floor(Math.random() * colors.length)],
            initial: initials[Math.floor(Math.random() * initials.length)],
        }));
    };

    // Function to format date
    const formatDate = (date) => {
        if (!date) return "N/A";
        const d = new Date(date);
        return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 p-6">
            {data.map((group) => {
                const groupKey = group.name.toUpperCase().replace(/\s+/g, "_");
                const theme = themeConfig[groupKey] || themeConfig.ADMIN;

                // Generate random avatars for demo
                const avatars = getRandomAvatars(group.usersCount);

                return (
                    <div
                        key={group.id}
                        className={`group relative overflow-hidden rounded-xl ${theme.color}  shadow-md transition-all duration-300 hover:shadow-md hover:-translate-y-1`}
                    >
                        {/* Card Header */}
                        <div className="relative p-5 flex justify-between items-center border-b border-gray-100">
                            <div className="flex items-center space-x-3">
                                <div className={`p-2.5 ${theme.iconBg} rounded-lg`}>
                                    <div className={theme.accent}>{theme.icon}</div>
                                </div>
                                <div>
                                    <h3 className={`text-lg font-semibold`}>{group.name}</h3>
                                    <div className="flex items-center mt-1">
                                        <span
                                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                                group.status === "Active" ? "bg-green-100 text-green-700 border border-green-200" : "bg-red-100 text-red-700 border border-red-200"
                                            }`}
                                        >
                                            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${group.status === "Active" ? "bg-green-500 animate-pulse" : "bg-red-500"}`}></span>
                                            {group.status}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <ActionButtons actions={actions} row={group} />
                        </div>

                        {/* Card Content */}
                        <div className="p-5 text-gray-700">
                            <div className="mb-5">
                                <p className="text-gray-600 text-sm leading-relaxed">{group.description || "No description available"}</p>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-4 mb-5">
                                <div className="relative overflow-hidden rounded-lg bg-gray-50 p-4">
                                    <span className="block text-xs text-gray-500 mb-1">Permissions</span>
                                    <div className="flex items-baseline">
                                        <span className={`text-2xl font-bold `}>{group.permissionCount || 0}</span>
                                        <span className="ml-1 text-xs text-gray-500">total</span>
                                    </div>
                                </div>

                                <div className="relative overflow-hidden rounded-lg bg-gray-50 p-4">
                                    <span className="block text-xs text-gray-500 mb-1">Users</span>
                                    <div className="flex items-baseline">
                                        <span className={`text-2xl font-bold`}>{group.usersCount || 0}</span>
                                        <span className="ml-1 text-xs text-gray-500">members</span>
                                    </div>
                                </div>
                            </div>

                            {/* User Avatars */}
                            {avatars.length > 0 && (
                                <div className="mb-4">
                                    <span className="block text-xs text-gray-500 mb-2">Assign Users</span>
                                    <div className="flex -space-x-2 overflow-hidden">
                                        {avatars.map((avatar, index) => (
                                            <div key={index} className={`inline-flex items-center justify-center w-8 h-8 rounded-full ring-2 ring-white ${avatar.color}`} title={`User ${index + 1}`}>
                                                <span className="text-xs font-medium text-white">{avatar.initial}</span>
                                            </div>
                                        ))}
                                        {group.usersCount > avatars.length && (
                                            <div className="inline-flex items-center justify-center w-8 h-8 rounded-full ring-2 ring-white bg-gray-200">
                                                <span className="text-xs font-medium text-gray-700">+{group.usersCount - avatars.length}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Created Date */}
                            <div className="text-xs text-gray-500 mt-auto">Updated At: {formatDate(group.createdAt || new Date())}</div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default RolesGridView;
