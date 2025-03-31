"use client";
import React, { useEffect, useState } from "react";
import UsersForm from "./components/form";
import UsersTable from "./components/table";
import Modal from "@/components/Popup/Popup";
import GlobalICONS from "@/lib/utils/icons";
import styles from "./styles/index.module.css";
import DeleteUsers from "./components/delete";
import { formStorageManager } from "@/lib/utils/formStorageManager";
import useModalHandler from "./hooks/useModalHandler";
import { useUsers } from "@/services/context/users";
import UsersDetails from "./components/details";

const Users = () => {
    const { modalType, usersId, closeModal, setModalState } = useModalHandler();

    const [selectedUsers, setSelectedUsers] = useState(null);
    const [refreshTable, setRefreshTable] = useState(false);
    const [selectedRow, setSelectedRow] = useState([]);
    const formId = usersId ? `users_edit_form_${usersId}` : `users_add_form`;

    const { usersDetails } = useUsers();

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
        if (usersId) {
            usersDetails.fetch({}, { id: usersId });
        }
    }, [usersId]);

    console.log("selectedRow", selectedRow);

    return (
        <div className={styles.container}>
            {/* Users Table */}
            <UsersTable setSelectedUsers={setSelectedUsers} refreshTable={refreshTable} setModalState={setModalState} setSelectedRow={setSelectedRow} />

            {/* Add Users Modal */}
            <Modal show={modalType === "add"} onClose={onCancel} title={"Add Users "} maxWidth={"700px"} icon={GlobalICONS.USER} description="Provide the required details to add a new Users ">
                <UsersForm formId={formId} onSuccess={onSuccess} onCancel={onCancel} />
            </Modal>

            {/* Edit Users Modal */}
            <Modal
                show={modalType === "edit"}
                onClose={onCancel}
                title={"Edit Users  Details"}
                maxWidth={"700px"}
                icon={GlobalICONS.USER}
                description="Modify the existing details to update the Users  information."
            >
                <UsersForm formId={formId} data={selectedUsers} onCancel={onCancel} onSuccess={onSuccess} />
            </Modal>

            {/* View Users Details Modal */}
            <Modal show={modalType === "view"} onClose={closeModal} title={"Users Details"} maxWidth={"1400px"} icon={GlobalICONS.USER} description="View the complete details of the selected Users ">
                <UsersDetails />
            </Modal>

            {/* Delete Users Modal */}
            <DeleteUsers modalState={{ delete: modalType === "delete" }} closeModal={closeModal} usersId={usersId} setRefreshTable={setRefreshTable} />
        </div>
    );
};

export default Users;
