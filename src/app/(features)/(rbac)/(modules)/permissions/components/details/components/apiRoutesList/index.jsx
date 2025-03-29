import React from "react";

const ApiRoutesList = ({ routes }) => {
    return (
        <div className="space-y-3">
            {routes.map((route, index) => (
                <RouteItem key={index} route={route} />
            ))}
        </div>
    );
};

const RouteItem = ({ route }) => {
    const methodColors = {
        GET: "bg-green-100 text-green-800",
        POST: "bg-blue-100 text-blue-800",
        PUT: "bg-yellow-100 text-yellow-800",
        DELETE: "bg-red-100 text-red-800",
        default: "bg-gray-100 text-gray-800",
    };

    return (
        <div className="p-3 bg-white rounded border border-gray-200">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-800">{route.path}</p>
                    <div className="flex items-center mt-1">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${methodColors[route.method] || methodColors.default}`}>{route.method}</span>
                        <p className="text-xs text-gray-500 ml-2">{route.name}</p>
                    </div>
                </div>
                <button className="text-gray-400 hover:text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default ApiRoutesList;
