import { db } from '@/lib/db';
import { UpdatePrintForm } from '../_components/update-print-form';
import PrintFormContainer from '../_components/print-form/print-form.container';

export default async function PrintPage({ params }: { params: { printId: string } }) {
  const print = await db.print.findUnique({
    where: {
      id: Number(params.printId),
    },
    include: {
      _count: {
        select: { orderItems: true },
      },
    },
  });

  const hasOrderItems = (print?._count?.orderItems ?? 0) > 0;

  return (
    <>
      {print && (
        <PrintFormContainer print={print}>
          <UpdatePrintForm print={print} hasOrderItems={hasOrderItems} />
        </PrintFormContainer>
      )}
    </>
  );
}
