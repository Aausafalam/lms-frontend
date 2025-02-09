import React from "react";
import styles from "./styles/index.module.css";
import "./styles/index.css";
import useCourseDetails from "./hooks/useCourseDetails";
import Details from "@/components/details";
import { useCourse } from "@/services/context/course";
import sampleCourseDetails from "./utils/seeds";

const CourseDetails = () => {
    const { courseDetails } = useCourse();
    const { courseDetailsConfig } = useCourseDetails(sampleCourseDetails);
    return (
        <div className={styles.container}>
            <Details data={courseDetailsConfig} />
        </div>
    );
};

export default CourseDetails;
