import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorMessageProps {
    title: string;
    message: string;
    onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ title, message, onRetry }) => {
    return (
        <div className="flex flex-col items-center justify-center p-8 bg-orange-50 border border-orange-200 rounded-lg  mx-auto dark:bg-gray-800 dark:border-gray-700 w-full">
            <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-4 dark:bg-orange-900/30">
                <AlertTriangle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>

            <h3 className="text-lg font-semibold text-orange-800 mb-2 text-center dark:text-orange-200">{title}</h3>

            <p className="text-orange-600 text-center mb-6 text-sm dark:text-orange-300">{message}</p>

            {onRetry && (
                <button
                    onClick={onRetry}
                    className="inline-flex items-center px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 transition-colors dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-500 dark:focus:ring-offset-gray-800"
                >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Try Again
                </button>
            )}
        </div>
    );
};
