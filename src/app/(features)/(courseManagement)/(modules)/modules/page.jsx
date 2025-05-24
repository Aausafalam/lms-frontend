"use client";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Briefcase, LayoutDashboard, Package } from "lucide-react";
import React from "react";
import ModulesTable from "./components/table";
import useModalHandler from "./hooks/useModalHandler";

const CourseModules = () => {
    const { modalType, moduleId, closeModal, setModalState } = useModalHandler();
    const [refreshTable, setRefreshTable] = React.useState(false);
    const [selectedModule, setSelectedModule] = React.useState(null);
    const formId = moduleId ? `module_edit_form_${moduleId}` : `module_add_form`;
    const breadcrumbItems = [
        {
            title: "Courses",
            href: "/courses",
            icon: <Package className="h-3.5 w-3.5" />,
        },
        {
            title: "Modules",
            href: "/modules",
            icon: <Package className="h-3.5 w-3.5" />,
        },
    ];

    return (
        <div>
            {/* <Breadcrumb items={breadcrumbItems} className={"mb-4"} /> */}
            <ModulesTable setModalState={setModalState} refreshTable={refreshTable} setSelectedModule={setSelectedModule}  />
        </div>
    );
};

export default CourseModules;
