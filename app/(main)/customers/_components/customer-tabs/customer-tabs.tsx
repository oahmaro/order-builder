'use client';

import { Customer, Phone, Address } from '@prisma/client';
import { Tabs, TabsList, TabsPanel, TabsTab } from '@mantine/core';

import { CustomerOrders } from '../customer-orders';
import { UpdateCustomerForm } from '../update-customer-form';
import { customerTabsContent, CustomerTabsPhrases } from './customer-tabs.content';
import { OrderDataType } from '@/app/(main)/orders/_components/orders-table/orders-table.columns';

interface CustomerTabsProps {
  orders: OrderDataType[];
  customer: Customer & { phones: Phone[]; address?: Address; _count: { orders: number } };
}

export default function CustomerTabs({ orders, customer }: CustomerTabsProps) {
  return (
    <Tabs defaultValue="details">
      <TabsList>
        <TabsTab value="details">{customerTabsContent.t(CustomerTabsPhrases.DETAILS)}</TabsTab>
        <TabsTab value="orders" rightSection={<span>({customer._count.orders})</span>}>
          {customerTabsContent.t(CustomerTabsPhrases.ORDERS)}
        </TabsTab>
      </TabsList>

      <TabsPanel value="details" pt="xl">
        <UpdateCustomerForm />
      </TabsPanel>

      <TabsPanel value="orders" pt="xl">
        <CustomerOrders orders={orders} />
      </TabsPanel>
    </Tabs>
  );
}
