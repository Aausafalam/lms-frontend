import { useMemo } from "react";
import { useCourse } from "@/services/context/course";
import GlobalUtils from "@/lib/utils";
import courseFormConfig from "../config";
import courseFormConstants from "../utils/constants";

const useCourseForm = (data, onSuccess) => {
    const { courseCreate, courseUpdate } = useCourse();

    const formConfig = useMemo(
        () =>
            courseFormConfig.map((field) => ({
                ...field,
                defaultValue: data?.[field.name] ?? field.defaultValue,
            })),
        [data]
    );

    const handleCourseFormSubmit = (formData) => {
        console.log("Course Form Submit:", formData);
        const options = courseFormConstants.formChangesValidateOptions;

        if (!data?.id) {
            return courseCreate.execute({ payload: formData, onSuccess });
        }

        if (GlobalUtils.hasFormChanges(formData, data, options)) {
            courseUpdate.execute({ payload: formData, onSuccess, dynamicRoute: data.id });
        }
    };

    return {
        courseFormConfig: formConfig,
        handleCourseFormSubmit,
        isCourseFormLoading: courseCreate.isLoading,
        courseFormErrors: courseCreate.errorMessages,
    };
};

export default useCourseForm;
