"use client";
import { Icons } from "@/components/Icons";
import { SignInForm } from "@/components/auth/sign-in-form";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();
  const isSeller = searchParams.get("as") === "seller";

  return (
    <>
      <div className="container relative flex flex-col items-center justify-center lg:px-0 mb-14">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Icons.logo className="h-auto w-28" />
            <h1 className="text-2xl font-bold">
              Sign in to your {isSeller ? "seller" : ""} account
            </h1>

            <Link
              href="/sign-up"
              className={buttonVariants({
                variant: "link",
                className: "gap-1.5",
              })}
            >
              Don&apos;t have an account?
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <SignInForm isSeller={isSeller} />
        </div>
      </div>
    </>
  );
};

export default Page;
