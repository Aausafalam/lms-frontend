import React from "react";
import styles from "./index.module.css";
import Link from "next/link";
import GlobalICONS from "@/lib/utils/icons";

const Breadcrumb = ({ title, items }) => {
    if (!items || items.length === 0) return null;

    return (
        <nav aria-label="breadcrumb" className={styles.breadcrumbContainer}>
            <h2>{title}</h2>
            <ol className={styles.breadcrumb}>
                {items.map((item, index) => (
                    <li key={index} className={index === items.length - 1 ? styles.active : styles.item}>
                        {index !== items.length - 1 ? (
                            <Link href={item.url} className={styles.link}>
                                {item.label}
                            </Link>
                        ) : (
                            <span>{item.label}</span>
                        )}
                        {GlobalICONS.RIGHT_ARROW}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
