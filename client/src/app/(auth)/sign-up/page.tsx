import { Icons } from "@/components/Icons";
import { SignUpForm } from "@/components/auth/sign-up-form";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Page = () => {
  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Icons.logo className="h-12 w-12" />
            <h1 className="text-2xl font-bold">Create an Account</h1>

            <Link
              href="/sign-in"
              className={buttonVariants({
                variant: "link",
                className: "gap-1.5",
              })}
            >
              Already have an account? Sign In
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <SignUpForm />
        </div>
      </div>
    </>
  );
};

export default Page;
