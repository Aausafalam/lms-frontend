import React from "react";
import styles from "./styles/index.module.css";
import "./styles/index.css";
import usePermissionGroupDetails from "./hooks/usePermissionGroupDetails";
import Details from "@/components/details";
import { usePermissionGroup } from "@/services/context/permissionGroup";
import samplePermissionGroupDetails from "./utils/seeds";

const PermissionGroupDetails = () => {
    const { permissionGroupDetails } = usePermissionGroup();
    const { permissionGroupDetailsConfig } = usePermissionGroupDetails(samplePermissionGroupDetails);
    return (
        <div className={styles.container}>
            <Details data={permissionGroupDetailsConfig} />
        </div>
    );
};

export default PermissionGroupDetails;
