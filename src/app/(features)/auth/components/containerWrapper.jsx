import React from "react";

const AuthContainerWrapper = ({ children, ...restProps }) => {
    return (
        <div className="m-auto w-full flex items-center justify-center p-2  md:p-10" {...restProps}>
            {children}
        </div>
    );
};

export default AuthContainerWrapper;
