import apiConstants from "@/services/utils/constants";
import React, { useMemo } from "react";
import DynamicForm from "@/components/form";
import GlobalICONS from "@/lib/utils/icons";
import PricingConfig from "../../config/priceDetails";

const PriceDetails = ({ courseId, handleNextTab }) => {
    const formData = useMemo(() => PricingConfig, []);
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
        <div className="w-full bg-white p-6 rounded-lg  dark:bg-gray-800 shadow-md">
            <DynamicForm onSuccess={handleNextTab} key={"course-price-details-form"} formData={formData} formButtons={formButtons} formId={"course-price-details-form"} />
        </div>
    );
};

export default PriceDetails;
