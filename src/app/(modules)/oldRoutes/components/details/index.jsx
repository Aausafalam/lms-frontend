import React from "react";
import styles from "./styles/index.module.css";
import "./styles/index.css";
import useRoutesDetails from "./hooks/useRoutesDetails";
import Details from "@/components/details";
import { useRoutes } from "@/services/context/routes";
import sampleRoutesDetails from "./utils/seeds";

const RoutesDetails = () => {
    const { routesDetails } = useRoutes();
    const { routesDetailsConfig } = useRoutesDetails(sampleRoutesDetails);
    return (
        <div className={styles.container}>
            <Details data={routesDetailsConfig} />
        </div>
    );
};

export default RoutesDetails;
