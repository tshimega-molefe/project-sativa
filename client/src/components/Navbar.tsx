import Link from "next/link";
import { getServerSideUser } from "../lib/payload-utils";
import Cart from "./Cart";
import { Icons } from "./Icons";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { ModeToggle } from "./ModeToggle";
import NavItems from "./NavItems";
import { buttonVariants } from "./ui/button";
import { cookies } from "next/headers";
import UserControlMenu from "./UserControlMenu";
import MobileNav from "./MobileNav";

const Navbar = async () => {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);
  return (
    <div className="sticky z-50 top-0 inset-0 h-32">
      <header className="relative bg-background">
        <MaxWidthWrapper>
          <div className="border-b border-muted">
            <div className="flex h-16 items-center">
              <MobileNav />

              <div className="mx-1 flex lg:ml-0">
                <Link href="/">
                  <Icons.logo className="w-auto h-14" />
                </Link>
              </div>
              <div className="lg:hidden absolute right-3">
                <ModeToggle />
              </div>
              <div className="lg:hidden absolute right-16">
                <Cart />
              </div>
              <div className="hidden z-50 lg:ml-4 lg:flex items-center justify-center lg:self-stretch">
                <NavItems />
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-4">
                  {user ? null : (
                    <Link
                      href={"/sign-in"}
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      Sign In
                    </Link>
                  )}

                  {user ? null : (
                    <span
                      className="h-6 w-px bg-muted"
                      aria-hidden="true"
                    ></span>
                  )}

                  {user ? (
                    <UserControlMenu user={user} />
                  ) : (
                    <Link
                      href={"/sign-up"}
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      Create Account
                    </Link>
                  )}

                  {user ? (
                    <span
                      className="h-6 w-px bg-muted"
                      aria-hidden="true"
                    ></span>
                  ) : null}

                  {user ? null : (
                    <div className="flex lg:ml-6">
                      <span
                        className="h-6 w-px bg-muted"
                        aria-hidden="true"
                      ></span>
                    </div>
                  )}

                  <ModeToggle />

                  {user ? (
                    <span
                      className="h-6 w-px bg-muted"
                      aria-hidden="true"
                    ></span>
                  ) : null}

                  {user ? null : (
                    <div className="flex lg:ml-6">
                      <span
                        className="h-6 w-px bg-muted"
                        aria-hidden="true"
                      ></span>
                    </div>
                  )}

                  <div className="ml-4 flow-root lg:ml-6">
                    <Cart />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default Navbar;
