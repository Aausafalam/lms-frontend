"use client";
import { StatsCard } from "@/components/statCard";
import apiClient from "@/services/api/config";
import { useState, useEffect, useCallback } from "react";
import { RefreshCw } from "lucide-react";

// Skeleton component for stats card
const StatsCardSkeleton = () => (
    <div className="bg-white rounded-lg shadow p-6 animate-pulse dark:bg-gray-800">
        <div className="flex justify-between items-start">
            <div className="w-3/4">
                <div className="h-4 bg-gray-200 dark:bg-gray-500 rounded w-3/4 mb-3"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-500 rounded w-1/2"></div>
            </div>
            <div className="rounded-full bg-gray-200 dark:bg-gray-500 p-2 w-10 h-10"></div>
        </div>
    </div>
);

const Stats = ({
    generateData,
    className,
    refreshInterval = 0, // In milliseconds, 0 means no auto-refresh
    showRefreshButton = false,
    emptyState = "No data available",
    loadingComponent,
    errorComponent,
    onDataLoaded,
    onError,
    ...restProps
}) => {
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true); // Start with loading true
    const [error, setError] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(null);

    const fetchData = useCallback(async () => {
        const config = generateData();

        // Set default stats from static data before API call
        if (config.gridItems && !stats.length) {
            setStats(config.gridItems);
        }

        if (!config.url) {
            setLoading(false);
            return; // No URL provided, just use static data
        }

        setLoading(true);
        try {
            // Handle different request methods with proper parameter passing
            let response;
            const requestConfig = {
                params: config.params || {},
                headers: config.headers || { "Content-Type": "application/json" },
            };

            if (["post", "put", "patch"].includes(config.method?.toLowerCase())) {
                response = await apiClient[config.method?.toLowerCase() || "get"](config.url, config.body || {}, requestConfig);
            } else {
                response = await apiClient[config.method?.toLowerCase() || "get"](config.url, requestConfig);
            }

            // Check if response has expected format
            const responseData = response?.data?.items || response?.data || [];
            setStats(responseData);
            setLastUpdated(new Date());

            if (onDataLoaded) {
                onDataLoaded(responseData);
            }
        } catch (err) {
            setError(err.message || "Error fetching data");

            if (onError) {
                onError(err);
            }
        } finally {
            setLoading(false);
        }
    }, [generateData, onDataLoaded, onError, stats.length]);

    // Initial fetch
    useEffect(() => {
        fetchData();
    }, []);

    // Set up refresh interval if specified
    useEffect(() => {
        if (refreshInterval > 0) {
            const intervalId = setInterval(fetchData, refreshInterval);
            return () => clearInterval(intervalId);
        }
    }, [refreshInterval, fetchData]);

    const config = generateData();
    const gridCols = config.grid || stats.length || 4; // Default to 4 columns for skeleton

    const gridClassName =
        {
            1: "grid-cols-1",
            2: "grid-cols-1 sm:grid-cols-2",
            3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
            4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
            5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5",
            6: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
        }[gridCols] || "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";

    // Custom loading component if provided
    if (loading && loadingComponent) {
        return loadingComponent;
    }

    // Show skeleton loading state
    if (loading && stats.length === 0) {
        return (
            <div className={`grid ${gridClassName} gap-5 ${className || ""}`} {...restProps}>
                {[...Array(gridCols)].map((_, index) => (
                    <StatsCardSkeleton key={`skeleton-${index}`} />
                ))}
            </div>
        );
    }

    // Custom or default error component
    if (error && stats.length === 0) {
        return errorComponent || <div className="text-red-500 py-4">Error loading stats: {error}</div>;
    }

    // Empty state
    if (!loading && !error && stats.length === 0) {
        return <div className="text-gray-500 py-8 text-center">{emptyState}</div>;
    }

    return (
        <div className={`relative ${className || ""}`} {...restProps}>
            {/* Refresh button */}
            {showRefreshButton && (
                <div className="absolute top-0 right-0 mb-4 z-10">
                    <button onClick={fetchData} disabled={loading} className="p-2 text-gray-600 hover:text-blue-600 transition-colors rounded-full hover:bg-gray-100" title="Refresh data">
                        <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                    </button>
                </div>
            )}

            {/* Stats grid */}
            <div className={`grid ${gridClassName} gap-5`}>
                {stats.map((stat, index) => (
                    <StatsCard key={`stat-card-${index}`} title={stat.title} value={stat.value} icon={stat.icon} variant={stat.variant} trend={stat.trend} />
                ))}
            </div>

            {/* Last updated timestamp */}
            {lastUpdated && <div className="text-xs text-gray-500 mt-2 text-right">Last updated: {lastUpdated.toLocaleTimeString()}</div>}

            {/* Show loading overlay during refresh if we already have data */}
            {loading && stats.length > 0 && (
                <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
                    <div className="animate-pulse text-blue-500">Refreshing...</div>
                </div>
            )}
        </div>
    );
};

export default Stats;
