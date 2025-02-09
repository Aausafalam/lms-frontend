import React from "react";
import "./styles/index.css";
import LayoutWithSidebarNavbar from "@/app/layouts/WithNavbarSidebar";

const CategoryLayout = ({ children }) => {
    return (
        <LayoutWithSidebarNavbar>
            <div id="category_module">{children}</div>
        </LayoutWithSidebarNavbar>
    );
};

export default CategoryLayout;
