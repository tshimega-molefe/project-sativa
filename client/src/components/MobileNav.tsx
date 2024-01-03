import { PRODUCT_CATEGORIES } from "@/config";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { cookies } from "next/headers";
import { getServerSideUser } from "../lib/payload-utils";
import UserControlMenu from "./UserControlMenu";

const MobileNav = async () => {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden" asChild>
        <Button
          className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-muted-foreground"
          variant="ghost"
        >
          <Menu className="h-6 w-6" aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent
        className="flex w-full h-full overflow-y-scroll flex-col pr-6 pb-6 sm:max-w-lg lg:hidden"
        side="left"
      >
        <SheetHeader>
          <SheetTitle className="mb-4">
            {user ? user.email : "Account Centre"}
          </SheetTitle>
          <SheetDescription>Manage your account here</SheetDescription>
          <div className="flow-root">
            {user ? null : (
              <SheetClose asChild>
                <Link
                  href={"/sign-in"}
                  className={cn(
                    buttonVariants({ variant: "secondary" }),
                    "w-full mt-4 mb-1"
                  )}
                >
                  Sign In
                </Link>
              </SheetClose>
            )}
          </div>
          <div className="flow-root">
            {user ? (
              <UserControlMenu user={user} />
            ) : (
              <SheetClose asChild>
                <Link
                  href="/sign-up"
                  className={cn(
                    buttonVariants({ variant: "default" }),
                    "w-full"
                  )}
                >
                  Create Account
                </Link>
              </SheetClose>
            )}
          </div>
        </SheetHeader>
        <ul>
          {PRODUCT_CATEGORIES.map((category) => (
            <li key={category.label} className="space-y-10 pb-8 pt-2">
              <div className="border-b border-muted">
                <div className="-mb-px flex">
                  <p className="border-transparent text-secondary-foreground flex-1 whitespace-nowrap border-b-2 py-4 text-base font-medium">
                    {category.label}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-y-10 gap-x-4">
                {category.featured.map((item) => (
                  <div key={item.name} className="group relative text-sm">
                    <SheetClose asChild>
                      <Link href={item.href}>
                        <div className="relative aspect-square overflow-hidden rounded-lg bg-muted group-hover:opacity-75">
                          <Image
                            fill
                            src={item.imageSrc}
                            alt="product category image"
                            className="object-cover object-center"
                          />
                        </div>
                      </Link>
                    </SheetClose>

                    <span className="mt-6 block font-medium text-secondary-foreground">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
