import { useMemo } from "react";
import sampleRoutesStatsData from "../utils/seeds";
import routesStatsICONS from "../utils/icons";

const useRoutesStats = (data = sampleRoutesStatsData) => {
    const routesStatsConfig = useMemo(
        () => [
            {
                title: "Total Routes",
                value: data.totalRoutes || 0,
                subTitle: "All registered permission Groups",
                icon: routesStatsICONS.TOTAL_ROUTES,
                hasDecrement: false,
                hasIncrement: true,
                color: "violet",
            },
            {
                title: "New Routes",
                value: data?.newRoutes || 0,
                subTitle: "Added in the last 30 days",
                icon: routesStatsICONS.NEW_ROUTES,
                hasDecrement: false,
                hasIncrement: false,
                color: "orange",
            },
            {
                title: "Active Routes",
                value: data?.activeRoutes || 0,
                subTitle: "Currently available",
                icon: routesStatsICONS.ACTIVE_ROUTES,
                hasDecrement: false,
                hasIncrement: true,
                color: "green",
            },
            {
                title: "Inactive Routes",
                value: data.inactiveRoutes || 0,
                subTitle: "Not currently active",
                icon: routesStatsICONS.INACTIVE_ROUTES,
                hasDecrement: true,
                hasIncrement: false,
                color: "red",
            },
        ],
        [data]
    );
    return {
        routesStatsConfig,
    };
};

export default useRoutesStats;
