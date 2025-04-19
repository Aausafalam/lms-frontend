import React from "react";
// import styles from "./styles/index.module.css";
import DashboardLayout from "@/app/layout/index";

const RoutesLayout = ({ children }) => {
    return (
        <DashboardLayout>
            <div id="routes_module">{children}</div>
        </DashboardLayout>
    );
};

export default RoutesLayout;
