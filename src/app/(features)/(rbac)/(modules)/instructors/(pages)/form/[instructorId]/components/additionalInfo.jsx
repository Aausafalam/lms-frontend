import React from "react";

import { useState } from "react";
import { Plus, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SelectField, { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const InstructorAdditionalInfoForm = ({ formData, handleChange, setFormData }) => {
    // Handle select changes
    const handleSelectChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };
    // Handle social links changes
    const handleSocialLinkChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            socialLinks: {
                ...formData.socialLinks,
                [name]: value,
            },
        });
    };
    return (
        <div className="space-y-6 p-4">
            {/* <h3 className="text-lg font-medium text-gray-900 dark:text-white">Additional Information</h3> */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SelectField
                    value={formData.availability}
                    onChange={(event) => handleSelectChange(event.target.name, event.target.value)}
                    label="Availability"
                    placeholder="Select availability"
                    options={[
                        { label: "Full-time", value: "Full-time" },
                        { label: "Part-time", value: "Part-time" },
                        { label: "Contract", value: "Contract" },
                        { label: "Freelance", value: "Freelance" },
                    ]}
                    name={"availability"}
                />

                <Input
                    id="joinedDate"
                    label="Joined Date"
                    name="joinedDate"
                    type="date"
                    value={formData.joinedDate}
                    onChange={handleChange}
                    className="dark:bg-gray-900 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                />
            </div>

            <div className="space-y-4">
                <h4 className="text-base font-medium text-gray-900 dark:text-white">Social Links</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        id="linkedin"
                        name="linkedin"
                        label="LinkedIn"
                        value={formData.socialLinks.linkedin}
                        onChange={handleSocialLinkChange}
                        placeholder="https://linkedin.com/in/username"
                        className="dark:bg-gray-900 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                    />

                    <Input
                        id="twitter"
                        name="twitter"
                        label="Twitter"
                        value={formData.socialLinks.twitter}
                        onChange={handleSocialLinkChange}
                        placeholder="https://twitter.com/username"
                        className="dark:bg-gray-900 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                    />

                    <Input
                        id="github"
                        name="github"
                        label="GitHub"
                        value={formData.socialLinks.github}
                        onChange={handleSocialLinkChange}
                        placeholder="https://github.com/username"
                        className="dark:bg-gray-900 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                    />

                    <Input
                        id="website"
                        name="website"
                        label="Personal Website"
                        value={formData.socialLinks.website}
                        onChange={handleSocialLinkChange}
                        placeholder="https://example.com"
                        className="dark:bg-gray-900 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                    />
                </div>
            </div>
        </div>
    );
};

export default InstructorAdditionalInfoForm;
