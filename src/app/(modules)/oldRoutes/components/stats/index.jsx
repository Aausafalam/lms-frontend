import React from "react";
import styles from "./styles/index.module.css";
import useRoutesStats from "./hooks/useRoutes";
import "./styles/index.css";
import StatCard from "@/components/StatCard";
import { useRoutes } from "@/services/context/routes";
const RoutesStats = () => {
    const { routesStats } = useRoutes();
    const { routesStatsConfig } = useRoutesStats();

    // useEffect(() => {
    //     routesStats.fetch({
    //         params: { module: "desktop" },
    //     });
    // }, []);

    return (
        <div className={styles.container}>
            {routesStatsConfig.map((item, index) => (
                <StatCard key={index} data={item} />
            ))}
        </div>
    );
};

export default RoutesStats;
