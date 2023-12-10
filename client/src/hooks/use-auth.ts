import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
export const useAuth = () => {
  const router = useRouter();

  const signOut = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) throw new Error();

      toast({
        title: "Goodbye!",
        description: "Successfully signed out. Hope to see you soon.",
      });

      router.push("/sign-in");
      router.refresh();
    } catch (err) {
      toast({
        title: "Uh Oh! Something went wrong.",
        description: "Couldn't sign you out, please try again.",
        variant: "destructive",
      });
    }
  };

  return { signOut };
};
