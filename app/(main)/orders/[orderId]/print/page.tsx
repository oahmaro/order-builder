'use client';

import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Center, Loader } from '@mantine/core';
import { PDFViewer } from '@react-pdf/renderer';
import { notifications } from '@mantine/notifications';
import { Order, OrderItem, Customer, Company, Address, Phone, OrderStatus } from '@prisma/client';

import { commonContent, CommonPhrases } from '@/content';
import { OrderPDF } from '../../_components/order-pdf/order-pdf';

interface PrintOrderPageProps {
  params: {
    orderId: string;
  };
}

interface PrintOrderData {
  order: Order & {
    customer: Customer & {
      phones?: {
        id: number;
        number: string;
        isPrimary: boolean;
      }[];
    };
    orderItems: (OrderItem & {
      adhesions: { name: string }[];
      frame?: { name: string } | null;
    })[];
  };
  company: Company & {
    address?: Address;
    phones: Phone[];
  };
}

export default function PrintOrderPage({ params }: PrintOrderPageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<PrintOrderData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/orders/${params.orderId}/print`);
        const json = await response.json();

        if (
          json.order &&
          json.order.status !== OrderStatus.READY &&
          json.order.status !== OrderStatus.COMPLETED
        ) {
          notFound();
        }

        setData(json);
      } catch (error) {
        notifications.show({
          title: commonContent.t(CommonPhrases.ERROR),
          message: error instanceof Error ? error.message : 'Error fetching order data',
          color: 'red',
        });
        notFound();
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.orderId]);

  if (isLoading) {
    return (
      <Center h="calc(100vh - 180px)">
        <Loader size="md" />
      </Center>
    );
  }

  if (!data || !data.order || !data.company) {
    return notFound();
  }

  return (
    <PDFViewer
      style={{
        width: '100vw',
        height: '100vh',
        padding: 0,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1000,
      }}
      showToolbar
    >
      <OrderPDF order={data.order} company={data.company} />
    </PDFViewer>
  );
}
