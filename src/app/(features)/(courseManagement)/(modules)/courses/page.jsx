"use client";
import React from "react";
import CoursesTable from "./components/table";
import DeleteCourse from "./components/delete";
import useModalHandler from "./hooks/useModalHandler";

const Courses = () => {
    const { modalType, courseId, closeModal, setModalState } = useModalHandler();
    const [refreshTable, setRefreshTable] = React.useState(false);
    const [selectedCourse, setSelectedCourse] = React.useState(null);

    return (
        <div className="courses-container">
            {/* <CourseStats className={"mb-4"} /> */}
            <CoursesTable setModalState={setModalState} refreshTable={refreshTable} setSelectedCourse={setSelectedCourse} />
            {/* Delete Permission Modal */}
            <DeleteCourse modalState={{ delete: modalType === "delete" }} closeModal={closeModal} courseId={courseId} setRefreshTable={setRefreshTable} />
        </div>
    );
};

export default Courses;
