import { db } from '@/lib/db';
import { UpdateDescriptionForm } from '../_components';
import DescriptionFormContainer from '../_components/description-form/description-form.container';

export default async function DescriptionPage({ params }: { params: { descriptionId: string } }) {
  const description = await db.description.findUnique({
    where: {
      id: Number(params.descriptionId),
    },
    include: {
      _count: {
        select: { orderItems: true },
      },
    },
  });

  const hasOrderItems = (description?._count?.orderItems ?? 0) > 0;

  return (
    <>
      {description && (
        <DescriptionFormContainer description={description}>
          <UpdateDescriptionForm description={description} hasOrderItems={hasOrderItems} />
        </DescriptionFormContainer>
      )}
    </>
  );
}
