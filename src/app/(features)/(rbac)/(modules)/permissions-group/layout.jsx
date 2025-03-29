import React from "react";
import "./styles/index.css";
import LayoutWithSidebarNavbar from "@/app/layouts/WithNavbarSidebar";

const PermissionGroupLayout = ({ children }) => {
    return (
        <LayoutWithSidebarNavbar>
            <div id="permission_group_module">{children}</div>
        </LayoutWithSidebarNavbar>
    );
};

export default PermissionGroupLayout;
