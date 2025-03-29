import React from "react";
import styles from "./styles/index.module.css";
import usePermissionGroupStats from "./hooks/usePermissionGroupStats";
import "./styles/index.css";
import StatCard from "@/components/StatCard";
import { usePermissionGroup } from "@/services/context/permissionGroup";
const PermissionGroupStats = () => {
    const { permissionGroupStats } = usePermissionGroup();
    const { permissionGroupStatsConfig } = usePermissionGroupStats();

    // useEffect(() => {
    //     permissionGroupStats.fetch({
    //         params: { module: "desktop" },
    //     });
    // }, []);

    return (
        <div className={styles.container}>
            {permissionGroupStatsConfig.map((item, index) => (
                <StatCard key={index} data={item} />
            ))}
        </div>
    );
};

export default PermissionGroupStats;
