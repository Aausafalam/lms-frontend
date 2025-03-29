"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import AuthContainerWrapper from "../../components/containerWrapper";
import AuthContainer from "../../components/container";
import AuthHeader from "../../components/header";
import ChangePasswordForm from "./components/form";
import Button from "@/components/form/components/FieldTemplates/ButtonField";
import { useSearchParams } from "next/navigation";

export default function ChangePassword() {
    const [isSuccess, setIsSuccess] = useState(false);
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const onSuccess = async () => {
        setIsSuccess(true);
    };

    const onError = () => {
        setIsSuccess(true);
    };

    useEffect(() => {
        if (!token) {
            navigate("/auth/login");
        }
    }, [token]);

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

                        <ChangePasswordForm token={token} onSuccess={onSuccess} onError={onError} />
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

                        <Button fullWidth={true} href="/auth/login">
                            Return to Sign In
                        </Button>
                    </div>
                )}
            </AuthContainer>
        </AuthContainerWrapper>
    );
}
