import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductReel from "@/components/ProductReel";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Bot, CheckCircle, PlaneTakeoff } from "lucide-react";
import Link from "next/link";

const features = [
  {
    name: "Drone Delivery",
    icon: PlaneTakeoff,
    description:
      "Instant autonomous delivery with our fleet of the safest, and latest aerial drone technology.",
  },
  {
    name: "Guaranteed Quality",
    icon: CheckCircle,
    description:
      "Every vender on our platform is verified by our team to uphold safety, and security standards.",
  },
  {
    name: "Powered with AI",
    icon: Bot,
    description:
      "Leverage our various AI tools to learn, analyse, and make informed purchases.",
  },
];

export default function Home() {
  return (
    <>
      <MaxWidthWrapper>
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-secondary-foreground sm:text-6xl">
            Buy and sell&nbsp;
            <span className="text-primary">Cannabis, CBD, Hemp or Smoke</span>
            &nbsp;related products.
          </h1>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            Welcome to <span className="font-bold text-primary">Sativa</span>.
            Every vendor on our platform is verified by our team to uphold
            safety, and security standards.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link href="/products" className={cn(buttonVariants())}>
              Browse Trending
            </Link>
            <Button variant="ghost">Our Quality Promise &rarr;</Button>
          </div>
        </div>
        {/* TODO: List Products */}
        <ProductReel
          query={{ sort: "desc", limit: 4 }}
          title="Brand New"
          subtitle="Shop the latest products from our top growers and suppliers."
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
