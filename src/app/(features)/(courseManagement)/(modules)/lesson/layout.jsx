import DashboardLayout from "@/app/layouts/index";
import React from "react";

const ModulesLayout = ({ children }) => {
    return (
        <DashboardLayout>
            <div id="courses_modules_module">{children}</div>
        </DashboardLayout>
    );
};

export default ModulesLayout;
