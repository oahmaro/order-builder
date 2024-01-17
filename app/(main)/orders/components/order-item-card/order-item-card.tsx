import { forwardRef } from 'react';
import {
  Box,
  Checkbox,
  Divider,
  Group,
  NumberInput,
  Paper,
  Select,
  Stack,
  TextInput,
} from '@mantine/core';
import classes from './order-item-card.module.css';

export interface OrderItemCardProps {}

const OrderItemCard = forwardRef<HTMLDivElement, OrderItemCardProps>((props, ref) => (
  <Paper ref={ref} className={classes.root} shadow="xs" radius="md">
    <Stack>
      <Group>
        <NumberInput
          size="sm"
          classNames={{
            root: classes.frameDimensionRoot,
            label: classes.frameDimensionLabel,
            input: classes.frameDimensionInput,
          }}
          label="מידות תמונה"
          placeholder="רוֹחַב"
          hideControls
          min={1}
          max={999}
          prefix="cm "
          clampBehavior="strict"
        />
        <Box fw="bold">x</Box>
        <NumberInput
          size="sm"
          placeholder="גוֹבַה"
          hideControls
          min={1}
          max={999}
          prefix="cm "
          w={80}
          clampBehavior="strict"
        />
      </Group>

      <Select label="מספר מסגרת" />

      <Group>
        <NumberInput label="רוחב" hideControls />
        <Select label="מספר פספרטו" />
      </Group>

      <Group>
        <Checkbox label="זכוכית שקוף" />
        <Checkbox label="זכוכית מט" />
        <Checkbox label="בלי זכוכית" />
        <Checkbox label="פרספקס" />
        <Checkbox label="מראה" />
      </Group>

      <TextInput label="הדבקות" />
      <TextInput label="הדפסות" />
      <TextInput label="תיאור" />

      <Divider />
    </Stack>
  </Paper>
));

OrderItemCard.displayName = 'OrderItemCard';

export default OrderItemCard;
