import GlobalICONS from "@/lib/utils/icons";
import { useMemo } from "react";
import sampleCategoryDetails from "../utils/seeds";

const useCategoryDetails = (data = sampleCategoryDetails) => {
    const categoryDetailsConfig = useMemo(
        () => [
            {
                body: {
                    categoryName: data.name,
                    categoryCode: data.code,
                    categoryType: data.categoryType,
                    parentCategory: data.parentCategory,
                    displayOrder: data.displayOrder,
                    description: data.description,
                },
                grid: 3,
            },
        ],
        [data]
    );
    return {
        categoryDetailsConfig,
    };
};

export default useCategoryDetails;
