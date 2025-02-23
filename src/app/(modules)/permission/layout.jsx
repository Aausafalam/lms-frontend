import React from "react";
import "./styles/index.css";
import LayoutWithSidebarNavbar from "@/app/layouts/WithNavbarSidebar";

const PermissionLayout = ({ children }) => {
    return (
        <LayoutWithSidebarNavbar>
            <div id="instructor_module">{children}</div>
        </LayoutWithSidebarNavbar>
    );
};

export default PermissionLayout;
