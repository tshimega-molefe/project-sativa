import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductReel from "@/components/ProductReel";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GraduationCap, CheckCircle, PlaneTakeoff } from "lucide-react";
import Link from "next/link";

const features = [
  {
    name: "UAV Delivery",
    icon: PlaneTakeoff,
    description:
      "We're trying to raise some funds. Stick around with us 'till we can do delivery with UAVs.",
  },
  {
    name: "Guaranteed Quality",
    icon: CheckCircle,
    description:
      "Every vender on Budd is verified by our team to uphold safety, and security standards.",
  },
  {
    name: "Learn More",
    icon: GraduationCap,
    description:
      "Learn how to grow, learn about others, and learn way more about yourself. ",
  },
];

export default function Home() {
  return (
    <>
      <MaxWidthWrapper>
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-secondary-foreground sm:text-6xl">
            Need&nbsp;
            <span className="text-primary">Budd?</span>
          </h1>
          <p className="mt-6 text-lg max-w-prose text-primary">
            Welcome back.&nbsp;
            <span className="text-muted-foreground">
              Nice to see you again.
            </span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link href="/products" className={cn(buttonVariants())}>
              Browse Flower
            </Link>
            <Link
              href="/learn"
              className={cn(buttonVariants({ variant: "ghost" }))}
            >
              Learn with Buddy &rarr;
            </Link>
          </div>
        </div>
        {/* TODO: List Products */}
        <ProductReel
          query={{ sort: "desc", limit: 4 }}
          title="New arrivals"
          subtitle="Shop now. Giggle later."
          href="/products"
        />
      </MaxWidthWrapper>
      <section className="bg-muted">
        <MaxWidthWrapper className="py-20">
          <div className="grid grid-col-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
              >
                <div className="md:flex-shrink-0 flex justify-center">
                  <div className="h-16 w-16 flex items-center justify-center rounded-full bg-primary text-primary-foreground">
                    {<feature.icon className="w-1/3 h-1/3" />}
                  </div>
                </div>
                <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                  <h3 className="text-base font-medium">{feature.name}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
}
