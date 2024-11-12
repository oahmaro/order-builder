import { db } from '@/lib/db';
import PassepartoutFormContainer from '../_components/passepartout-form/passepartout-form.container';
import UpdatePassepartoutForm from '../_components/update-passepartout-form/update-passepartout-form';

export default async function PassepartoutPage({ params }: { params: { PassepartoutId: string } }) {
  const passepartout = await db.passepartout.findUnique({
    where: { id: Number(params.PassepartoutId) },
    include: {
      _count: {
        select: { orderItems: true },
      },
    },
  });

  const hasOrderItems = (passepartout?._count?.orderItems ?? 0) > 0;

  return (
    <>
      {passepartout && (
        <PassepartoutFormContainer passepartout={passepartout}>
          <UpdatePassepartoutForm passepartout={passepartout} hasOrderItems={hasOrderItems} />
        </PassepartoutFormContainer>
      )}
    </>
  );
}
