import React from "react";
import "./styles/index.css";
import DashboardLayout from "@/app/layout/index";

const PermissionGroupLayout = ({ children }) => {
    return (
        <DashboardLayout>
            <div id="permission_group_module">{children}</div>
        </DashboardLayout>
    );
};

export default PermissionGroupLayout;
