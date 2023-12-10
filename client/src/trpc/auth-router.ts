import { SignUpFormSchema } from "../lib/validators/sign-up-schema";
import { publicProcedure, router } from "./trpc";
import { getPayloadClient } from "../get-payload";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { SignInFormSchema } from "../lib/validators/sign-in-schema";

export const authRouter = router({
  createPayloadUser: publicProcedure
    .input(SignUpFormSchema)
    .mutation(async ({ input }) => {
      const { email, password } = input;
      const payload = await getPayloadClient();

      // Check if the user exists, to prevent duplicated user rows
      const { docs: users } = await payload.find({
        collection: "users",
        overrideAccess: true,
        where: {
          email: {
            equals: email,
          },
        },
      });

      if (users.length !== 0) throw new TRPCError({ code: "CONFLICT" });

      await payload.create({
        collection: "users",
        data: {
          email: email,
          password: password,
          role: "user",
        },
      });

      return { success: true, sentToEmail: email };
    }),
  verifyEmail: publicProcedure
    .input(z.object({ token: z.string() }))
    .query(async ({ input }) => {
      const { token } = input;

      const payload = await getPayloadClient();

      const isVerified = await payload.verifyEmail({
        collection: "users",
        token,
      });

      if (!isVerified) throw new TRPCError({ code: "UNAUTHORIZED" });

      return { success: true };
    }),
  signIn: publicProcedure
    .input(SignInFormSchema)
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;
      const { res } = ctx;
      const payload = await getPayloadClient();

      // Handling signing the user
      try {
        await payload.login({
          collection: "users",
          data: {
            email,
            password,
          },
          res,
        });

        return { success: true };
      } catch (error) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
    }),
});
