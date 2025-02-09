import React from "react";
import styles from "./styles/index.module.css";
import "./styles/index.css";
import useInstructorDetails from "./hooks/useInstructorDetails";
import Details from "@/components/details";
import { useInstructor } from "@/services/context/instructor";
import sampleInstructorDetails from "./utils/seeds";

const InstructorDetails = () => {
    const { instructorDetails } = useInstructor();
    const { instructorDetailsConfig } = useInstructorDetails(sampleInstructorDetails);
    return (
        <div className={styles.container}>
            <Details data={instructorDetailsConfig} />
        </div>
    );
};

export default InstructorDetails;
