"use client";

import { useState } from "react";
import "./styles/index.css";
import sampleRolesDetails from "./utils/seeds";
import Icons from "./utils/icons";

const RolesDetails = () => {
    const [selectedRoleId, setSelectedRoleId] = useState(1);
    const role = sampleRolesDetails.find((role) => role.id === selectedRoleId) || sampleRolesDetails[0];

    // Function to safely generate color classes
    const getColorClass = (color, type, intensity) => {
        // Fallback to purple if color is dynamic and might cause issues
        const safeColor = ["red", "blue", "green", "yellow", "purple", "pink"].includes(color) ? color : "purple";
        return `${type}-${safeColor}-${intensity}`;
    };

    return (
        <div className="bg-white rounded-xl border border-gray-100 transition-all duration-300 p-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                <div className="flex items-center">
                    <div className={`p-3 rounded-xl ${getColorClass(role.iconColor, "bg", "100")} ${getColorClass(role.iconColor, "text", "600")} mr-4 shadow-md`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {Icons[role.icon]}
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-xl font-extrabold text-gray-800 tracking-tight">{role.name} Role</h2>
                        <p className="text-xs text-gray-500 mt-0.5 max-w-2xl">{role.description}</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button className="inline-flex items-center justify-center px-4 py-2 border-2 border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 hover:text-gray-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {Icons.edit}
                        </svg>
                        Edit Role
                    </button>
                    <button className="inline-flex items-center justify-center px-4 py-2 border-2 border-red-300 rounded-lg text-sm font-medium text-red-700 bg-white hover:bg-red-50 hover:border-red-400 hover:text-red-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {Icons.delete}
                        </svg>
                        Delete Role
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="space-y-5">
                    <div>
                        <h3 className="text-base font-bold text-gray-800 mb-3 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                {Icons.info || Icons.document}
                            </svg>
                            Role Information
                        </h3>
                        <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200 hover:border-purple-200 transition-all duration-300 shadow-sm hover:shadow-md">
                            <div className="grid grid-cols-1 gap-3">
                                <div className="group">
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Role Name</p>
                                    <p className="text-sm font-medium text-gray-800 mt-1 group-hover:text-purple-700 transition-colors duration-200">{role.name}</p>
                                </div>
                                <div className="group">
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Description</p>
                                    <p className="text-sm text-gray-800 mt-1 group-hover:text-gray-900 transition-colors duration-200">{role.description}</p>
                                </div>
                                <div className="group">
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Status</p>
                                    <div className="flex items-center mt-1">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                                            <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
                                            {role.status}
                                        </span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="group">
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Created By</p>
                                        <p className="text-sm text-gray-800 mt-1 group-hover:text-gray-900 transition-colors duration-200">{role.createdBy}</p>
                                    </div>
                                    <div className="group">
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Created Date</p>
                                        <p className="text-sm text-gray-800 mt-1 group-hover:text-gray-900 transition-colors duration-200">{role.createdDate}</p>
                                    </div>
                                </div>
                                <div className="group">
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Last Modified</p>
                                    <p className="text-sm text-gray-800 mt-1 group-hover:text-gray-900 transition-colors duration-200">{role.lastModified}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-base font-bold text-gray-800 mb-3 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                {Icons.users || Icons.user}
                            </svg>
                            User Assignment
                        </h3>
                        <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200 hover:border-purple-200 transition-all duration-300 shadow-sm hover:shadow-md">
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-sm font-medium text-gray-800">Total Users</p>
                                <span className="text-lg font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-lg shadow-sm">{role.totalUsers}</span>
                            </div>

                            <div className="space-y-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                                {role.users.slice(0, 3).map((user) => (
                                    <div
                                        key={user.id}
                                        className="flex items-center justify-between p-2 bg-white rounded-lg border border-gray-100 hover:border-purple-200 shadow-sm hover:shadow-md transition-all duration-300"
                                    >
                                        <div className="flex items-center">
                                            <div
                                                className={`h-10 w-10 rounded-lg ${getColorClass(user.color, "bg", "100")} ${getColorClass(
                                                    user.color,
                                                    "text",
                                                    "600"
                                                )} flex items-center justify-center font-bold text-base shadow-sm`}
                                            >
                                                {user.initials}
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-gray-800">{user.name}</p>
                                                <p className="text-xs text-gray-500">{user.email}</p>
                                            </div>
                                        </div>
                                        <button className="text-gray-400 hover:text-red-500 transition-colors duration-200 p-1.5 rounded-full hover:bg-red-50">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                {Icons.close}
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-3 pt-3 border-t border-gray-200">
                                <button className="w-full flex items-center justify-center px-4 py-2 border-2 border-dashed border-purple-300 rounded-lg text-sm font-medium text-purple-700 hover:text-purple-800 hover:border-purple-400 hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        {Icons.addUser}
                                    </svg>
                                    Assign Users
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-2">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-base font-bold text-gray-800 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                {Icons.lock || Icons.key}
                            </svg>
                            Assigned Permissions
                        </h3>
                        <button className="text-sm text-purple-700 hover:text-purple-900 font-medium flex items-center px-3 py-1.5 rounded-lg hover:bg-purple-50 transition-all duration-200 border border-transparent hover:border-purple-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                {Icons.plus}
                            </svg>
                            Add Permissions
                        </button>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200 hover:border-purple-200 transition-all duration-300 shadow-sm hover:shadow-md">
                        <div className="mb-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    className="block w-full pl-4 pr-10 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-sm"
                                    placeholder="Search permissions..."
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                        {Icons.search}
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3 max-h-[calc(100vh-20rem)] overflow-y-auto pr-1 custom-scrollbar">
                            {role.permissions.map((permissionGroup, index) => (
                                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all duration-300 hover:border-purple-200">
                                    <div className="bg-gray-100 px-4 py-2.5 flex items-center justify-between">
                                        <div className="flex items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className={`h-5 w-5 ${getColorClass(permissionGroup.iconColor, "text", "600")} mr-2`}
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                            >
                                                {Icons[permissionGroup.icon]}
                                            </svg>
                                            <span className="font-bold text-gray-800 text-base">{permissionGroup.module}</span>
                                        </div>
                                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-200 text-gray-700">{permissionGroup.count} Permissions</span>
                                    </div>

                                    <div className="p-2 space-y-2 bg-white">
                                        {permissionGroup.items.map((permission, permIndex) => (
                                            <div
                                                key={permIndex}
                                                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-all duration-200 border border-transparent hover:border-gray-200"
                                            >
                                                <div>
                                                    <p className="text-sm font-medium text-gray-800">{permission.name}</p>
                                                    <p className="text-xs text-gray-500 mt-0.5">{permission.description}</p>
                                                </div>
                                                <button className="text-gray-400 hover:text-red-500 transition-colors duration-200 p-1.5 rounded-full hover:bg-red-50">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                        {Icons.close}
                                                    </svg>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between items-center">
                            <span className="text-xs text-gray-600">
                                Showing {role.permissions.reduce((total, group) => total + group.items.length, 0)} of {role.permissions.reduce((total, group) => total + group.count, 0)} permissions
                            </span>
                            <button className="text-sm text-purple-700 hover:text-purple-900 font-medium px-3 py-1.5 rounded-lg hover:bg-purple-50 transition-all duration-200 border border-transparent hover:border-purple-200">
                                View All
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RolesDetails;
