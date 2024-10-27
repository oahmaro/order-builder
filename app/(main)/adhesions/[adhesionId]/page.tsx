import { db } from '@/lib/db';
import AdhesionFormContainer from '../_components/adhesion-form/adhesion-form.container';
import { UpdateAdhesionForm } from '../_components';

export default async function AdhesionPage({ params }: { params: { adhesionId: string } }) {
  const adhesion = await db.adhesion.findUnique({
    where: {
      id: Number(params.adhesionId),
    },
    include: {
      _count: {
        select: { orderItems: true },
      },
    },
  });

  const hasOrderItems = (adhesion?._count?.orderItems ?? 0) > 0;

  return (
    <>
      {adhesion && (
        <AdhesionFormContainer adhesion={adhesion}>
          <UpdateAdhesionForm adhesion={adhesion} hasOrderItems={hasOrderItems} />
        </AdhesionFormContainer>
      )}
    </>
  );
}
