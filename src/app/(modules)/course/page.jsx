"use client";
import React, { useEffect, useState } from "react";
import CourseForm from "./components/form";
import CourseTable from "./components/table";
import Modal from "@/components/Popup/Popup";
import GlobalICONS from "@/lib/utils/icons";
import CourseDetails from "./components/details";
import CourseStats from "./components/stats";
import styles from "./styles/index.module.css";
import DeleteCourse from "./components/delete";
import { formStorageManager } from "@/lib/utils/formStorageManager";
import useModalHandler from "./hooks/useModalHandler";
import { useCourse } from "@/services/context/course";

const Course = () => {
    const { modalType, courseId, closeModal, setModalState } = useModalHandler();

    const [selectedCourse, setSelectedCourse] = useState(null);
    const [refreshTable, setRefreshTable] = useState(false);
    const formId = courseId ? `course_edit_form_${courseId}` : `course_add_form`;

    const { courseDetails } = useCourse();

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
        if (courseId) {
            courseDetails.fetch({}, { id: courseId });
        }
    }, [courseId]);

    return (
        <div className={styles.container}>
            {/* Course Statistics */}
            <CourseStats />

            {/* Course Table */}
            <CourseTable setSelectedCourse={setSelectedCourse} refreshTable={refreshTable} setModalState={setModalState} />

            {/* Add Course Modal */}
            <Modal show={modalType === "add"} onClose={onCancel} title={"Add Course"} maxWidth={"1600px"} icon={GlobalICONS.COURSE} description="Provide the required details to add a new Course">
                <CourseForm formId={formId} onSuccess={onSuccess} onCancel={onCancel} />
            </Modal>

            {/* Edit Course Modal */}
            <Modal
                show={modalType === "edit"}
                onClose={onCancel}
                title={"Edit Course Details"}
                maxWidth={"1600px"}
                icon={GlobalICONS.INSTRUCTOR}
                description="Modify the existing details to update the Course information."
            >
                <CourseForm formId={formId} data={selectedCourse} onCancel={onCancel} onSuccess={onSuccess} />
            </Modal>

            {/* View Course Details Modal */}
            <Modal
                show={modalType === "view"}
                onClose={closeModal}
                title={"Course Details"}
                maxWidth={"1600px"}
                icon={GlobalICONS.INSTRUCTOR}
                description="View the complete details of the selected Course"
            >
                <CourseDetails />
            </Modal>

            {/* Delete Course Modal */}
            <DeleteCourse modalState={{ delete: modalType === "delete" }} closeModal={closeModal} courseId={courseId} setRefreshTable={setRefreshTable} />
        </div>
    );
};

export default Course;
