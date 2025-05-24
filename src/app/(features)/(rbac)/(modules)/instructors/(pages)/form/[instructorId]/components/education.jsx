import React from "react";

import { useState } from "react";
import { Plus, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const InstructorEducationForm = ({ formData, setFormData }) => {
    // State for new education item
    const [newEducation, setNewEducation] = useState({
        degree: "",
        institution: "",
        year: "",
    });

    // State for new certification item
    const [newCertification, setNewCertification] = useState({
        name: "",
        issuer: "",
        date: "",
    });

    // Add new education
    const handleAddEducation = () => {
        if (newEducation.degree.trim() && newEducation.institution.trim()) {
            setFormData({
                ...formData,
                education: [...(formData.education || []), { ...newEducation }],
            });
            setNewEducation({ degree: "", institution: "", year: "" });
        }
    };

    // Remove education
    const handleRemoveEducation = (index) => {
        setFormData({
            ...formData,
            education: formData.education?.filter((_, i) => i !== index) || [],
        });
    };

    // Add new certification
    const handleAddCertification = () => {
        if (newCertification.name.trim() && newCertification.issuer.trim()) {
            setFormData({
                ...formData,
                certifications: [...(formData.certifications || []), { ...newCertification }],
            });
            setNewCertification({ name: "", issuer: "", date: "" });
        }
    };

    // Remove certification
    const handleRemoveCertification = (index) => {
        setFormData({
            ...formData,
            certifications: formData.certifications?.filter((_, i) => i !== index) || [],
        });
    };

    return (
        <div className="space-y-6 p-4">
            <div className="space-y-6">
                <div className="space-y-4">
                    <h4 className="text-base font-medium text-gray-900 dark:text-white">Education</h4>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Input
                            label="Degree/Program"
                            id="edu-degree"
                            value={newEducation.degree}
                            onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                            placeholder="e.g. Ph.D. in Computer Science"
                            className="dark:bg-gray-900 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                        />

                        <Input
                            id="edu-institution"
                            value={newEducation.institution}
                            label="Institution"
                            onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
                            placeholder="e.g. Stanford University"
                            className="dark:bg-gray-900 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                        />

                        <Input
                            id="edu-year"
                            value={newEducation.year}
                            label="Year"
                            onChange={(e) => setNewEducation({ ...newEducation, year: e.target.value })}
                            placeholder="e.g. 2015"
                            className="dark:bg-gray-900 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                        />
                    </div>

                    <Button
                        type="button"
                        onClick={handleAddEducation}
                        variant="outline"
                        className="dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 shadow-sm hover:shadow-md transition-all duration-200"
                    >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Education
                    </Button>

                    <div className="space-y-2 mt-4">
                        {formData.education && formData.education.length > 0 ? (
                            formData.education.map((edu, index) => (
                                <div
                                    key={index}
                                    className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900/50 rounded-md border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200"
                                >
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">{edu.degree}</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            {edu.institution}, {edu.year}
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveEducation(index)}
                                        className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200"
                                    >
                                        <XCircle className="h-5 w-5" />
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="p-4 text-center text-gray-400 text-sm bg-gray-50 dark:bg-gray-900/50 rounded-md border border-gray-200 dark:border-gray-700">
                                No education history added yet
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-4">
                    <h4 className="text-base font-medium text-gray-900 dark:text-white">Certifications</h4>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Input
                            id="cert-name"
                            value={newCertification.name}
                            label="Certification Name"
                            onChange={(e) => setNewCertification({ ...newCertification, name: e.target.value })}
                            placeholder="e.g. AWS Certified Solutions Architect"
                            className="dark:bg-gray-900 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                        />

                        <Input
                            id="cert-issuer"
                            label="Issuing Organization"
                            value={newCertification.issuer}
                            onChange={(e) => setNewCertification({ ...newCertification, issuer: e.target.value })}
                            placeholder="e.g. Amazon Web Services"
                            className="dark:bg-gray-900 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                        />

                        <Input
                            id="cert-date"
                            value={newCertification.date}
                            label="Issue Date"
                            onChange={(e) => setNewCertification({ ...newCertification, date: e.target.value })}
                            placeholder="e.g. January 2022"
                            className="dark:bg-gray-900 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                        />
                    </div>

                    <Button
                        type="button"
                        onClick={handleAddCertification}
                        variant="outline"
                        className="dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 shadow-sm hover:shadow-md transition-all duration-200"
                    >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Certification
                    </Button>

                    <div className="space-y-2 mt-4">
                        {formData.certifications && formData.certifications.length > 0 ? (
                            formData.certifications.map((cert, index) => (
                                <div
                                    key={index}
                                    className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900/50 rounded-md border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200"
                                >
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">{cert.name}</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            {cert.issuer}, {cert.date}
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveCertification(index)}
                                        className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200"
                                    >
                                        <XCircle className="h-5 w-5" />
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="p-4 text-center text-gray-400 text-sm bg-gray-50 dark:bg-gray-900/50 rounded-md border border-gray-200 dark:border-gray-700">
                                No certifications added yet
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstructorEducationForm;
