import { Customer, Phone, Address } from '@prisma/client';
import { Stack, Tabs, TabsList, TabsPanel, TabsTab } from '@mantine/core';

import { CustomerOrders } from '../customer-orders';
import { UpdateCustomerForm } from '../update-customer-form';
import { CustomerPageHeader } from '../customer-page-header';
import CustomerFormContainer from '../customer-form/customer-form.container';
import { customerTabsContent, CustomerTabsPhrases } from './customer-tabs.content';

interface CustomerTabsProps {
  customer: Customer & { phones: Phone[]; address?: Address; _count: { orders: number } };
}

export default function CustomerTabs({ customer }: CustomerTabsProps) {
  const hasOrders = customer._count.orders > 0;

  return (
    <CustomerFormContainer customer={customer}>
      <Stack gap="lg">
        <CustomerPageHeader
          name={`${customer?.firstName} ${customer?.lastName}`}
          hasOrders={hasOrders}
          customerId={customer.id}
        />

        <Tabs defaultValue="details">
          <TabsList>
            <TabsTab value="details">{customerTabsContent.t(CustomerTabsPhrases.DETAILS)}</TabsTab>
            <TabsTab value="orders" rightSection={<span>({customer._count.orders})</span>}>
              {customerTabsContent.t(CustomerTabsPhrases.ORDERS)}
            </TabsTab>
          </TabsList>

          <TabsPanel value="details" pt="xl">
            <UpdateCustomerForm customer={customer} />
          </TabsPanel>

          <TabsPanel value="orders" pt="xl">
            <CustomerOrders customerId={customer.id} />
          </TabsPanel>
        </Tabs>
      </Stack>
    </CustomerFormContainer>
  );
}
