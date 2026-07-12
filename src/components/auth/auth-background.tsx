import Image from "next/image"

export function AuthBackground() {
    return (
        <div className="relative hidden bg-muted lg:block">
            {/* <Image
                src="/auth-bg-light.png"
                alt=""
                width={1000}
                height={1000}
                className="absolute inset-0 h-full w-full object-cover select-none dark:hidden"
                priority
            />
            <Image
                src="/auth-bg-dark.jpg"
                alt=""
                width={1000}
                height={1000}
                className="absolute inset-0 hidden h-full w-full object-cover select-none dark:block"
                priority
            /> */}
        </div>
    )
}
