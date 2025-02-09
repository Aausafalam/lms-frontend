import React from "react";
import styles from "./styles/index.module.css";
import "./styles/index.css";
import useCategoryDetails from "./hooks/useCategoryDetails";
import Details from "@/components/details";

const CategoryDetails = ({ data }) => {
    const { categoryDetailsConfig } = useCategoryDetails(data);
    return (
        <div className={styles.container}>
            <Details data={categoryDetailsConfig} />
        </div>
    );
};

export default CategoryDetails;
