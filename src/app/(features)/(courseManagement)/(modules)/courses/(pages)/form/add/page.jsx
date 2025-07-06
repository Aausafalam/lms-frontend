"use client";

import { useQueryParams } from "@/lib/hooks/useQuery";
import CourseFormBase from "..";

const AddCourse = () => {
    const { initialData } = useQueryParams();
    const data = initialData ? JSON.parse(decodeURIComponent(initialData)) : {};
    console.log("initialData", data);
    return <CourseFormBase initialData={data} />;
};

export default AddCourse;
