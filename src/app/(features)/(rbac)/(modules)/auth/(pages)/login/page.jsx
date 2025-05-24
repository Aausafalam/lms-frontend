"use client";

import Head from "next/head";
import Link from "next/link";
import LoginForm from "./component/form";
import LoginIcons from "./utils/icons";
import AuthContainerWrapper from "../../components/containerWrapper";
import AuthContainer from "../../components/container";
import AuthHeader from "../../components/header";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";
import { useNavigation } from "@/components/navigation";

export default function SignIn() {
    const [_, setLocalStorage] = useLocalStorage();
    const { navigate } = useNavigation();
    return (
        <AuthContainerWrapper>
            <Head>
                <title>LMS - Sign In</title>
                <meta name="description" content="LMS Sign In Page" />
            </Head>

            <AuthContainer>
                <AuthHeader title={"Welcome Back"} description={"Sign in to your account to continue your learning journey"} />

                <LoginForm
                    formId={"login-form"}
                    onSuccess={(response) => {
                        if (response.data.token) {
                            setLocalStorage(response.data.token);
                            navigate("/");
                        }
                    }}
                />

                <div className="mt-8 mb-6 flex items-center">
                    <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
                    <span className="flex-shrink mx-4 text-gray-400 dark:text-gray-700 text-sm">OR</span>
                    <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
                </div>

                <div className="space-y-4">
                    <button
                        type="button"
                        className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm bg-white hover:bg-gray-50 dark:bg-gray-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transform hover:scale-[1.01] dark:text-white"
                    >
                        {LoginIcons.GOOGLE}
                        Sign In With Google
                    </button>

                    <button
                        type="button"
                        className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm bg-white hover:bg-gray-50 dark:bg-gray-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transform hover:scale-[1.01] dark:text-white"
                    >
                        {LoginIcons.FACEBOOK}
                        Sign In With Facebook
                    </button>

                    <button
                        type="button"
                        className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm bg-white hover:bg-gray-50 dark:bg-gray-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transform hover:scale-[1.01] dark:text-white"
                    >
                        {LoginIcons.LINKEDIN}
                        Sign In With LinkedIn
                    </button>
                </div>

                <div className="mt-8 text-center text-sm">
                    <span className="text-gray-600">Don't have an account?</span>{" "}
                    <Link href="#" className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors duration-200">
                        Register Now
                    </Link>
                </div>
            </AuthContainer>
        </AuthContainerWrapper>
    );
}
