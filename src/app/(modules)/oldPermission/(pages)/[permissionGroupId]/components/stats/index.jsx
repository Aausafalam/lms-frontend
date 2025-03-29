import React from "react";
import styles from "./styles/index.module.css";
import usePermissionStats from "./hooks/usePermissionStats";
import "./styles/index.css";
import StatCard from "@/components/StatCard";
import { usePermission } from "@/services/context/permission";
const PermissionStats = () => {
    const { permissionStats } = usePermission();
    const { permissionStatsConfig } = usePermissionStats();

    // useEffect(() => {
    //     permissionStats.fetch({
    //         params: { module: "desktop" },
    //     });
    // }, []);

    return (
        <div className={styles.container}>
            {permissionStatsConfig.map((item, index) => (
                <StatCard key={index} data={item} />
            ))}
        </div>
    );
};

export default PermissionStats;
