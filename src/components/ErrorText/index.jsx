import React from "react";
import styles from "./index.module.css";
const ErrorText = ({ message }) => {
    return (
        message && (
            <div className={styles.container}>
                <p>{typeof message === "string" ? message : JSON.stringify(message)}</p>
            </div>
        )
    );
};

export default ErrorText;
