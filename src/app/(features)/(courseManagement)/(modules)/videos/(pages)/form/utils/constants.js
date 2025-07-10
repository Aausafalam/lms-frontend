import { Lightbulb, Zap, Flame, Award, Laptop, Palette, Target, Briefcase, FlaskRoundIcon as Flask, Languages, Paintbrush } from "lucide-react";

/**
 * Video form utility constants and configurations
 * @description Centralized configuration for form options and data
 */
const VideoFormUtils = {
    instructors: [
        { id: "1", name: "Dr. Jane Smith", role: "Lead Instructor", avatar: "/placeholder.svg?height=40&width=40" },
        { id: "2", name: "Prof. John Doe", role: "Subject Expert", avatar: "/placeholder.svg?height=40&width=40" },
        { id: "3", name: "Dr. Emily Johnson", role: "Video Designer", avatar: "/placeholder.svg?height=40&width=40" },
        { id: "4", name: "Prof. Michael Brown", role: "Guest Lecturer", avatar: "/placeholder.svg?height=40&width=40" },
        { id: "5", name: "Dr. Sarah Williams", role: "Teaching Assistant", avatar: "/placeholder.svg?height=40&width=40" },
    ],

    tags: [
        { id: "1", name: "Bestseller" },
        { id: "2", name: "New" },
        { id: "3", name: "Popular" },
        { id: "4", name: "Trending" },
        { id: "5", name: "Featured" },
        { id: "6", name: "Staff Pick" },
    ],
    languages: [
        { label: "English", value: "en" },
        { label: "Spanish", value: "es" },
        { label: "French", value: "fr" },
        { label: "German", value: "de" },
        { label: "Chinese", value: "zh" },
        { label: "Japanese", value: "ja" },
        { label: "Hindi", value: "hi" },
    ],
};

export default VideoFormUtils;
