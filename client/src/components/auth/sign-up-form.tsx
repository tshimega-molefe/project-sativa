"use client";

import {
  SignUpFormSchema,
  SignUpFormValues,
} from "@/lib/validators/sign-up-schema";
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
import { trpc } from "@/trpc/client";
import { Loader2 } from "lucide-react";
import { toast, useToast } from "@/components/ui/use-toast";
import { ToastAction } from "../ui/toast";
import Link from "next/link";
import { ZodError } from "zod";
import { useRouter } from "next/navigation";

export function SignUpForm() {
  const router = useRouter();
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isLoading } = trpc.auth.createPayloadUser.useMutation({
    // Handling what happens if the user cannot create an account using the input email.
    onError: (error) => {
      if (error.data?.code === "CONFLICT") {
        toast({
          title: "Uh Oh! Something went wrong.",
          description: "This email is already in use.",
          variant: "destructive",
          action: (
            <ToastAction
              onClick={() => router.push("/sign-in")}
              altText="Sign in instead"
            >
              Sign In
            </ToastAction>
          ),
        });

        return;
      }

      if (error instanceof ZodError) {
        toast({
          title: "Uh Oh! Something went wrong.",
          description: `${error.issues[0].message}`,
          variant: "destructive",
          action: (
            <ToastAction
              onClick={form.handleSubmit(onSubmit)}
              altText="Try Again"
              asChild
            >
              Try Again
            </ToastAction>
          ),
        });
        return;
      }

      toast({
        title: "Uh Oh! Something went wrong.",
        description: "There was a problem with creating your account.",
        variant: "destructive",
        action: (
          <ToastAction
            onClick={form.handleSubmit(onSubmit)}
            altText="Try Again"
            asChild
          >
            Try Again
          </ToastAction>
        ),
      });
    },
    // Handling what happens if the user successfully creates an account using the input email.
    onSuccess: ({ sentToEmail }) => {
      toast({
        description: `We've sent a verification link to ${sentToEmail}.`,
      });
      router.push("/verify-email?to=" + sentToEmail);
    },
  });

  function onSubmit(formData: SignUpFormValues) {
    const { email, password } = formData;

    mutate({ email, password });
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
            <>Create Account</>
          )}
        </Button>
      </form>
    </Form>
  );
}
