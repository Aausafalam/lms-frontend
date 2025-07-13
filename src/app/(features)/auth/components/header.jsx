import React from "react";

const AuthHeader = ({ title, description, children, ...restProps }) => {
    return (
        <div {...restProps}>
            <div className="lg:hidden mb-8 flex justify-center">
                <div className="bg-gradient-to-br from-orange-500 to-red-600 dark:from-orange-600 dark:to-red-500 text-white  font-bold text-xl p-3 rounded-lg shadow-lg flex items-center">
                    <span className="mr-2 text-2xl">🎓</span>
                    LOGO
                </div>
            </div>
            <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">{title}</h2>
            <p className="text-gray-600 mb-8 dark:text-gray-300">{description}</p>
            {children}
        </div>
    );
};

export default AuthHeader;
