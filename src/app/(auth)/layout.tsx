import { AuthBackground } from "@/components/auth/auth-background";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (session) {
        redirect("/dashboard");
    }

    return (
        <div className="grid min-h-svh">
            <div className="flex flex-col gap-4 p-6">
                <div className="flex justify-start gap-2">
                    <Link href="/" className="flex items-center gap-2 font-medium">
                        <Image src="/logo.png" alt="TaskFlow" width={24} height={24} />
                        TaskFlow
                    </Link>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-sm">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}