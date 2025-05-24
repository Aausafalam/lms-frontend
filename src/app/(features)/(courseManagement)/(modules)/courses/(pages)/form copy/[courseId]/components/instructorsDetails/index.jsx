import apiConstants from "@/services/utils/constants";
import React, { useMemo } from "react";
import DynamicForm from "@/components/form";
import GlobalICONS from "@/lib/utils/icons";
import InstructorsDetailsConfig from "../../config/instructorsDetails";

const InstructorDetails = ({ courseId, handleNextTab }) => {
    const formData = useMemo(() => InstructorsDetailsConfig, []);
    const formButtons = useMemo(
        () => [
            {
                label: "Save and Next",
                type: "Submit",
                loading: false,
                icon: GlobalICONS.ARROW_RIGHT,
                iconPosition: "right",
                action: {
                    route: courseId ? `${apiConstants.course.BASE_ROUTE}/${courseId}` : `${apiConstants.roles.BASE_ROUTE}`,
                    method: courseId ? "put" : "post",
                },
            },
        ],
        [courseId]
    );

    return (
        <div className="w-full  bg-white p-8 rounded-lg  dark:bg-gray-800 shadow-md">
            <DynamicForm onSuccess={handleNextTab} key={"course-basic-details-form"} formData={formData} formButtons={formButtons} formId={"course-basic-details-form"} />
        </div>
    );
};

export default InstructorDetails;
