"use client";
import React, { useEffect, useState } from "react";
import PermissionGroupForm from "./components/form";
import PermissionGroupTable from "./components/table";
import Modal from "@/components/Popup/Popup";
import GlobalICONS from "@/lib/utils/icons";
import styles from "./styles/index.module.css";
import DeletePermissionGroup from "./components/delete";
import { formStorageManager } from "@/lib/utils/formStorageManager";
import useModalHandler from "./hooks/useModalHandler";
import { usePermissionGroup } from "@/services/context/permissionGroup";
import PermissionGroupDetails from "./components/details";

const PermissionGroup = () => {
    const { modalType, permissionGroupId, closeModal, setModalState } = useModalHandler();

    const [selectedPermissionGroup, setSelectedPermissionGroup] = useState(null);
    const [refreshTable, setRefreshTable] = useState(false);
    const formId = permissionGroupId ? `permission_group_edit_form_${permissionGroupId}` : `permission_group_add_form`;

    const { permissionGroupDetails } = usePermissionGroup();

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
        if (permissionGroupId) {
            permissionGroupDetails.fetch({}, { id: permissionGroupId });
        }
    }, [permissionGroupId]);

    return (
        <div className={styles.container}>
            {/* Permission Group Table */}
            <PermissionGroupTable setSelectedPermissionGroup={setSelectedPermissionGroup} refreshTable={refreshTable} setModalState={setModalState} />

            {/* Add Permission Group Modal */}
            <Modal
                show={modalType === "add"}
                onClose={onCancel}
                title={"Add Permission Group "}
                maxWidth={"700px"}
                icon={GlobalICONS.PERMISSION}
                description="Provide the required details to add a new Permission Group "
            >
                <PermissionGroupForm formId={formId} onSuccess={onSuccess} onCancel={onCancel} />
            </Modal>

            {/* Edit Permission Group Modal */}
            <Modal
                show={modalType === "edit"}
                onClose={onCancel}
                title={"Edit Permission Group  Details"}
                maxWidth={"700px"}
                icon={GlobalICONS.PERMISSION}
                description="Modify the existing details to update the Permission Group  information."
            >
                <PermissionGroupForm formId={formId} data={selectedPermissionGroup} onCancel={onCancel} onSuccess={onSuccess} />
            </Modal>

            {/* View Permission Group Details Modal */}
            <Modal
                show={modalType === "view"}
                onClose={closeModal}
                title={"Permission Group Details"}
                maxWidth={"1400px"}
                icon={GlobalICONS.PERMISSION}
                description="View the complete details of the selected Permission Group "
            >
                <PermissionGroupDetails />
            </Modal>

            {/* Delete Permission Group Modal */}
            <DeletePermissionGroup modalState={{ delete: modalType === "delete" }} closeModal={closeModal} permissionGroupId={permissionGroupId} setRefreshTable={setRefreshTable} />
        </div>
    );
};

export default PermissionGroup;
