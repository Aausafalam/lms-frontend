"use client";

import { memo } from "react";
import { FileText, User, Upload, X, Camera } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { FormSection } from "@/components/formSection";
import { useState } from "react";

export const BasicInfoSection = memo(function BasicInfoSection({ sectionRef, isActive, formData = {}, handlers = {} }) {
    const { handleInputChange } = handlers;
    const [profilePreview, setProfilePreview] = useState(formData.profilePic || null);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageUrl = e.target.result;
                setProfilePreview(imageUrl);
                handleInputChange({
                    target: {
                        name: "profilePic",
                        value: imageUrl,
                    },
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const removeProfilePic = () => {
        setProfilePreview(null);
        handleInputChange({
            target: {
                name: "profilePic",
                value: "",
            },
        });
    };

    const genderOptions = [
        { label: "Male", value: "MALE" },
        { label: "Female", value: "FEMALE" },
        { label: "Other", value: "OTHER" },
        { label: "Prefer not to say", value: "PREFER_NOT_TO_SAY" },
    ];

    const statusOptions = [
        { label: "Active", value: "ACTIVE" },
        { label: "Inactive", value: "INACTIVE" },
        { label: "Suspended", value: "SUSPENDED" },
        { label: "Pending", value: "PENDING" },
    ];

    return (
        <FormSection id="basic" title="Basic Information" icon={<FileText className="h-5 w-5" />} description="Enter the essential details about the user" sectionRef={sectionRef} isActive={isActive}>
            <div className="space-y-6">
                {/* Profile Picture */}
                <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                        {profilePreview ? (
                            <div className="relative">
                                <img src={profilePreview || "/placeholder.svg"} alt="Profile preview" className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg" />
                                <button
                                    type="button"
                                    onClick={removeProfilePic}
                                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        ) : (
                            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                                <Camera className="w-8 h-8 text-gray-400" />
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <label className="cursor-pointer bg-orange-50 text-orange-600 px-4 py-2 rounded-lg border border-orange-200 hover:bg-orange-100 transition-colors flex items-center gap-2">
                            <Upload className="w-4 h-4" />
                            Upload Photo
                            <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                        </label>
                        <p className="text-xs text-gray-500">JPG, PNG or GIF (max. 2MB)</p>
                    </div>
                </div>

                <Input
                    label="Full Name"
                    labelIcon={<User className="h-3.5 w-3.5" />}
                    id="name"
                    name="name"
                    placeholder="Enter full name"
                    value={formData.name || ""}
                    onChange={handleInputChange}
                    required
                    helperText="Enter the user's full name"
                    error={!formData.name ? "Full name is required" : ""}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Select
                        label="Gender"
                        labelIcon={<User className="h-3.5 w-3.5" />}
                        name="gender"
                        placeholder="Select gender"
                        value={formData.gender || "PREFER_NOT_TO_SAY"}
                        onChange={handleInputChange}
                        options={genderOptions}
                        helperText="Select the user's gender"
                    />

                    <Select
                        label="Status"
                        labelIcon={<User className="h-3.5 w-3.5" />}
                        name="status"
                        placeholder="Select status"
                        value={formData.status || "ACTIVE"}
                        onChange={handleInputChange}
                        options={statusOptions}
                        required
                        helperText="Set the user's account status"
                        error={!formData.status ? "Status is required" : ""}
                    />
                </div>
            </div>
        </FormSection>
    );
});
