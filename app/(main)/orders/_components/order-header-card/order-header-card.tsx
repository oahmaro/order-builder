import { Box, Group, Image, NumberFormatter, Paper, Select, Stack } from '@mantine/core';
import classes from './order-header-card.module.css';
import { StaticField } from '@/components';

export interface OrderHeaderCardProps {
  orderNumber: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function OrderHeaderCard({ orderNumber }: OrderHeaderCardProps) {
  return (
    <Paper className={classes.root} shadow="xs" radius="md">
      <Group>
        <Stack flex={1} h="100%" gap={4}>
          <Select
            size="sm"
            label="שם"
            data={[]}
            searchable
            nothingFoundMessage="Nothing found..."
            classNames={{ root: classes.inputRoot, label: classes.inputLabel }}
          />

          <StaticField label="טלפון" value="0522039315" separator=": " />
          <StaticField
            label="מקדמה"
            value={<NumberFormatter prefix="₪" value={600} thousandSeparator />}
            separator=": "
          />
          <StaticField
            label="סה״כ"
            value={<NumberFormatter prefix="₪" value={600} thousandSeparator />}
            separator=": "
          />

          <Box c="dimmed">-----------------------</Box>
          <StaticField
            label="סה״כ לתשלום"
            value={<NumberFormatter prefix="₪" value={1200} thousandSeparator />}
            separator=": "
          />
        </Stack>

        <Stack flex={2} h="100%" align="center">
          <Box fw="bold">
            <Box component="span" fw="bold">
              הזמנה מס׳
            </Box>{' '}
            <Box component="span" c="red.8">
              {12345678 || '—'}
            </Box>
          </Box>

          <Image
            fallbackSrc="https://placehold.co/600x400?text=Placeholder"
            radius="lg"
            maw={180}
          />
        </Stack>

        <Stack flex={1} h="100%" gap={0}>
          <StaticField label="שעה" value="Sat 9 Dec - 9:00" separator=": " />
          <StaticField label="כתובת" value="שילת בנין מגה אור" separator=": " />
          <StaticField label="אימייל" value="omanut.hm@gmail.com" separator=": " />
          <StaticField label="טלפון" value="0522039315" separator=": " />
        </Stack>
      </Group>
    </Paper>
  );
}
