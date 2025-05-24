"use client";

import React from "react";
import InstructorsTable from "./components/table";
import { LayoutDashboard } from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";
import InstructorStats from "./components/stats";
import useModalHandler from "./hooks/useModalHandler";
import DeleteInstructor from "./components/delete";

const Instructors = () => {
    const { modalType, instructorId, closeModal, setModalState } = useModalHandler();
    const [refreshTable, setRefreshTable] = React.useState(false);
    const [selectedInstructor, setSelectedInstructor] = React.useState(null);
    const formId = instructorId ? `instructor_edit_form_${instructorId}` : `instructor_add_form`;

    const breadcrumbItems = [
        {
            title: "Instructors",
            href: "/instructors",
            icon: <LayoutDashboard className="h-3.5 w-3.5" />,
        },
    ];
    return (
        <div className="instructors-container">
            <Breadcrumb items={breadcrumbItems} className={"mb-4"} />
            <InstructorStats className={"mb-4"} />
            <InstructorsTable setModalState={setModalState} refreshTable={refreshTable} setSelectedInstructor={setSelectedInstructor} />
            {/* Delete Instructor Modal */}
            <DeleteInstructor modalState={{ delete: modalType === "delete" }} closeModal={closeModal} instructorId={instructorId} setRefreshTable={setRefreshTable} />
        </div>
    );
};

export default Instructors;
