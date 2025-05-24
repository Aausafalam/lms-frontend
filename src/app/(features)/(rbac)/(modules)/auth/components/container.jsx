import React from "react";

const AuthContainer = ({ children, ...restProps }) => {
    return (
        <div className="bg-white/80 dark:bg-gray-900 backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-10 border border-white/50 dark:border-gray-800 w-full max-w-md" {...restProps}>
            {children}
        </div>
    );
};

export default AuthContainer;
