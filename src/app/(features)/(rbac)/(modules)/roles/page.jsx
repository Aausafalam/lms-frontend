"use client";
import React, { useEffect, useState } from "react";
import RolesForm from "./components/form";
import RolesTable from "./components/table";
import Modal from "@/components/Popup/Popup";
import GlobalICONS from "@/lib/utils/icons";
import styles from "./styles/index.module.css";
import DeleteRoles from "./components/delete";
import { formStorageManager } from "@/lib/utils/formStorageManager";
import useModalHandler from "./hooks/useModalHandler";
import { useRoles } from "@/services/context/roles";
import RolesDetails from "./components/details";

const Roles = () => {
    const { modalType, rolesId, closeModal, setModalState } = useModalHandler();

    const [selectedRoles, setSelectedRoles] = useState(null);
    const [refreshTable, setRefreshTable] = useState(false);
    const formId = rolesId ? `roles_edit_form_${rolesId}` : `roles_add_form`;

    const { rolesDetails } = useRoles();

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
        if (rolesId) {
            rolesDetails.fetch({}, { id: rolesId });
        }
    }, [rolesId]);

    return (
        <div className={styles.container}>
            {/* Roles Table */}
            <RolesTable setSelectedRoles={setSelectedRoles} refreshTable={refreshTable} setModalState={setModalState} />

            {/* Add Roles Modal */}
            <Modal show={modalType === "add"} onClose={onCancel} title={"Add Roles "} maxWidth={"1500px"} icon={GlobalICONS.PERMISSION} description="Provide the required details to add a new Roles ">
                <RolesForm formId={formId} onSuccess={onSuccess} onCancel={onCancel} />
            </Modal>

            {/* Edit Roles Modal */}
            <Modal
                show={modalType === "edit"}
                onClose={onCancel}
                title={"Edit Roles  Details"}
                maxWidth={"700px"}
                icon={GlobalICONS.PERMISSION}
                description="Modify the existing details to update the Roles  information."
            >
                <RolesForm formId={formId} data={selectedRoles} onCancel={onCancel} onSuccess={onSuccess} />
            </Modal>

            {/* View Roles Details Modal */}
            <Modal
                show={modalType === "view"}
                onClose={closeModal}
                title={"Roles Details"}
                maxWidth={"1600px"}
                icon={GlobalICONS.PERMISSION}
                description="View the complete details of the selected Roles "
            >
                <RolesDetails />
            </Modal>

            {/* Delete Roles Modal */}
            <DeleteRoles modalState={{ delete: modalType === "delete" }} closeModal={closeModal} rolesId={rolesId} setRefreshTable={setRefreshTable} />
        </div>
    );
};

export default Roles;



// here i want the following things
// 1. make ui more attractive use speaces effectively and match it with my theme bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
// 2. mantain state like i want do not give create button directly in general info page give save and next than in permission page save and next than in assign user page give create when click on create call a api /add-role
// post request body name,short Description , full description, permissions:[ids],users:[ids]
// in permissions tab first call a api that return permissionGroups name like user Mondule course module
// like respose:[{name:"",id:""}]
// initiall call for first tab like eg for user module fetch get request /permission/permissionGroupId
// than when user click on any tab based on that call api
// in assign users tab call api to get list get request /user-list
// return data {data:{totalPages,totalDocuments,records:[{name:"",id,....}]}}
// than create role
// also if any api give error or not found etc use mock data for that time
// and do not use like @ui etc make all component here and make code readable good looking use compoent based approach 
// UI should look amazing currect UI is good but you can improve it more 

