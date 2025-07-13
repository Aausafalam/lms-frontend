"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import AuthContainerWrapper from "../../components/containerWrapper";
import AuthContainer from "../../components/container";
import AuthHeader from "../../components/header";
import ForgotPasswordForm from "./component/form";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(false);

    const onSuccess = (data) => {
        setSuccess(true);
    };
    const onError = () => {
        setSuccess(false);
    };
    return (
        <AuthContainerWrapper>
            <Head>
                <title>Forgot Password - LMS LMS</title>
                <meta name="description" content="Reset your password for LMS LMS" />
            </Head>

            <AuthContainer>
                {!success ? (
                    <>
                        <AuthHeader title={"Forgot Password"} description={"Enter your email address and we'll send you a link to reset your password."} />

                        <ForgotPasswordForm setEmail={setEmail} onSuccess={onSuccess} onError={onError} />
                    </>
                ) : (
                    <div className="text-center py-6">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                            <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Check your email</h3>
                        <p className="text-gray-600 mb-6">
                            We've sent a password reset link to <span className="font-medium text-indigo-600">{email}</span>. Please check your inbox and follow the instructions to reset your
                            password.
                        </p>
                        <p className="text-sm text-gray-500 mb-4">
                            Didn't receive the email? Check your spam folder or
                            <button onClick={() => setSuccess(false)} className="text-indigo-600 hover:text-indigo-800 ml-1">
                                try again
                            </button>
                        </p>
                    </div>
                )}

                <div className="mt-6 text-center">
                    <Link href="/auth/login" className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center justify-center">
                        <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                        </svg>
                        Back to Sign In
                    </Link>
                </div>
            </AuthContainer>
        </AuthContainerWrapper>
    );
}
