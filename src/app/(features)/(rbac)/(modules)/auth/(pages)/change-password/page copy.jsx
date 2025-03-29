"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import AuthContainerWrapper from "../../components/containerWrapper";
import AuthContainer from "../../components/container";
import AuthHeader from "../../components/header";

export default function ChangePassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [passwordError, setPasswordError] = useState("");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        // Add subtle animation to background elements
        const animateElements = () => {
            const elements = document.querySelectorAll(".floating");
            elements.forEach((el, index) => {
                const element = el;
                element.style.animation = `float ${3 + (index % 3)}s ease-in-out infinite alternate`;
                element.style.animationDelay = `${index * 0.5}s`;
            });
        };

        setTimeout(animateElements, 100);
    }, []);

    // Check password strength
    useEffect(() => {
        if (!password) {
            setPasswordStrength(0);
            setPasswordError("");
            return;
        }

        let strength = 0;
        const feedback = [];

        // Length check
        if (password.length >= 8) {
            strength += 1;
        } else {
            feedback.push("Password should be at least 8 characters");
        }

        // Uppercase check
        if (/[A-Z]/.test(password)) {
            strength += 1;
        } else {
            feedback.push("Add an uppercase letter");
        }

        // Lowercase check
        if (/[a-z]/.test(password)) {
            strength += 1;
        } else {
            feedback.push("Add a lowercase letter");
        }

        // Number check
        if (/[0-9]/.test(password)) {
            strength += 1;
        } else {
            feedback.push("Add a number");
        }

        // Special character check
        if (/[^A-Za-z0-9]/.test(password)) {
            strength += 1;
        } else {
            feedback.push("Add a special character");
        }

        setPasswordStrength(strength);
        setPasswordError(feedback.join(", "));
    }, [password]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        if (passwordStrength < 3) {
            alert("Please create a stronger password");
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
        }, 1500);
    };

    const getStrengthColor = () => {
        if (passwordStrength <= 1) return "bg-red-500";
        if (passwordStrength <= 3) return "bg-yellow-500";
        return "bg-green-500";
    };

    return (
        <AuthContainerWrapper>
            <Head>
                <title>Change Password - LMS</title>
                <meta name="description" content="Set a new password for your  LMS account" />
            </Head>

            <AuthContainer>
                {!isSuccess ? (
                    <>
                        <AuthHeader title={"Set New Password"} description={"Create a strong password for your account."} />

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
                                    New Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                            ></path>
                                        </svg>
                                    </div>
                                    <input
                                        type="password"
                                        id="password"
                                        className="pl-10 block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white/70 backdrop-blur-sm py-3 transition-all duration-200"
                                        placeholder="Enter your new password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                {/* Password strength indicator */}
                                {password && (
                                    <div className="mt-2">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-xs text-gray-500">Password strength:</span>
                                            <span className="text-xs font-medium">{passwordStrength <= 1 ? "Weak" : passwordStrength <= 3 ? "Medium" : "Strong"}</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                                            <div className={`h-1.5 rounded-full ${getStrengthColor()}`} style={{ width: `${(passwordStrength / 5) * 100}%` }}></div>
                                        </div>
                                        {passwordError && <p className="mt-1 text-xs text-red-500">{passwordError}</p>}
                                    </div>
                                )}
                            </div>

                            <div>
                                <label htmlFor="confirm-password" className="block text-gray-700 text-sm font-medium mb-2">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                            ></path>
                                        </svg>
                                    </div>
                                    <input
                                        type="password"
                                        id="confirm-password"
                                        className="pl-10 block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white/70 backdrop-blur-sm py-3 transition-all duration-200"
                                        placeholder="Confirm your new password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                {password && confirmPassword && password !== confirmPassword && <p className="mt-1 text-xs text-red-500">Passwords do not match</p>}
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-[1.02]"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            Updating...
                                        </>
                                    ) : (
                                        "Set New Password"
                                    )}
                                </button>
                            </div>
                        </form>
                    </>
                ) : (
                    <div className="text-center py-6">
                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                            <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Password Updated Successfully!</h3>
                        <p className="text-gray-600 mb-8">Your password has been successfully updated. You can now sign in with your new password.</p>

                        <Link
                            href="/"
                            className="w-full inline-flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                        >
                            Return to Sign In
                        </Link>
                    </div>
                )}
            </AuthContainer>
        </AuthContainerWrapper>
    );
}
