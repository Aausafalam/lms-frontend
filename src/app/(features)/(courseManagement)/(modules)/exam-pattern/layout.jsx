import DashboardLayout from "@/app/layouts/index";
import React from "react";

const ModulesLayout = ({ children }) => {
    return (
        <DashboardLayout>
            <div id="exam_patten_module">{children}</div>
        </DashboardLayout>
    );
};

export default ModulesLayout;
