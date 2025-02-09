import { useMemo } from "react";
import sampleInstructorStatsData from "../utils/seeds";
import instructorStatsICONS from "../utils/icons";

const useInstructorStats = (data = sampleInstructorStatsData) => {
    const instructorStatsConfig = useMemo(
        () => [
            {
                title: "Total Instructors",
                value: data.totalInstructor || 0,
                subTitle: "All registered instructors",
                icon: instructorStatsICONS.TOTAL_INSTRUCTOR,
                hasDecrement: false,
                hasIncrement: true,
                color: "violet",
            },
            {
                title: "New Instructors",
                value: data?.newInstructor || 0,
                subTitle: "Joined in the last 30 days",
                icon: instructorStatsICONS.NEW_INSTRUCTOR,
                hasDecrement: false,
                hasIncrement: false,
                color: "orange",
            },
            {
                title: "Active Instructors",
                value: data?.activeInstructor || 0,
                subTitle: "Currently available for teaching",
                icon: instructorStatsICONS.ACTIVE_INSTRUCTOR,
                hasDecrement: false,
                hasIncrement: true,
                color: "green",
            },
            {
                title: "Inactive Instructors",
                value: data.inactiveInstructor || 0,
                subTitle: "Not currently active",
                icon: instructorStatsICONS.INACTIVE_INSTRUCTOR,
                hasDecrement: true,
                hasIncrement: false,
                color: "red",
            },
        ],
        [data]
    );
    return {
        instructorStatsConfig,
    };
};

export default useInstructorStats;
