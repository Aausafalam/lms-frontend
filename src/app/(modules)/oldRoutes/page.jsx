"use client";
import React, { useEffect, useState } from "react";
import RoutesForm from "./components/form";
import RoutesTable from "./components/table";
import Modal from "@/components/Popup/Popup";
import GlobalICONS from "@/lib/utils/icons";
import RoutesDetails from "./components/details";
import RoutesStats from "./components/stats";
import styles from "./styles/index.module.css";
import DeleteRoutes from "./components/delete";
import { formStorageManager } from "@/lib/utils/formStorageManager";
import useModalHandler from "./hooks/useModalHandler";
import { useRoutes } from "@/services/context/routes";

const Routes = () => {
    const { modalType, routesId, closeModal, setModalState } = useModalHandler();

    const [selectedRoutes, setSelectedRoutes] = useState(null);
    const [refreshTable, setRefreshTable] = useState(false);
    const formId = routesId ? `routes_edit_form_${routesId}` : `routes_add_form`;

    const { routesDetails } = useRoutes();

    const onSuccess = () => {
        setRefreshTable((prev) => !prev);
        formStorageManager.clearFormFields(formId);
        closeModal();
    };

    const onCancel = () => {
        formStorageManager.clearFormFields(formId);
        closeModal();
    };

    useEffect(() => {
        if (routesId) {
            routesDetails.fetch({}, { id: routesId });
        }
    }, [routesId]);

    return (
        <div className={styles.container}>
            {/* Routes Statistics */}
            <RoutesStats />

            {/* Routes Table */}
            <RoutesTable setSelectedRoutes={setSelectedRoutes} refreshTable={refreshTable} setModalState={setModalState} />

            {/* Add Routes Modal */}
            <Modal
                show={modalType === "add"}
                onClose={onCancel}
                title={"Add Route"}
                maxWidth={"700px"}
                icon={GlobalICONS.PERMISSION}
                description="Provide the required details to add a new Route"
            >
                <RoutesForm formId={formId} onSuccess={onSuccess} onCancel={onCancel} />
            </Modal>

            {/* Edit Routes Modal */}
            <Modal
                show={modalType === "edit"}
                onClose={onCancel}
                title={"Edit Route Details"}
                maxWidth={"700px"}
                icon={GlobalICONS.PERMISSION}
                description="Modify the existing details to update the Route information."
            >
                <RoutesForm formId={formId} data={selectedRoutes} onCancel={onCancel} onSuccess={onSuccess} />
            </Modal>

            {/* View Routes Details Modal */}
            <Modal
                show={modalType === "view"}
                onClose={closeModal}
                title={"Routes Details"}
                maxWidth={"700px"}
                icon={GlobalICONS.PERMISSION}
                description="View the complete details of the selected Route"
            >
                <RoutesDetails />
            </Modal>

            {/* Delete Routes Modal */}
            <DeleteRoutes modalState={{ delete: modalType === "delete" }} closeModal={closeModal} routesId={routesId} setRefreshTable={setRefreshTable} />
        </div>
    );
};

export default Routes;
