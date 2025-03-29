import React from "react";

const AuthHeader = ({ title, description, children, ...restProps }) => {
    return (
        <div {...restProps}>
            <div className="lg:hidden mb-8 flex justify-center">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white font-bold text-xl p-3 rounded-lg shadow-lg flex items-center">
                    <span className="mr-2 text-2xl">🎓</span>
                    LOGO
                </div>
            </div>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">{title}</h2>
            <p className="text-gray-600 mb-8">{description}</p>
            {children}
        </div>
    );
};

export default AuthHeader;
