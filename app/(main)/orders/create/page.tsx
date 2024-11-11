import { db } from '@/lib/db';
import { OrderForm, OrderFormContainer } from '../_components/order-form';

export default async function CreateOrderPage() {
  const frames = await db.frame.findMany();
  const prints = await db.print.findMany();
  const customers = await db.customer.findMany({
    include: {
      phones: true,
    },
  });
  const adhesions = await db.adhesion.findMany();
  const descriptions = await db.description.findMany();

  return (
    <OrderFormContainer>
      <OrderForm
        customers={customers}
        frames={frames}
        prints={prints}
        adhesions={adhesions}
        descriptions={descriptions}
      />
    </OrderFormContainer>
  );
}
