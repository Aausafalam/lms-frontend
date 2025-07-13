"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import AuthContainerWrapper from "../../components/containerWrapper";
import AuthContainer from "../../components/container";
import Button from "@/components/form/components/FieldTemplates/ButtonField";
import styles from "./index.module.css";
import { authApiService } from "@/services/api/auth";
import { useSearchParams } from "next/navigation";
import GlobalICONS from "@/lib/utils/icons";
import { useNavigation } from "@/components/navigation";

export default function EmailVerification() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const [isVerifying, setIsVerifying] = useState(true);
    const [isVerified, setIsVerified] = useState(false);
    const { navigate } = useNavigation();

    useEffect(() => {
        if (!token) {
            navigate("/auth/login");
        } else {
            handleEmailVerification(token);
        }
    }, [token]);

    const handleEmailVerification = async (token) => {
        try {
            setIsVerifying(true);
            const data = await authApiService.verifyEmail({
                token,
            });
            if (data.data?.isValid) {
                setIsVerified(true);
            } else {
                setIsVerified(false);
            }
        } catch (error) {
            setIsVerified(false);
        } finally {
            setIsVerifying(false);
        }
    };

    return (
        <AuthContainerWrapper>
            <Head>
                <title>Email Verification - LMS</title>
                <meta name="description" content="Verify your email for  LMS" />
            </Head>

            <AuthContainer>
                {isVerifying ? (
                    <div className="text-center py-10">
                        <div className="mx-auto flex items-center justify-center h-16 w-16 mb-6">{GlobalICONS.ROLLING}</div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Verifying your email</h3>
                        <p className="text-gray-600">Please wait while we verify your email address...</p>
                    </div>
                ) : isVerified ? (
                    <div className="text-center py-6">
                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">{GlobalICONS.SUCCESS_FULL}</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Email Verified Successfully!</h3>
                        <p className="text-gray-600 mb-8">Your email has been successfully verified. You can now set a new password for your account.</p>

                        <Button fullWidth={true} href={`/auth/change-password?token=${token}`} className={styles.button}>
                            Continue to Set Password
                        </Button>
                    </div>
                ) : (
                    <div className="text-center py-6">
                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">{GlobalICONS.CROSS}</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Verification Failed</h3>
                        <p className="text-gray-600 mb-8">We couldn't verify your email. The verification link may have expired or is invalid.</p>
                        <Button fullWidth={true} href="/auth/forgot-password">
                            Request New Link
                        </Button>
                    </div>
                )}

                <div className="mt-6 text-center">
                    <Link href="/" className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center justify-center">
                        {GlobalICONS.LEFT_ARROW}
                        Back to Sign In
                    </Link>
                </div>
            </AuthContainer>
        </AuthContainerWrapper>
    );
}
