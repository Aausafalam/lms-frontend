"use client";
import React, { useEffect, useState } from "react";
import InstructorForm from "./components/form";
import InstructorTable from "./components/table";
import Modal from "@/components/Popup/Popup";
import GlobalICONS from "@/lib/utils/icons";
import InstructorDetails from "./components/details";
import InstructorStats from "./components/stats";
import styles from "./styles/index.module.css";
import DeleteInstructor from "./components/delete";
import { useInstructor } from "@/services/context/instructor";
import { formStorageManager } from "@/lib/utils/formStorageManager";
import useModalHandler from "./hooks/useModalHandler";

const Instructor = () => {
    const { modalType, instructorId, closeModal, setModalState } = useModalHandler();

    const [selectedInstructor, setSelectedInstructor] = useState(null);
    const [refreshTable, setRefreshTable] = useState(false);
    const formId = instructorId ? `instructor_edit_form_${instructorId}` : `instructor_add_form`;

    const { instructorDetails } = useInstructor();

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
        if (instructorId) {
            instructorDetails.fetch({}, { id: instructorId });
        }
    }, [instructorId]);

    return (
        <div className={styles.container}>
            {/* Instructor Statistics */}
            <InstructorStats />

            {/* Instructor Table */}
            <InstructorTable setSelectedInstructor={setSelectedInstructor} refreshTable={refreshTable} setModalState={setModalState} />

            {/* Add Instructor Modal */}
            <Modal
                show={modalType === "add"}
                onClose={onCancel}
                title={"Add Instructor"}
                maxWidth={"1600px"}
                icon={GlobalICONS.INSTRUCTOR}
                description="Provide the required details to register a new Instructor"
            >
                <InstructorForm formId={formId} onSuccess={onSuccess} onCancel={onCancel} />
            </Modal>

            {/* Edit Instructor Modal */}
            <Modal
                show={modalType === "edit"}
                onClose={onCancel}
                title={"Edit Instructor Details"}
                maxWidth={"1600px"}
                icon={GlobalICONS.INSTRUCTOR}
                description="Modify the existing details to update the Instructor information."
            >
                <InstructorForm formId={formId} data={selectedInstructor} onCancel={onCancel} onSuccess={onSuccess} />
            </Modal>

            {/* View Instructor Details Modal */}
            <Modal
                show={modalType === "view"}
                onClose={closeModal}
                title={"Instructor Details"}
                maxWidth={"1600px"}
                icon={GlobalICONS.INSTRUCTOR}
                description="View the complete details of the selected Instructor"
            >
                <InstructorDetails />
            </Modal>

            {/* Delete Instructor Modal */}
            <DeleteInstructor modalState={{ delete: modalType === "delete" }} closeModal={closeModal} instructorId={instructorId} setRefreshTable={setRefreshTable} />
        </div>
    );
};

export default Instructor;
