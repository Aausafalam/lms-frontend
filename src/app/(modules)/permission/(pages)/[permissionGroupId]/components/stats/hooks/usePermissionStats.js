import { useMemo } from "react";
import samplePermissionStatsData from "../utils/seeds";
import permissionStatsICONS from "../utils/icons";

const usePermissionStats = (data = samplePermissionStatsData) => {
    const permissionStatsConfig = useMemo(
        () => [
            {
                title: "Total Permission",
                value: data.totalPermission || 0,
                subTitle: "All registered permission s",
                icon: permissionStatsICONS.TOTAL_PERMISSION,
                hasDecrement: false,
                hasIncrement: true,
                color: "violet",
            },
            {
                title: "New Permission",
                value: data?.newPermission || 0,
                subTitle: "Added in the last 30 days",
                icon: permissionStatsICONS.NEW_PERMISSION,
                hasDecrement: false,
                hasIncrement: false,
                color: "orange",
            },
            {
                title: "Active Permission",
                value: data?.activePermission || 0,
                subTitle: "Currently available",
                icon: permissionStatsICONS.ACTIVE_PERMISSION,
                hasDecrement: false,
                hasIncrement: true,
                color: "green",
            },
            {
                title: "Inactive Permission",
                value: data.inactivePermission || 0,
                subTitle: "Not currently active",
                icon: permissionStatsICONS.INACTIVE_PERMISSION,
                hasDecrement: true,
                hasIncrement: false,
                color: "red",
            },
        ],
        [data]
    );
    return {
        permissionStatsConfig,
    };
};

export default usePermissionStats;
