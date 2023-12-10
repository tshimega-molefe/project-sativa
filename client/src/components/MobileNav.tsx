"use client";

import { PRODUCT_CATEGORIES } from "@/config";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./ModeToggle";
import { useTheme } from "next-themes";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const pathname = usePathname();

  // whenever we click an item in the menu and navigate away, we want to close the menu
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // when we click the path we are currently on, we still want the mobile menu to close,
  // however we cant rely on the pathname for it because that won't change (we're already there)
  const closeOnCurrent = (href: string) => {
    if (pathname === href) {
      setIsOpen(false);
    }
  };

  // remove second scrollbar when mobile menu is open
  useEffect(() => {
    if (isOpen) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  if (!isOpen)
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="lg:hidden relative inline-flex items-center justify-center rounded-md p-2 text-muted-foreground"
        variant="ghost"
      >
        <Menu className="h-6 w-6" aria-hidden="true" />
      </Button>
    );

  return (
    <div>
      <div className="relative z-40 lg:hidden">
        <div className="fixed inset-0 bg-background/90" />
      </div>

      <div className="fixed overflow-y-scroll overscroll-y-none inset-0 z-40 flex">
        <div className="w-4/5">
          <div className="relative flex w-full max-w-sm flex-col overflow-y-auto bg-background pb-12 shadow-xl">
            <div className="flex px-4 pb-2 pt-5">
              <Button
                onClick={() => setIsOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-muted-foreground"
                variant="ghost"
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </Button>
            </div>

            <div className="mt-2">
              <ul>
                {PRODUCT_CATEGORIES.map((category) => (
                  <li
                    key={category.label}
                    className="space-y-10 px-4 pb-8 pt-10"
                  >
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
                          <div className="relative aspect-square overflow-hidden rounded-lg bg-muted group-hover:opacity-75">
                            <Image
                              fill
                              src={item.imageSrc}
                              alt="product category image"
                              className="object-cover object-center"
                            />
                          </div>
                          <Link
                            href={item.href}
                            className="mt-6 block font-medium text-secondary-foreground"
                          >
                            {item.name}
                          </Link>
                        </div>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6 border-t border-muted px-4 py-6">
              <div className="flow-root">
                <Link
                  onClick={() => closeOnCurrent("/sign-in")}
                  href="/sign-in"
                  className={cn(
                    buttonVariants({ variant: "secondary" }),
                    "w-full"
                  )}
                >
                  Sign in
                </Link>
              </div>
              <div className="flow-root">
                <Link
                  onClick={() => closeOnCurrent("/sign-up")}
                  href="/sign-up"
                  className={cn(
                    buttonVariants({ variant: "default" }),
                    "w-full"
                  )}
                >
                  Create Account
                </Link>
              </div>
              <div className="flow-root">
                <Button
                  className="w-full items-center flex justify-center"
                  variant="secondary"
                >
                  <ModeToggle />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
