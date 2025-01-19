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
        dialingCode: string;
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
        console.log('Fetching order data for PDF:', params.orderId);
        const response = await fetch(`/api/orders/${params.orderId}/print`);
        const json = await response.json();

        console.log('Order data received:', {
          orderItemsCount: json.order?.orderItems?.length,
          hasImages: json.order?.orderItems?.map((item: any, index: number) => ({
            itemIndex: index,
            hasImage: !!item.image,
            imageUrl: item.image,
          })),
        });

        // Check if order status is not READY or COMPLETED
        if (
          json.order &&
          json.order.status !== OrderStatus.READY &&
          json.order.status !== OrderStatus.COMPLETED
        ) {
          console.log('Order status check failed:', json.order.status);
          notFound();
        }

        setData(json);
      } catch (error) {
        console.error('Error fetching order data:', {
          error: error instanceof Error ? error.message : 'Unknown error',
          stack: error instanceof Error ? error.stack : undefined,
        });
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
      <Center h="100vh">
        <Loader size="xl" />
      </Center>
    );
  }

  if (!data || !data.order || !data.company) {
    return notFound();
  }

  return (
    <PDFViewer style={{ width: '100%', height: '100vh' }}>
      <OrderPDF order={data.order} company={data.company} />
    </PDFViewer>
  );
}
