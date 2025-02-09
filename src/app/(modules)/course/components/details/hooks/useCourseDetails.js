import { useMemo } from "react";
import sampleCourseDetails from "../utils/seeds";
import generalInformationSection from "../../form/config/generalInfoConfig";
import mediaAndContentDetailsSection from "../../form/config/mediaAndContent";
import certificationAndCompletionSection from "../../form/config/certificationAndCompletion";
import requirementsAndLearningOutcomesDetailsSection from "../../form/config/requirementsAndLearningOutcomes";
import CourseDetailsUtils from "../utils";

const useCourseDetails = (data = sampleCourseDetails) => {
    const courseDetailsConfig = useMemo(
        () => [
            CourseDetailsUtils.mapSectionToDetails(generalInformationSection, data),
            CourseDetailsUtils.mapSectionToDetails(mediaAndContentDetailsSection, data),
            CourseDetailsUtils.mapSectionToDetails(certificationAndCompletionSection, data),
            CourseDetailsUtils.mapSectionToDetails(requirementsAndLearningOutcomesDetailsSection, data),
        ],
        [data]
    );

    return { courseDetailsConfig };
};

export default useCourseDetails;
