import React from "react";
import styles from "./styles/index.module.css";
import LayoutWithSidebarNavbar from "@/app/layouts/WithNavbarSidebar";

const RoutesLayout = ({ children }) => {
    return (
        <LayoutWithSidebarNavbar>
            <div id="routes_module">{children}</div>
        </LayoutWithSidebarNavbar>
    );
};

export default RoutesLayout;
