"use client";

import { memo } from "react";
import { Mail, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FormSection } from "@/components/formSection";

export const ContactSection = memo(function ContactSection({ handlers = {}, formData = {}, sectionRef, isActive }) {
    const { handleInputChange } = handlers;

    return (
        <FormSection id="contact" title="Contact Information" icon={<Mail className="h-5 w-5" />} description="Enter the user's contact details" sectionRef={sectionRef} isActive={isActive}>
            <div className="grid grid-cols-2 gap-4">
                <Input
                    label="Email Address"
                    labelIcon={<Mail className="h-3.5 w-3.5" />}
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter email address"
                    value={formData.email || ""}
                    onChange={handleInputChange}
                    required
                    helperText="Enter a valid email address"
                    error={!formData.email ? "Email address is required" : ""}
                />

                <Input
                    label="Mobile Number"
                    labelIcon={<Phone className="h-3.5 w-3.5" />}
                    id="mobile"
                    name="mobile"
                    type="tel"
                    placeholder="Enter mobile number"
                    value={formData.mobile || ""}
                    onChange={handleInputChange}
                    helperText="Include country code (e.g., +1 234 567 8900)"
                />
            </div>
        </FormSection>
    );
});
