import { db } from '@/lib/db';
import { OrderForm } from '../_components/order-form';
import OrderFormContainer from '../_components/order-form/order-form.container';

export default async function CreateOrderPage() {
  const [frames, prints, customers, adhesions, descriptions, passepartouts, company] =
    await Promise.all([
      db.frame.findMany(),
      db.print.findMany(),
      db.customer.findMany({
        include: {
          phones: true,
        },
      }),
      db.adhesion.findMany(),
      db.description.findMany(),
      db.passepartout.findMany(),
      db.company.findFirstOrThrow({
        where: { id: 1 },
        include: {
          phones: true,
          address: true,
        },
      }),
    ]);

  return (
    <OrderFormContainer>
      <OrderForm
        frames={frames}
        prints={prints}
        customers={customers}
        adhesions={adhesions}
        descriptions={descriptions}
        passepartouts={passepartouts}
        company={company}
      />
    </OrderFormContainer>
  );
}
