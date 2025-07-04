"use client";

import React from "react";
import { Users } from "lucide-react";
import UsersTable from "./components/table";
import useModalHandler from "./hooks/useModalHandler";
import DeleteUser from "./components/delete";
import UserStats from "./components/stats";
import { Shield } from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";

const UsersPage = () => {
    const { modalType, userId, closeModal, setModalState } = useModalHandler();
    const [refreshTable, setRefreshTable] = React.useState(false);
    const [selectedUser, setSelectedUser] = React.useState(null);

    const breadcrumbItems = [
        {
            title: "RBAC Management",
            href: "/rbac",
            icon: <Shield className="h-3.5 w-3.5" />,
        },
        {
            title: "Users",
            href: "/rbac/users",
            icon: <Users className="h-3.5 w-3.5" />,
        },
    ];

    return (
        <div className="">
            {/* Breadcrumb */}
            <Breadcrumb items={breadcrumbItems} className="mb-6" />

            {/* Stats Section */}
            <UserStats className="mb-6" />

            {/* Users Table */}
            <UsersTable setModalState={setModalState} refreshTable={refreshTable} setSelectedUser={setSelectedUser} />

            {/* Delete Modal */}
            <DeleteUser
                isOpen={modalType === "delete"}
                user={selectedUser}
                onConfirm={() => {
                    closeModal();
                    setRefreshTable(!refreshTable);
                }}
                onCancel={closeModal}
                modalState={{ delete: modalType === "delete" }}
            />
        </div>
    );
};

export default UsersPage;
