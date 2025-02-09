import React from "react";
import styles from "./styles/index.module.css";
import useInstructorStats from "./hooks/useInstructorStats";
import "./styles/index.css";
import StatCard from "@/components/StatCard";
import { useInstructor } from "@/services/context/instructor";
const InstructorStats = () => {
    const { instructorStats } = useInstructor();
    const { instructorStatsConfig } = useInstructorStats();

    // useEffect(() => {
    //     instructorStats.fetch({
    //         params: { module: "desktop" },
    //     });
    // }, []);

    return (
        <div className={styles.container}>
            {instructorStatsConfig.map((item, index) => (
                <StatCard key={index} data={item} />
            ))}
        </div>
    );
};

export default InstructorStats;
