"use client";

import { trpc } from "@/trpc/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface PaymentStatusProps {
  orderEmail: string;
  orderId: string;
  isPaid: boolean;
}

const PaymentStatus = ({ orderEmail, orderId, isPaid }: PaymentStatusProps) => {
  const router = useRouter();

  const { data } = trpc.payment.pollOrderStatus.useQuery(
    { orderId },
    {
      enabled: isPaid === false,
      refetchInterval: (data) => (data?.isPaid ? false : 1000),
    }
  );

  useEffect(() => {
    if (data?.isPaid) router.refresh();
  }, [data?.isPaid, router]);

  return (
    <div className="mt-16 grid grid-cols-2 gap-x-4 text-sm text-muted-foreground">
      <div>
        <p className="font-medium text-secondary-foreground">
          Receive Bill Of Lading at
        </p>
        <p>{orderEmail}</p>
      </div>

      <div>
        <p className="font-medium text-secondary-foreground">Order Status</p>
        {isPaid ? (
          <p className="text-primary">Payment successful</p>
        ) : (
          <p className="text-destructive">Pending payment</p>
        )}
      </div>
    </div>
  );
};

export default PaymentStatus;
