import React from "react";
import styles from "./index.module.css";
import Image from "next/image";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const DataNotFound = ({ message = "No Data Available", imageUrl = require("./assets/empty.png"), textStyle = {} }) => {
    return (
        <div className={styles.container}>
            <Image width={1000} height={1000} src={imageUrl} alt="No data found" className={styles.image} />
            <h3 className={styles.message} style={textStyle}>
                {message}
            </h3>
        </div>
    );
};

export default DataNotFound;
