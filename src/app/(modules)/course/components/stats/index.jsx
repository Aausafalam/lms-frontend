import React from "react";
import styles from "./styles/index.module.css";
import useCourseStats from "./hooks/useCourseStats";
import "./styles/index.css";
import StatCard from "@/components/StatCard";
import { useCourse } from "@/services/context/course";
const CourseStats = () => {
    const { courseStats } = useCourse();
    const { courseStatsConfig } = useCourseStats();

    // useEffect(() => {
    //     courseStats.fetch({
    //         params: { module: "desktop" },
    //     });
    // }, []);

    return (
        <div className={styles.container}>
            {courseStatsConfig.map((item, index) => (
                <StatCard key={index} data={item} />
            ))}
        </div>
    );
};

export default CourseStats;
