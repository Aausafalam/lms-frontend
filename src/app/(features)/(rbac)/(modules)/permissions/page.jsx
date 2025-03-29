"use client";
import React, { useEffect, useState } from "react";
import PermissionForm from "./components/form";
import PermissionTable from "./components/table";
import Modal from "@/components/Popup/Popup";
import GlobalICONS from "@/lib/utils/icons";
import styles from "./styles/index.module.css";
import DeletePermission from "./components/delete";
import { formStorageManager } from "@/lib/utils/formStorageManager";
import useModalHandler from "./hooks/useModalHandler";
import { usePermission } from "@/services/context/permission";
import PermissionDetails from "./components/details";

const Permission = () => {
    const { modalType, permissionId, closeModal, setModalState } = useModalHandler();

    const [selectedPermission, setSelectedPermission] = useState(null);
    const [refreshTable, setRefreshTable] = useState(false);
    const formId = permissionId ? `permission_edit_form_${permissionId}` : `permission_add_form`;

    const { permissionDetails } = usePermission();

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
        if (permissionId) {
            permissionDetails.fetch({}, { id: permissionId });
        }
    }, [permissionId]);

    return (
        <div className={styles.container}>
            {/* Permission Table */}
            <PermissionTable setSelectedPermission={setSelectedPermission} refreshTable={refreshTable} setModalState={setModalState} />

            {/* Add Permission Modal */}
            <Modal
                show={modalType === "add"}
                onClose={onCancel}
                title={"Add Permission "}
                maxWidth={"700px"}
                icon={GlobalICONS.PERMISSION}
                description="Provide the required details to add a new Permission "
            >
                <PermissionForm formId={formId} onSuccess={onSuccess} onCancel={onCancel} />
            </Modal>

            {/* Edit Permission Modal */}
            <Modal
                show={modalType === "edit"}
                onClose={onCancel}
                title={"Edit Permission  Details"}
                maxWidth={"700px"}
                icon={GlobalICONS.PERMISSION}
                description="Modify the existing details to update the Permission  information."
            >
                <PermissionForm formId={formId} data={selectedPermission} onCancel={onCancel} onSuccess={onSuccess} />
            </Modal>

            {/* View Permission Details Modal */}
            <Modal
                show={modalType === "view"}
                onClose={closeModal}
                title={"Permission Details"}
                maxWidth={"1400px"}
                icon={GlobalICONS.PERMISSION}
                description="View the complete details of the selected Permission "
            >
                <PermissionDetails />
            </Modal>

            {/* Delete Permission Modal */}
            <DeletePermission modalState={{ delete: modalType === "delete" }} closeModal={closeModal} permissionId={permissionId} setRefreshTable={setRefreshTable} />
        </div>
    );
};

export default Permission;
