import { db } from '@/lib/db';
import { OrderForm } from '../_components/order-form';
import OrderFormContainer from '../_components/order-form/order-form.container';

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
  const passepartouts = await db.passepartout.findMany();

  return (
    <OrderFormContainer>
      <OrderForm
        frames={frames}
        prints={prints}
        customers={customers}
        adhesions={adhesions}
        descriptions={descriptions}
        passepartouts={passepartouts}
      />
    </OrderFormContainer>
  );
}
