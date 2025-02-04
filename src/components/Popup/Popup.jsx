import React from "react";
import styles from "./index.module.css";
import GlobalICONS from "@/lib/utils/icons";

const Modal = ({ show, onClose, title, icon, description, children, maxWidth, style, position }) => {
    if (!show) return null;

    return (
        <div className={`${styles.modal_overlay} ${styles[`modal_position_${position || "center"}`]}`}>
            <div className={styles.modal_content} style={{ ...style, maxWidth: maxWidth, maxHeight: "100vh", overflow: "auto" }}>
                <div className={styles.modal_header}>
                    <div className={styles.modal_title}>
                        {icon && <span> {icon}</span>}
                        <p>
                            <span> {title}</span> {description && <span className={styles.modal_description}>{description}</span>}
                        </p>
                    </div>
                    <span className={styles.modal_close_icon} onClick={onClose} aria-label="Close">
                        {GlobalICONS.CLOSE}
                    </span>
                </div>
                <div className={styles.modal_body}>{children}</div>
            </div>
        </div>
    );
};

export default Modal;
