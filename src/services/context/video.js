"use client";

import { createContext, useContext } from "react";
import { useVideoCreate, useVideoDelete, useVideoGetDetails, useVideoGetStats, useVideoUpdate } from "../hooks/video";

const VideoContext = createContext(null);

export const VideoProvider = ({ children, initialData = { videoList: [] } }) => {
    const useVideoCreateState = useVideoCreate();
    const useVideoUpdateState = useVideoUpdate();
    const useVideoGetDetailsState = useVideoGetDetails();
    const useVideoDeleteState = useVideoDelete();
    const useVideoGetStatsState = useVideoGetStats();

    return (
        <VideoContext.Provider
            value={{
                ...useVideoCreateState,
                ...useVideoUpdateState,
                ...useVideoGetDetailsState,
                ...useVideoDeleteState,
                ...useVideoGetStatsState,
            }}
        >
            {children}
        </VideoContext.Provider>
    );
};

export const useVideo = () => {
    const context = useContext(VideoContext);
    if (context === null) {
        throw new Error("useVideo must be used within a VideoProvider");
    }
    return context;
};
