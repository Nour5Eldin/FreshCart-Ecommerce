import Logo from "@/components/common/Logo";
import { SignIn } from "@clerk/nextjs";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function SignInPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-tech_white to
         text-tech_bg_color flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-tech_white rounded-2xl shadow-xl
                overflow-hidden">
                    <div className="relative">
                        <div className="absolute top-6 left-4 z-10">
                            <Link href={"/"}>
                                <button className="p-2 rounded-full bg-tech_white/80 hover:bg-tech_white shadow-md hoverEffect">
                                    <ArrowLeft className="h-5 w-5 text-tech_dark" />
                                </button>
                            </Link>
                        </div>
                        <div className="bg-tech_blue text-tech_white p-6 text-center">
                            <div className="flex justify-center mb-4">
                                <Logo className="w-40" />
                            </div>
                            <h2 className="text-2xl font-bold">Welcome Back</h2>
                            <p className="text-sm opacity-80 mt-1">SignIn Your Account</p>
                        </div>
                    </div>
                    <div className="p-6">
                        <SignIn path="/sign-in" signInUrl="/sign-up?redirect_url=/account/account" />
                    </div>
                </div>
            </div>
        </div>
    );
}