"use client";

import { useState } from "react";
import ModulesTable from "./components/table";
import DeleteModule from "./components/delete";
import useModalHandler from "./hooks/useModalHandler";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { useParams } from "next/navigation";

/**
 * Main Modules Page Component
 * @description Landing page for module management with table and modals
 */
const Modules = () => {
    const { modalType, moduleId, closeModal, setModalState } = useModalHandler();
    const [refreshTable, setRefreshTable] = useState(false);
    const [selectedModule, setSelectedModule] = useState(null);
    

    const handleRefreshTable = () => {
        setRefreshTable((prev) => !prev);
    };

    return (
        <ErrorBoundary>
            <ModulesTable setModalState={setModalState} refreshTable={refreshTable} setSelectedModule={setSelectedModule} />
            <DeleteModule  modalState={{ delete: modalType === "delete" }} closeModal={closeModal} moduleId={moduleId} setRefreshTable={handleRefreshTable} />
        </ErrorBoundary>
    );
};

export default Modules;
