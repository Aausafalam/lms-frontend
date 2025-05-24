import { Button } from "@/components/ui/button";
import { Pencil, Star, Trash2 } from "lucide-react";
import Image from "next/image";
import React from "react";

const InstructorBasicInfo = ({ instructor, onEdit, onDelete }) => {
    return (
        <div className="relative px-4 sm:px-6 -mt-28">
            <div className="flex flex-col md:flex-row gap-6">
                {/* Profile image */}
                <div className="relative h-28 w-28 rounded-xl overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl">
                    <Image src={instructor.imageUrl || "/placeholder.svg"} alt={instructor.name} fill className="object-cover" />
                </div>

                {/* Basic info */}
                <div className="flex flex-col md:flex-row justify-between w-full">
                    <div className="space-y-1 pt-2">
                        <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">{instructor.name}</h1>
                        <p className="text-orange-500 dark:text-orange-400 font-medium text-sm">{instructor.title}</p>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-sm">
                            <span className="flex items-center">
                                <Star className="h-4 w-4 fill-amber-500 text-amber-500 mr-1" />
                                {instructor.rating} Rating
                            </span>
                            <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></span>
                            <span>{instructor.courses} Courses</span>
                            <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></span>
                            <span>{instructor.students.toLocaleString()} Students</span>
                        </div>
                    </div>

                    <div className="flex gap-3 mt-4 md:mt-0">
                        <Button
                            variant="outline"
                            className="text-orange-600 border-orange-200 hover:bg-orange-50 dark:text-orange-400 dark:border-orange-900 dark:hover:bg-orange-900/20 shadow-sm"
                            onClick={onEdit}
                        >
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit
                        </Button>

                        <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-900 dark:hover:bg-red-900/20 shadow-sm" onClick={onDelete}>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstructorBasicInfo;
