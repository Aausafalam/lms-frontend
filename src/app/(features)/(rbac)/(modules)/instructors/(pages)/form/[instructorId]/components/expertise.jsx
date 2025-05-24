import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, XCircle } from "lucide-react";
const InstructorExpertiseForm = ({ formData, handleChange, setFormData }) => {
    // State for new expertise item
    const [newExpertise, setNewExpertise] = useState("");

    // Add new expertise
    const handleAddExpertise = () => {
        if (newExpertise.trim() && !formData.expertise.includes(newExpertise.trim())) {
            setFormData({
                ...formData,
                expertise: [...formData.expertise, newExpertise.trim()],
            });
            setNewExpertise("");
        }
    };
    // Remove expertise
    const handleRemoveExpertise = (skill) => {
        setFormData({
            ...formData,
            expertise: formData.expertise.filter((item) => item !== skill),
        });
    };
    return (
        <div className="space-y-6 p-4">
            <div className="flex gap-2">
                <Input
                    value={newExpertise}
                    onChange={(e) => setNewExpertise(e.target.value)}
                    placeholder="Add a skill or expertise area"
                    className="flex-1 dark:bg-gray-900 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddExpertise();
                        }
                    }}
                />
                <Button type="button" onClick={handleAddExpertise}>
                    <Plus className="h-4 w-4" />
                    Add
                </Button>
            </div>

            <div className="flex flex-wrap gap-2 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg min-h-[120px] border border-gray-200 dark:border-gray-700 shadow-inner">
                {formData.expertise.length > 0 ? (
                    formData.expertise.map((skill) => (
                        <div
                            key={skill}
                            className="flex items-center bg-white dark:bg-gray-800 px-3 py-1.5 rounded-full border dark:border-gray-700 text-sm shadow-sm hover:shadow-md transition-all duration-200 h-fit"
                        >
                            <span className="dark:text-gray-200">{skill}</span>
                            <button type="button" onClick={() => handleRemoveExpertise(skill)} className="ml-2 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200">
                                <XCircle className="h-4 w-4" />
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">No expertise added yet</div>
                )}
            </div>

            <Textarea
                id="methodology"
                name="methodology"
                value={formData.methodology || ""}
                onChange={handleChange}
                label="Teaching Methodology"
                placeholder="Describe your teaching approach and methodology..."
                rows={4}
                className="dark:bg-gray-900 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
            />
        </div>
    );
};

export default InstructorExpertiseForm;
