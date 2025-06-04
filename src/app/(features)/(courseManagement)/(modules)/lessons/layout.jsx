import DashboardLayout from "@/app/layouts/index";
import React from "react";

const ModulesLayout = ({ children }) => {
    return (
        <DashboardLayout>
            <div id="lessons_module">{children}</div>
        </DashboardLayout>
    );
};

export default ModulesLayout;
