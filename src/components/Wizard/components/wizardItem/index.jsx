import React from "react";
import PropTypes from "prop-types";
import styles from "./index.module.css";
import GlobalICONS from "@/lib/utils/icons";

const WizardStep = (props) => {
    const { number = "1", icon = null, heading = "Account Details", subHeading = "Setup Account Details", arrowIcon = null, onChange, activeWizard = 1, lastWizardStep } = props;
    return (
        <div onClick={() => onChange(number)} className={`${styles.wizardStep} ${activeWizard === number ? styles.activeWizardStep : ""}`} role="listitem" aria-label={`Step ${number}`}>
            <div className={styles.wizardStep__number}>
                <h5>{icon || number}</h5>
            </div>
            <div className={styles.wizardStep__details}>
                <h2>{heading}</h2>
                <p>{subHeading}</p>
            </div>
            {!lastWizardStep && <div className={styles.wizardStep__arrow}>{arrowIcon || GlobalICONS.RIGHT_ARROW}</div>}
        </div>
    );
};

WizardStep.propTypes = {
    number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    icon: PropTypes.node,
    heading: PropTypes.string,
    subHeading: PropTypes.string,
    arrowIcon: PropTypes.node,
    onChange: PropTypes.func,
};

export default WizardStep;
