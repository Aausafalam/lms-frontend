import { useSearchParams, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

/**
 * Custom hook to extract query parameters from URL (Next.js App Router)
 * Handles SSR/hydration issues and provides type-safe query access
 *
 * @returns {Object} Query parameters object
 *
 * Usage:
 * const { courseId, userId } = useQueryParams();
 * const { courseId } = useQueryParams(['courseId']); // Only specific params
 */
export const useQueryParams = (specificParams = null) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const [query, setQuery] = useState({});
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (searchParams) {
            const currentQuery = {};

            // Convert URLSearchParams to object
            for (const [key, value] of searchParams.entries()) {
                // Handle multiple values with same key
                if (currentQuery[key]) {
                    if (Array.isArray(currentQuery[key])) {
                        currentQuery[key].push(value);
                    } else {
                        currentQuery[key] = [currentQuery[key], value];
                    }
                } else {
                    currentQuery[key] = value;
                }
            }

            // If specific parameters are requested, filter them
            if (specificParams && Array.isArray(specificParams)) {
                const filteredQuery = {};
                specificParams.forEach((param) => {
                    if (currentQuery[param] !== undefined) {
                        filteredQuery[param] = currentQuery[param];
                    }
                });
                setQuery(filteredQuery);
            } else {
                setQuery(currentQuery);
            }

            setIsReady(true);
        }
    }, [searchParams, pathname, specificParams]);

    // Helper function to get a specific parameter with default value
    const getParam = (key, defaultValue = null) => {
        const value = query[key];

        // Handle array values (when same param appears multiple times)
        if (Array.isArray(value)) {
            return value[0] || defaultValue;
        }

        return value || defaultValue;
    };

    // Helper function to get parameter as number
    const getNumericParam = (key, defaultValue = null) => {
        const value = getParam(key);
        if (value === null || value === undefined) return defaultValue;

        const numValue = Number(value);
        return isNaN(numValue) ? defaultValue : numValue;
    };

    // Helper function to get parameter as boolean
    const getBooleanParam = (key, defaultValue = false) => {
        const value = getParam(key);
        if (value === null || value === undefined) return defaultValue;

        return value === "true" || value === "1" || value === 1;
    };

    // Helper function to get array parameter
    const getArrayParam = (key, defaultValue = []) => {
        const value = query[key];
        if (!value) return defaultValue;

        return Array.isArray(value) ? value : [value];
    };

    // Helper function to check if parameter exists
    const hasParam = (key) => {
        return searchParams ? searchParams.has(key) : false;
    };

    // Helper function to get raw URLSearchParams value
    const getRawParam = (key) => {
        return searchParams ? searchParams.get(key) : null;
    };

    // Helper function to get all values for a parameter
    const getAllParams = (key) => {
        return searchParams ? searchParams.getAll(key) : [];
    };

    return {
        // Raw query object
        ...query,

        // Meta information
        isReady,
        isEmpty: Object.keys(query).length === 0,
        searchParams, // Expose raw searchParams for advanced use

        // Helper methods
        getParam,
        getNumericParam,
        getBooleanParam,
        getArrayParam,
        getRawParam,
        getAllParams,

        // Check if specific param exists
        hasParam,

        // Get all params as an array of [key, value] pairs
        getEntries: () => Object.entries(query),

        // Get all param keys
        getKeys: () => Object.keys(query),

        // Get all param values
        getValues: () => Object.values(query),

        // Convert back to URLSearchParams if needed
        toURLSearchParams: () => {
            const params = new URLSearchParams();
            Object.entries(query).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    value.forEach((v) => params.append(key, v));
                } else {
                    params.set(key, value);
                }
            });
            return params;
        },
    };
};

// Alternative hook with different API - returns individual params directly
export const useQueryParam = (paramName, defaultValue = null) => {
    const { getParam, isReady } = useQueryParams();

    return {
        value: getParam(paramName, defaultValue),
        isReady,
    };
};

// Hook for multiple specific parameters
export const useQueryMultiple = (...paramNames) => {
    const query = useQueryParams(paramNames);

    const result = {};
    paramNames.forEach((param) => {
        result[param] = query.getParam(param);
    });

    return {
        ...result,
        isReady: query.isReady,
    };
};

// Hook that must be wrapped in Suspense boundary for SSR
export const useQueryParamsSSR = (specificParams = null) => {
    const searchParams = useSearchParams();

    const query = {};

    // Convert URLSearchParams to object
    for (const [key, value] of searchParams.entries()) {
        if (query[key]) {
            if (Array.isArray(query[key])) {
                query[key].push(value);
            } else {
                query[key] = [query[key], value];
            }
        } else {
            query[key] = value;
        }
    }

    // If specific parameters are requested, filter them
    if (specificParams && Array.isArray(specificParams)) {
        const filteredQuery = {};
        specificParams.forEach((param) => {
            if (query[param] !== undefined) {
                filteredQuery[param] = query[param];
            }
        });
        return filteredQuery;
    }

    return query;
};
