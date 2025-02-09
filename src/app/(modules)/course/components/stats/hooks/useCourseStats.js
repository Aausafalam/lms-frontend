import { useMemo } from "react";
import sampleCourseStatsData from "../utils/seeds";
import courseStatsICONS from "../utils/icons";

const useCourseStats = (data = sampleCourseStatsData) => {
    const courseStatsConfig = useMemo(
        () => [
            {
                title: "Total Courses",
                value: data.totalCourse || 0,
                subTitle: "All registered courses",
                icon: courseStatsICONS.TOTAL_INSTRUCTOR,
                hasDecrement: false,
                hasIncrement: true,
                color: "violet",
            },
            {
                title: "New Courses",
                value: data?.newCourse || 0,
                subTitle: "Joined in the last 30 days",
                icon: courseStatsICONS.NEW_INSTRUCTOR,
                hasDecrement: false,
                hasIncrement: false,
                color: "orange",
            },
            {
                title: "Active Courses",
                value: data?.activeCourse || 0,
                subTitle: "Currently available for teaching",
                icon: courseStatsICONS.ACTIVE_INSTRUCTOR,
                hasDecrement: false,
                hasIncrement: true,
                color: "green",
            },
            {
                title: "Inactive Courses",
                value: data.inactiveCourse || 0,
                subTitle: "Not currently active",
                icon: courseStatsICONS.INACTIVE_INSTRUCTOR,
                hasDecrement: true,
                hasIncrement: false,
                color: "red",
            },
        ],
        [data]
    );
    return {
        courseStatsConfig,
    };
};

export default useCourseStats;
