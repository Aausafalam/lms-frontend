import React, { useCallback, useState } from "react";
import Dropdown from "@/components/DropDown";
import TableICON from "@/components/table/utils/icon";
import TableUtils from "@/components/table/utils";
import styles from "./index.module.css";
import PermissionGroupICONS from "../table/utils/icons";

const PermissionGroupGridView = ({ actionData = [], data, rows = [] }) => {
    const permissionListLength = 4;
    const [initialPermissionsCount, setInitialPermissionsCount] = useState(permissionListLength);
    // Sample actions if none provided
    const defaultActions = [
        { name: "edit", label: "Edit", functions: (row) => console.log("Edit", row) },
        { name: "delete", label: "Delete", functions: (row) => console.log("Delete", row) },
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
                <div className="flex items-center space-x-2">
                    {/* Render the first two actions directly */}
                    {primaryActions.map((action, index) => (
                        <button key={`${action.name}-${index}`} className="text-gray-500 hover:text-gray-700" onClick={(e) => handleActionClick(action, row, e)} title={action.label}>
                            {TableICON[action.name.toUpperCase()]}
                        </button>
                    ))}

                    {/* Render the rest in the Dropdown */}
                    {dropdownActions.length > 0 && (
                        <Dropdown
                            trigger={<button className="text-gray-500 hover:text-gray-700">{TableICON.FILL_VERTICAL_MENU}</button>}
                            content={dropdownActions.map((action, index) => (
                                <button
                                    key={`dropdown-${action.name}-${index}`}
                                    onClick={(e) => handleActionClick(action, row, e)}
                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                    title={action.label}
                                >
                                    {TableICON[action.name.toUpperCase()]}
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

    // Helper to get background color class based on color name
    const getBgColorClass = (color) => {
        const colorMap = {
            blue: "bg-blue-100 text-blue-600",
            green: "bg-green-100 text-green-600",
            purple: "bg-purple-100 text-purple-600",
            yellow: "bg-yellow-100 text-yellow-600",
            red: "bg-red-100 text-red-600",
            indigo: "bg-indigo-100 text-indigo-600",
            gray: "bg-gray-100 text-gray-600",
        };
        return colorMap[color] || "bg-gray-100 text-gray-600";
    };

    // Helper to get badge color class based on color name
    const getBadgeColorClass = (color) => {
        const colorMap = {
            blue: "bg-blue-100 text-blue-800",
            green: "bg-green-100 text-green-800",
            purple: "bg-purple-100 text-purple-800",
            yellow: "bg-yellow-100 text-yellow-800",
            red: "bg-red-100 text-red-800",
            indigo: "bg-indigo-100 text-indigo-800",
            gray: "bg-gray-100 text-gray-800",
        };
        return colorMap[color] || "bg-gray-100 text-gray-800";
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {data.map((group) => (
                <div key={group.id} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                        <div className="flex items-center">
                            <div className={`p-2 rounded-md ${getBgColorClass(group.iconColor)} mr-4`}>
                                {PermissionGroupICONS[group.iconName] || (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                )}
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">{group.name}</h3>
                                <p className="text-sm text-gray-500">{group.description}</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getBadgeColorClass(group.iconColor)}`}>
                                {group.privileges?.length} Permissions
                            </span>
                        </div>
                    </div>
                    <div className="px-6 py-4 h-max">
                        <ul className="space-y-2">
                            {group.privileges?.slice(0, initialPermissionsCount).map((permission, index) => (
                                <li key={index} className="flex items-center justify-between">
                                    <span className="text-sm text-gray-700">{permission.name}</span>
                                    <span className="text-xs text-gray-500">{permission.routes?.length || 0} Routes</span>
                                </li>
                            ))}
                        </ul>
                        {group.privileges?.length > 4 && (
                            <div className="mt-4 flex justify-end">
                                <button
                                    onClick={() => setInitialPermissionsCount(permissionListLength === initialPermissionsCount ? group.privileges?.length : permissionListLength)}
                                    className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                                >
                                    {permissionListLength == initialPermissionsCount ? "View" : "Hide"} All Permissions
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="px-6 py-3 bg-gray-50 flex justify-end items-center border-t border-gray-200 rounded-b-lg mt-auto">
                        <ActionButtons actions={actions} row={group} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PermissionGroupGridView;
