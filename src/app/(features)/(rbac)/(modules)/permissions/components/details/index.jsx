// PermissionDetails.jsx
import React, { useState } from "react";
import styles from "./styles/index.module.css";
import "./styles/index.css";
import AddRouteForm from "./components/addRouteForm";
import GeneralInformation from "./components/generalInformation";
import AssociatedRoles from "./components/associatedRoles";
import ApiRoutesList from "./components/apiRoutesList";
import permissionDetails from "./utils/seeds";

const PermissionDetails = ({ details = permissionDetails }) => {
    const [showAddRouteForm, setShowAddRouteForm] = useState(false);

    const handleCancel = () => {
        setShowAddRouteForm(false);
    };

    const handleSuccess = () => {
        setShowAddRouteForm(false);
    };

    return (
        <div className={styles.container}>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <GeneralInformation details={details} />
                        <AssociatedRoles roles={details.roles} />
                    </div>

                    <div>
                        <h3 className="text-md font-medium text-gray-700 mb-2">Associated API Routes</h3>
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <ApiRoutesList routes={details.routes} />

                            <div className="mt-4">
                                {showAddRouteForm ? (
                                    <AddRouteForm permissionId={details.id} onCancel={handleCancel} onSuccess={handleSuccess} />
                                ) : (
                                    <button
                                        onClick={() => setShowAddRouteForm(true)}
                                        className="w-full flex items-center justify-center px-4 py-2 border border-dashed border-gray-300 rounded-md text-sm font-medium text-indigo-600 hover:text-indigo-500 hover:border-gray-400 focus:outline-none"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                        </svg>
                                        Add API Route
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PermissionDetails;
