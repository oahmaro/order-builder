import { PageHeader } from '@/components';
import { orderPageHeaderContent, OrderPageHeaderPhrases } from './orders-page-header.content';

export default function OrdersPageHeader({ numberOfOrders }: { numberOfOrders: number }) {
  return (
    <PageHeader
      backPath="/"
      title={orderPageHeaderContent.t(OrderPageHeaderPhrases.TITLE)}
      subtitle={orderPageHeaderContent.t(OrderPageHeaderPhrases.SUBTITLE, numberOfOrders)}
      actions={[
        {
          link: '/orders/create',
          label: orderPageHeaderContent.t(OrderPageHeaderPhrases.ACTION),
        },
      ]}
    />
  );
}
