import DashboardLayout from "@/app/layouts/index";
import React from "react";

const CoursesLayout = ({ children }) => {
    return (
        <DashboardLayout>
            <div id="instructors_module">{children}</div>
        </DashboardLayout>
    );
};

export default CoursesLayout;
