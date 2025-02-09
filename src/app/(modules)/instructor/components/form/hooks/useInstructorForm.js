import { useMemo } from "react";
import { useInstructor } from "@/services/context/instructor";
import GlobalUtils from "@/lib/utils";
import instructorFormConfig from "../config";
import instructorFormConstants from "../utils/constants";

const useInstructorForm = (data, onSuccess) => {
    const { instructorCreate, instructorUpdate } = useInstructor();

    const formConfig = useMemo(
        () =>
            instructorFormConfig.map((field) => ({
                ...field,
                defaultValue: data?.[field.name] ?? field.defaultValue,
            })),
        [data]
    );

    const handleInstructorFormSubmit = (formData) => {
        console.log("Instructor Form Submit:", formData);
        const options = instructorFormConstants.formChangesValidateOptions;

        if (!data?.id) {
            return instructorCreate.execute({ payload: formData, onSuccess });
        }

        if (GlobalUtils.hasFormChanges(formData, data, options)) {
            instructorUpdate.execute({ payload: formData, onSuccess, dynamicRoute: data.id });
        }
    };

    return {
        instructorFormConfig: formConfig,
        handleInstructorFormSubmit,
        isInstructorFormLoading: instructorCreate.isLoading,
        instructorFormErrors: instructorCreate.errorMessages,
    };
};

export default useInstructorForm;
