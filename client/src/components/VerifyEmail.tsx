"use client";

import { trpc } from "@/trpc/client";
import { Loader2, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

interface VerifyEmailProps {
  token: string;
}

const VerifyEmail = ({ token }: VerifyEmailProps) => {
  const { data, isLoading, isError } = trpc.auth.verifyEmail.useQuery({
    token,
  });

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-2">
        <XCircle className="h-8 w-8 text-destructive" />
        <h3 className="font-semibold text-xl">Uh oh! There was a problem</h3>
        <p className="text-muted-foreground text-sm">
          This token might be expired or invalid. Please try again.
        </p>
      </div>
    );
  }

  if (data?.success) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <div className="relative mb-4 h-60 w-60 text-muted-foreground">
          <Image
            src="/sativa-welcome-image.png"
            fill
            alt="the email was sent"
          />
        </div>
        <h3 className="font-semibold text-2xl">
          Welcome to <span className="text-primary">Sativa!</span>
        </h3>
        <p className="text-muted-foreground text-center mt-2">
          Thank you for verifying your identity.
        </p>
        <Link
          className={buttonVariants({ className: "mt-4 w-full" })}
          href="sign-in"
        >
          Sign In
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-2">
        <div className="relative mb-2 h-60 w-60 text-muted-foreground">
          <Image
            src="/sativa-verifying-email.png"
            fill
            alt="the email was sent"
          />
        </div>
        <Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
        <h3 className="font-semibold text-xl">Verifying your identity...</h3>
        <p className="text-muted-foreground text-sm">
          This won&apos;t take long.
        </p>
      </div>
    );
  }
};

export default VerifyEmail;
