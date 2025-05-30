"use client";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Briefcase, LayoutDashboard, Package } from "lucide-react";
import React from "react";
import ModulesTable from "./components/table";
import useModalHandler from "./hooks/useModalHandler";
import DeleteModule from "./components/delete";

const CourseModules = ({ onCourseDetailsPage }) => {
    const { modalType, moduleId, closeModal, setModalState } = useModalHandler();
    const [refreshTable, setRefreshTable] = React.useState(false);
    const [selectedModule, setSelectedModule] = React.useState(null);

    return (
        <div>
            <ModulesTable onCourseDetailsPage={onCourseDetailsPage} setModalState={setModalState} refreshTable={refreshTable} setSelectedModule={setSelectedModule} />
            {/* Delete Module Modal */}
            <DeleteModule modalState={{ delete: modalType === "delete" }} closeModal={closeModal} moduleId={moduleId} setRefreshTable={setRefreshTable} />
        </div>
    );
};

export default CourseModules;
