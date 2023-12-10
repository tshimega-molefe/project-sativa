import { getServerSideUser } from "@/lib/payload-utils";
import Image from "next/image";
import { cookies } from "next/headers";
import { getPayloadClient } from "@/get-payload";
import { notFound, redirect } from "next/navigation";
import { Product, ProductFile, User } from "@/payload-types";
import { PRODUCT_CATEGORIES } from "@/config";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import PaymentStatus from "@/components/PaymentStatus";

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const ThankYouPage = async ({ searchParams }: PageProps) => {
  const orderId = searchParams.orderId;
  const nextCookies = cookies();

  const { user } = await getServerSideUser(nextCookies);
  const payload = await getPayloadClient();

  const { docs: orders } = await payload.find({
    collection: "orders",
    depth: 2,
    where: {
      id: {
        equals: orderId,
      },
    },
  });

  const [order] = orders;

  if (!order) return notFound();

  const orderUserId =
    typeof order.user === "string" ? order.user : order.user.id;

  if (orderUserId !== user?.id) {
    return redirect(`/sign-in?origin=thank-you?orderId=${order.id}`);
  }

  const products = order.products as Product[];

  const orderTotal = products.reduce((total, product) => {
    return total + product.price;
  }, 0);

  return (
    <main className="relative lg:min-h-full">
      <div className="hidden lg:block h-80 overflow-hidden lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr-12">
        <Image
          fill
          src="/checkout-thank-you.png"
          className="h-full w-full object-cover object-center"
          alt="thank you for your order"
        />
      </div>

      <div>
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-0 xl:gap-x-24">
          <div className="lg:col-start-2">
            <p className="text-sm font-medium text-primary">Order successful</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-secondary-foreground sm:text-5xl">
              Thanks for ordering
            </h1>
            {order._isPaid ? (
              <p className="mt-2 text-base text-muted-foreground">
                Your order was processed and your Bill of Lading is available to
                download below. We&apos;ve sent your receipt and order details
                to&nbsp;
                {typeof order.user !== "string" ? (
                  <span className="font-medium text-secondary-foreground">
                    {order.user.email}
                  </span>
                ) : null}
                .
              </p>
            ) : (
              <p className="mt-2 text-base text-muted-foreground">
                We appreciate your order, and we&apos;re currently processing
                it. So hang tight and we&apos;ll send you confirmation very
                soon!
              </p>
            )}

            <div className="mt-16 text-sm font-medium">
              <div className="text-muted-foreground">Order nr.</div>
              <div className="mt-2 text-secondary-foreground">{order.id}</div>

              <ul className="mt-6 divide-y divide-muted border-t border-muted text-sm font-medium text-muted-foreground">
                {(order.products as Product[]).map((product) => {
                  const label = PRODUCT_CATEGORIES.find(
                    ({ value }) => value === product.category
                  )?.label;

                  const downloadUrl = (product.product_files as ProductFile)
                    .url as string;

                  const { image } = product.images[0];

                  return (
                    <li key={product.id} className="flex space-x-6 py-6">
                      <div className="relative h-24 w-24">
                        {typeof image !== "string" && image.url ? (
                          <Image
                            fill
                            src={image.url}
                            alt={`${product.name} image`}
                            className="flex-none rounded-md bg-muted object-cover object-center"
                          />
                        ) : null}
                      </div>

                      <div className="flex-auto flex flex-col justify-between">
                        <div className="space-y-1">
                          <h3 className="text-secondary-foreground">
                            {product.name}
                          </h3>

                          <p className="my-1">Category: {label}</p>
                        </div>

                        {order._isPaid ? (
                          <a
                            href={downloadUrl}
                            download={product.name}
                            className="text-primary hover:underline underline-offset-2"
                          >
                            Download asset
                          </a>
                        ) : null}
                      </div>

                      <p className="flex-none font-medium text-secondary-foreground">
                        {formatPrice(product.price)}
                      </p>
                    </li>
                  );
                })}
              </ul>

              <div className="space-y-6 border-t border-muted pt-6 text-sm font-medium text-muted-foreground">
                <div className="flex justify-between">
                  <p>Subtotal</p>
                  <p className="text-secondary-foreground">
                    {formatPrice(orderTotal)}
                  </p>
                </div>

                <div className="flex justify-between">
                  <p>Delivery Cost</p>
                  <p className="text-secondary-foreground">{formatPrice(2)}</p>
                </div>

                <div className="flex justify-between">
                  <p>Transaction Fee</p>
                  <p className="text-secondary-foreground">{formatPrice(2)}</p>
                </div>

                <div className="flex items-center justify-between border-t border-muted pt-6 text-secondary-foreground">
                  <p className="text-base">Total</p>
                  <p className="text-base">{formatPrice(orderTotal + 4)}</p>
                </div>
              </div>

              <PaymentStatus
                isPaid={order._isPaid}
                orderEmail={(order.user as User).email}
                orderId={order.id}
              />

              <div className="mt-16 border-t border-muted py-6 text-right">
                <Link
                  href="/products"
                  className="text-sm font-medium text-primary hover:text-primary/50"
                >
                  Continue shopping &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ThankYouPage;
