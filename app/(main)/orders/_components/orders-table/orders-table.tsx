'use client';

import { modals } from '@mantine/modals';
import { OrderStatus } from '@prisma/client';
import { useState, useMemo, useEffect } from 'react';
import { SortingState } from '@tanstack/react-table';
import { notifications } from '@mantine/notifications';
import { useRouter, useSearchParams } from 'next/navigation';

import {
  IconEdit,
  IconEye,
  IconPrinter,
  IconStatusChange,
  IconBrandWhatsapp,
} from '@tabler/icons-react';

import { MainTable } from '@/components/main-table';
import { OrderStatusSelect } from './ order-status-select';
import { OrderStatusFilter } from './orders-status-filter';
import { columns, OrderDataType } from './orders-table.columns';
import { updateOrderStatusAction } from '../../_actions/update-order-status.action';
import { ordersTableContent, OrdersTableContentPhrases } from './orders-table.content';

export interface OrdersTableProps {
  orders: OrderDataType[];
}

export default function OrdersTable({ orders }: OrdersTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [statusFilter, setStatusFilter] = useState<OrderStatus | null>(() => {
    const status = searchParams.get('status');
    return status ? (status as OrderStatus) : null;
  });

  const filteredOrders = useMemo(() => {
    if (!statusFilter) return orders;
    return orders.filter((order) => order.status === statusFilter);
  }, [orders, statusFilter]);

  const handleStatusChange = (status: OrderStatus | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (status) {
      params.set('status', status);
    } else {
      params.delete('status');
    }

    router.push(`/orders?${params.toString()}`);
    setStatusFilter(status);
  };

  // Sync with URL on mount and when URL changes
  useEffect(() => {
    const status = searchParams.get('status') as OrderStatus | null;
    setStatusFilter(status);
  }, [searchParams]);

  const handleUpdateStatus = async (order: OrderDataType, newStatus: OrderStatus) => {
    if (!order.id) {
      notifications.show({
        title: 'Error',
        message: 'Order ID is missing',
        color: 'red',
      });
      return;
    }

    try {
      const response = await updateOrderStatusAction(order.id, newStatus);

      if (response.error) {
        notifications.show({
          title: 'Error',
          message: response.error,
          color: 'red',
        });
        return;
      }

      notifications.show({
        title: 'Success',
        message: response.message,
        color: 'green',
      });

      modals.closeAll();
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to update order status',
        color: 'red',
      });
    }
  };

  const handlePrintOrder = (order: OrderDataType) => {
    // Open print preview in new window
    const printWindow = window.open(`/orders/${order.id}/print`, '_blank');
    if (printWindow) {
      printWindow.onload = () => {
        printWindow.print();
      };
    }
  };

  const handleSendWhatsapp = (order: OrderDataType) => {
    const message = `Order #${order.id} is ready for pickup!`;
    const encodedMessage = encodeURIComponent(message);

    const phoneNumber = order.customer?.phones?.find((p) => p.isPrimary)?.number;

    if (!phoneNumber) {
      notifications.show({
        title: 'Error',
        message: 'No phone number found for this customer',
        color: 'red',
      });
      return;
    }

    // Open WhatsApp with pre-filled message
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  const tableActions = useMemo(
    () => [
      {
        label: ordersTableContent.t(OrdersTableContentPhrases.EDIT_ORDER),
        onClick: (order: OrderDataType) => router.push(`/orders/${order.id}`),
        icon: <IconEdit size={16} />,
        color: 'blue',
      },
      {
        label: ordersTableContent.t(OrdersTableContentPhrases.PREVIEW_ORDER),
        onClick: (order: OrderDataType) => router.push(`/orders/${order.id}/preview`),
        icon: <IconEye size={16} />,
      },
      {
        label: ordersTableContent.t(OrdersTableContentPhrases.PRINT_ORDER),
        onClick: handlePrintOrder,
        icon: <IconPrinter size={16} />,
        color: 'dark',
      },
      {
        label: ordersTableContent.t(OrdersTableContentPhrases.UPDATE_STATUS),
        onClick: (order: OrderDataType) => {
          modals.open({
            title: ordersTableContent.t(OrdersTableContentPhrases.UPDATE_STATUS),
            children: (
              <OrderStatusSelect
                currentStatus={order.status as OrderStatus}
                onStatusChange={(status) => handleUpdateStatus(order, status)}
              />
            ),
          });
        },
        icon: <IconStatusChange size={16} />,
        color: 'orange',
      },
      {
        label: ordersTableContent.t(OrdersTableContentPhrases.SEND_WHATSAPP),
        onClick: handleSendWhatsapp,
        icon: <IconBrandWhatsapp size={16} />,
        color: 'green',
        show: (order: OrderDataType) => order.status === OrderStatus.COMPLETED,
      },
    ],
    [router]
  );

  // Add initial sorting state from URL
  const [sorting, setSorting] = useState<SortingState>(() => {
    const sortField = searchParams.get('sortBy');
    const sortDir = searchParams.get('sortDir');
    return sortField && sortDir ? [{ id: sortField, desc: sortDir === 'desc' }] : [];
  });

  const handleSortingChange = (newSorting: SortingState) => {
    setSorting(newSorting);
    const params = new URLSearchParams(searchParams.toString());

    if (newSorting.length > 0) {
      params.set('sortBy', newSorting[0].id);
      params.set('sortDir', newSorting[0].desc ? 'desc' : 'asc');
    } else {
      params.delete('sortBy');
      params.delete('sortDir');
    }

    router.push(`/orders?${params.toString()}`);
  };

  return (
    <MainTable<OrderDataType>
      data={filteredOrders}
      columns={columns}
      actions={tableActions}
      headerActions={
        <OrderStatusFilter selectedStatus={statusFilter} onStatusChange={handleStatusChange} />
      }
      initialColumnsVisibility={{ id: true, createdAt: false, updatedAt: false }}
      onSortingChange={handleSortingChange}
      initialSorting={sorting}
    />
  );
}
