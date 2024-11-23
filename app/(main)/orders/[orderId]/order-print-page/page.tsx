import { notFound } from 'next/navigation';

import { db } from '@/lib/db';

export default async function OrderPrintPage({ params }: { params: { orderId: string } }) {
  const order = await db.order.findUnique({
    where: { id: Number(params.orderId) },
    include: {
      customer: {
        include: {
          phones: true,
          address: true,
        },
      },
      orderItems: {
        include: {
          frame: true,
          print: true,
          adhesion: true,
          description: true,
        },
      },
    },
  });

  if (!order) {
    notFound();
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Order #{order.id}</h1>
      {/* Add your print layout here */}
      {/* This is just a basic example - customize according to your needs */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Customer Details</h2>
        <p>
          {order.customer.firstName} {order.customer.lastName}
        </p>
        {/* Add more customer details */}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Order Items</h2>
        {order.orderItems.map((item, index) => (
          <div key={item.id} className="mb-2">
            <p>Item #{index + 1}</p>
            <p>
              Dimensions: {item.width}x{item.height} cm
            </p>
            {/* Add more item details */}
          </div>
        ))}
      </div>
    </div>
  );
}
