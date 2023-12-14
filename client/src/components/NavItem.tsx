"use client";
import { PRODUCT_CATEGORIES } from "@/config";
import { Button, buttonVariants } from "./ui/button";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type Product = (typeof PRODUCT_CATEGORIES)[number];

interface NavItemProps {
  product: Product;
  handleOpen: () => void;
  isOpen: boolean;
  isAnyOpen: boolean;
}

const NavItem = ({ isAnyOpen, product, handleOpen, isOpen }: NavItemProps) => {
  return (
    <div className="flex">
      <div className="relative flex items-center">
        <Button
          onClick={handleOpen}
          className="gap-1.5"
          variant={isOpen ? "secondary" : "ghost"}
        >
          {product.label}
          <ChevronDown
            className={cn("h-4 w-4 transition-all text-muted-foreground", {
              "-rotate-180": isOpen,
            })}
          />
        </Button>
      </div>

      {isOpen ? (
        <div
          className={cn(
            "absolute inset-x-0 top-full text-sm text-muted-foreground",
            {
              "animate-in fade-in-10 slide-in-from-top-5": !isAnyOpen,
            }
          )}
        >
          <div
            className="absolute inset-0 top-1/2 bg-background shadow"
            aria-hidden="true"
          />
          <div className="relative bg-background">
            <div className="mx-auto max-w-7xl px-8 md:py-4">
              <div className="col-span-4 col-start-1 grid grid-cols-3 gap-x-8">
                {product.featured.map((item) => (
                  <div
                    key={item.name}
                    className="group relative text-base sm:text-sm"
                  >
                    <Link href={item.href}>
                      <div className="relative aspect-video overflow-hidden rounded-lg bg-muted group-hover:opacity-75">
                        <Image
                          src={item.imageSrc}
                          alt="product category image"
                          fill
                          className="object-cover object-center"
                        />
                      </div>
                    </Link>

                    <p className="mt-6 block font-medium text-secondary-foreground">
                      {item.name}
                    </p>
                    <Link
                      href={item.href}
                      className={cn(
                        buttonVariants({ variant: "link" }),
                        "-ml-4"
                      )}
                      aria-hidden="true"
                    >
                      Buy now
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default NavItem;
