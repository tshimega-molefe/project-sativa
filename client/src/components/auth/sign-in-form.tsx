"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast, useToast } from "@/components/ui/use-toast";
import {
  SignInFormSchema,
  SignInFormValues,
} from "@/lib/validators/sign-in-schema";
import { trpc } from "@/trpc/client";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Separator } from "../ui/separator";
import { ToastAction } from "../ui/toast";

interface SignInFormProps {
  isSeller: boolean;
}

export function SignInForm({ isSeller }: SignInFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const origin = searchParams.get("origin");

  const continueAsSeller = () => {
    router.push("?as=seller");
  };

  const continueAsBuyer = () => {
    router.replace("/sign-in", undefined);
  };

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: signIn, isLoading } = trpc.auth.signIn.useMutation({
    // Handling user successfully signing in using the input email.
    onSuccess: async () => {
      toast({
        description: `Signed in successfully. Welcome back to Budd.`,
      });

      if (origin) {
        router.push(`/${origin}`);
        return;
      }

      if (isSeller) {
        router.push("/sell");
        return;
      }

      router.push("/");
      router.refresh();
    },
    // Handling the user failing to sign in using the input email.
    onError: (error) => {
      if (error.data?.code === "UNAUTHORIZED") {
        toast({
          title: "Uh Oh! Something went wrong.",
          description: "Invalid email or password.",
          variant: "destructive",
          action: (
            <ToastAction
              onClick={() => router.push("/sign-up")}
              altText="Create account instead"
            >
              Sign Up
            </ToastAction>
          ),
        });

        return;
      }
    },
  });

  function onSubmit(formData: SignInFormValues) {
    const { email, password } = formData;

    signIn({ email, password });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin mx-auto" />
          ) : (
            <>Sign In</>
          )}
        </Button>
      </form>

      <div className="relative">
        <div aria-hidden="true" className="absolute inset-0 flex items-center">
          <Separator />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">or</span>
        </div>
      </div>
      {isSeller ? (
        <Button
          onClick={continueAsBuyer}
          variant="secondary"
          disabled={isLoading}
        >
          Continue as Customer
        </Button>
      ) : (
        <Button
          onClick={continueAsSeller}
          variant="secondary"
          disabled={isLoading}
        >
          Continue as Seller
        </Button>
      )}
    </Form>
  );
}
