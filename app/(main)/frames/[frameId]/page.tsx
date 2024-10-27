import { db } from '@/lib/db';
import { UpdateFrameForm } from '../_components/update-frame-form';
import FrameFormContainer from '../_components/frame-form/frame-form.container';

export default async function FramePage({ params }: { params: { frameId: string } }) {
  const frame = await db.frame.findUnique({
    where: {
      id: Number(params.frameId),
    },
    include: {
      _count: {
        select: { orderItems: true },
      },
    },
  });

  const hasOrderItems = (frame?._count?.orderItems ?? 0) > 0;

  return (
    <>
      {frame && (
        <FrameFormContainer frame={frame}>
          <UpdateFrameForm frame={frame} hasOrderItems={hasOrderItems} />
        </FrameFormContainer>
      )}
    </>
  );
}
