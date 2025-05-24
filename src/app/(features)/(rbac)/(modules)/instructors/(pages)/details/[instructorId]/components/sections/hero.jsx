import Image from "next/image";
import React from "react";

const InstructorHero = ({ instructor }) => {
    return (
        <div className="relative h-56 md:h-72 w-full rounded-xl overflow-hidden shadow-lg">
            <Image
                src={
                    instructor.profileBanner ||
                    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
                }
                alt="Profile banner"
                fill
                className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
    );
};

export default InstructorHero;
