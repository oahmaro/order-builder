import { forwardRef } from 'react';
import { Box, Checkbox, Group, NumberInput, Select, Stack } from '@mantine/core';
import classes from './order-item-card.module.css';

export interface OrderItemCardProps {}

const OrderItemCard = forwardRef<HTMLDivElement, OrderItemCardProps>((props, ref) => (
  <Stack ref={ref} className={classes.root}>
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

    {/* <CheckboxGroup defaultChecked> */}
    <Group>
      <Checkbox label="זכוכית שקוף" />
      <Checkbox label="זכוכית מט" />
      <Checkbox label="בלי זכוכית" />
      <Checkbox label="פרספקס" />
      <Checkbox label="מראה" />
    </Group>
    {/* </CheckboxGroup> */}
  </Stack>
));

OrderItemCard.displayName = 'OrderItemCard';

export default OrderItemCard;
