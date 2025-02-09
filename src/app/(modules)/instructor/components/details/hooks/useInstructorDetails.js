import { useMemo } from "react";
import sampleInstructorDetails from "../utils/seeds";
import generalInformationSection from "../../form/config/generalInfoConfig";
import professionalDetailsSection from "../../form/config/professionalDetailsConfig";
import socialProfilesSection from "../../form/config/socialProfilesConfig";
import InstructorDetailsUtils from "../utils";

const useInstructorDetails = (data = sampleInstructorDetails) => {
    const instructorDetailsConfig = useMemo(
        () => [
            InstructorDetailsUtils.mapSectionToDetails(generalInformationSection, data),
            InstructorDetailsUtils.mapSectionToDetails(professionalDetailsSection, data),
            InstructorDetailsUtils.mapSectionToDetails(socialProfilesSection, data),
        ],
        [data]
    );

    return { instructorDetailsConfig };
};

export default useInstructorDetails;
