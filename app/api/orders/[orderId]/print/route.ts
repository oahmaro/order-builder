import { NextResponse } from 'next/server';
import { OrderStatus } from '@prisma/client';
import { db } from '@/lib/db';

export async function GET(request: Request, { params }: { params: { orderId: string } }) {
  try {
    const [order, company] = await Promise.all([
      db.order.findUnique({
        where: { id: parseInt(params.orderId, 10) },
        include: {
          customer: {
            include: {
              phones: true,
            },
          },
          orderItems: {
            include: {
              frame: true,
              prints: true,
              adhesions: true,
              descriptions: true,
              passepartout: true,
            },
          },
        },
      }),
      db.company.findFirst({
        where: { id: 1 },
        include: {
          address: true,
          phones: true,
        },
      }),
    ]);

    if (!order || !company) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    if (order.status === OrderStatus.CANCELED) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json({ order, company });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
