import { Upload } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const InstructorBasicInfoForm = ({ formData, handleChange }) => {
    return (
        <div className="space-y-6 p-4">
            {/* <h3 className="text-lg font-medium text-gray-900 dark:text-white">Basic Information</h3> */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 align-middle">
                <div className="md:col-span-2 flex flex-col md:flex-row gap-6 items-start">
                    <div className="relative h-40 w-40 rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700 shadow-md group">
                        <Image
                            src={
                                formData.imageUrl ||
                                "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                            }
                            alt="Profile preview"
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <Upload className="h-8 w-8 text-white" />
                        </div>
                    </div>
                    <div className="space-y-4 flex-1">
                        <Input id="imageUrl" name="imageUrl" label="Profile Image URL" value={formData.imageUrl} onChange={handleChange} placeholder="https://example.com/image.jpg" />
                        <div>
                            <Button type="button" variant="outline" className="dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 shadow-sm hover:shadow-md transition-all duration-200">
                                <Upload className="h-4 w-4 mr-2" />
                                Upload Image
                            </Button>
                        </div>
                    </div>
                </div>

                <Input id="name" name="name" value={formData.name} onChange={handleChange} label="Full Name" placeholder="Enter instructor's full name" required />

                <Input id="title" name="title" label="Job Title" value={formData.title} onChange={handleChange} placeholder="e.g. Senior Data Science Instructor" required />

                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="email@example.com" required label="Email Address " />

                <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 (555) 123-4567" label="Phone Number" />

                <Textarea label="Biography" id="bio" name="bio" value={formData.bio} onChange={handleChange} placeholder="Write a detailed biography of the instructor..." rows={4} required />
            </div>
        </div>
    );
};

export default InstructorBasicInfoForm;
