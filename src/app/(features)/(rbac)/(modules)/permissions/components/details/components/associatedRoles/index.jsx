import React from "react";

const roleColors = {
    Admin: "bg-indigo-100 text-indigo-800",
    Teacher: "bg-purple-100 text-purple-800",
    Student: "bg-green-100 text-green-800",
    "Content Manager": "bg-yellow-100 text-yellow-800",
    default: "bg-gray-100 text-gray-800",
};

const AssociatedRoles = ({ roles }) => {
    return (
        <div>
            <h3 className="text-md font-medium text-gray-700 mb-2">Associated Roles</h3>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex flex-wrap gap-2">
                    {roles.map((role, index) => (
                        <span key={index} className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${roleColors[role.name] || roleColors.default}`}>
                            {role.name}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AssociatedRoles;
