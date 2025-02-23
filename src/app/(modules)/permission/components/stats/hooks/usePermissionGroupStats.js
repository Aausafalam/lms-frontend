import { useMemo } from "react";
import samplePermissionGroupStatsData from "../utils/seeds";
import permissionGroupStatsICONS from "../utils/icons";

const usePermissionGroupStats = (data = samplePermissionGroupStatsData) => {
    const permissionGroupStatsConfig = useMemo(
        () => [
            {
                title: "Total Permission Groups",
                value: data.totalPermissionGroup || 0,
                subTitle: "All registered permission Groups",
                icon: permissionGroupStatsICONS.TOTAL_PERMISSION,
                hasDecrement: false,
                hasIncrement: true,
                color: "violet",
            },
            {
                title: "New Permission Groups",
                value: data?.newPermissionGroup || 0,
                subTitle: "Added in the last 30 days",
                icon: permissionGroupStatsICONS.NEW_PERMISSION,
                hasDecrement: false,
                hasIncrement: false,
                color: "orange",
            },
            {
                title: "Active Permission Groups",
                value: data?.activePermissionGroup || 0,
                subTitle: "Currently available",
                icon: permissionGroupStatsICONS.ACTIVE_PERMISSION,
                hasDecrement: false,
                hasIncrement: true,
                color: "green",
            },
            {
                title: "Inactive Permission Groups",
                value: data.inactivePermissionGroup || 0,
                subTitle: "Not currently active",
                icon: permissionGroupStatsICONS.INACTIVE_PERMISSION,
                hasDecrement: true,
                hasIncrement: false,
                color: "red",
            },
        ],
        [data]
    );
    return {
        permissionGroupStatsConfig,
    };
};

export default usePermissionGroupStats;
