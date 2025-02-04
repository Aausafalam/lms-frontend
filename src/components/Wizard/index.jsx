import React, { useState } from "react";
import styles from "./index.module.css";
import "./root.css";
import WizardStep from "./components/wizardItem";
import GlobalICONS from "@/lib/utils/icons";

const Wizard = ({ wizardData, activeWizardStep, handleWizardChange }) => {
    return (
        <div className={styles.container}>
            <div className={styles.body}>
                <div>
                    {" "}
                    {/* {wizardData.map((wizardItem) => (
                        <WizardStep
                            heading={wizardItem.heading}
                            subHeading={wizardItem.subHeading}
                            icon={wizardItem.icon}
                            number={wizardItem.number}
                            onChange={handleWizardChange}
                            activeWizard={activeWizardStep}
                            lastWizardStep={wizardItem.lastWizardStep}
                        />
                    ))} */}
                </div>
            </div>
            {/* <div className={styles.content}> {wizardData[activeWizardStep - 1].form}</div> */}
        </div>
    );
};

export default Wizard;
