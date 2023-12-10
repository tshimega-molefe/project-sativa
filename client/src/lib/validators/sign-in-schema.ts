import * as z from "zod";

export const SignInFormSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." }),
});

export type SignInFormValues = z.infer<typeof SignInFormSchema>;
