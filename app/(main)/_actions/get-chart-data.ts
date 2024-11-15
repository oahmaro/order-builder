'use server';

import { OrderStatus } from '@prisma/client';

import { db } from '@/lib/db';

export type ChartDataPoint = {
  date: string;
  value: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export async function getChartData(
  metric: 'customers' | 'orders' | 'pending' | 'processing' | 'shipped' | 'delivered',
  dateRange: [Date | null, Date | null],
  metricLabel: string = 'value'
): Promise<{ data: ChartDataPoint[]; error?: string }> {
  try {
    const [startDate, endDate] = dateRange;
    if (!startDate || !endDate) {
      return { data: [], error: 'Invalid date range' };
    }

    // Reusable function to format the result
    const formatResult = (groupedData: Record<string, number>) => {
      const result: ChartDataPoint[] = [];
      const currentDate = new Date(startDate);

      while (currentDate <= endDate) {
        const dateStr = currentDate.toISOString().split('T')[0];
        const dataPoint: any = { date: dateStr };
        dataPoint[metricLabel] = groupedData[dateStr] || 0;
        result.push(dataPoint);
        currentDate.setDate(currentDate.getDate() + 1);
      }

      return result;
    };

    if (metric === 'customers') {
      const customers = await db.customer.findMany({
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
        select: {
          createdAt: true,
        },
        orderBy: {
          createdAt: 'asc',
        },
      });

      const groupedData = customers.reduce((acc: Record<string, number>, customer) => {
        const date = customer.createdAt!.toISOString().split('T')[0];
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});

      return { data: formatResult(groupedData) };
    }

    if (metric === 'orders') {
      const orders = await db.order.findMany({
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
        select: {
          createdAt: true,
        },
        orderBy: {
          createdAt: 'asc',
        },
      });

      const groupedData = orders.reduce((acc: Record<string, number>, order) => {
        const date = order.createdAt!.toISOString().split('T')[0];
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});

      return { data: formatResult(groupedData) };
    }

    if (['pending', 'processing', 'shipped', 'delivered'].includes(metric)) {
      const orders = await db.order.findMany({
        where: {
          status: metric.toUpperCase() as OrderStatus,
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
        select: {
          createdAt: true,
        },
        orderBy: {
          createdAt: 'asc',
        },
      });

      const groupedData = orders.reduce((acc: Record<string, number>, order) => {
        const date = order.createdAt!.toISOString().split('T')[0];
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});

      return { data: formatResult(groupedData) };
    }

    return { data: [] };
  } catch (error) {
    return { data: [], error: 'Failed to fetch chart data' };
  }
}
