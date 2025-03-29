import { useMemo } from "react";
import samplePermissionGroupDetails from "../utils/seeds";
import generalInformationSection from "../../form/config/generalInfoConfig";
import PermissionGroupDetailsUtils from "../utils";

const usePermissionGroupDetails = (data = samplePermissionGroupDetails) => {
    const permissionGroupDetailsConfig = useMemo(() => [PermissionGroupDetailsUtils.mapSectionToDetails(generalInformationSection(), data)], [data]);

    return { permissionGroupDetailsConfig };
};

export default usePermissionGroupDetails;
