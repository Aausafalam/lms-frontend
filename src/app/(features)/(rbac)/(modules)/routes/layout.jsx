import React from "react";
import DashboardLayout from "@/app/layouts/index";

const RoutesLayout = ({ children }) => {
    return (
        <DashboardLayout>
            <div id="routes_module">{children}</div>
        </DashboardLayout>
    );
};

export default RoutesLayout;
