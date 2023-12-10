import * as z from "zod";

export const SignUpFormSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." }),
});

export type SignUpFormValues = z.infer<typeof SignUpFormSchema>;
