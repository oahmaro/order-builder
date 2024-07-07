import { forwardRef } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Group,
  Image,
  NumberInput,
  Paper,
  Select,
  Stack,
  Textarea,
  TextInput,
} from '@mantine/core';
import classes from './order-item-card.module.css';

export interface OrderItemCardProps {}

const OrderItemCard = forwardRef<HTMLDivElement, OrderItemCardProps>((props, ref) => (
  <Paper ref={ref} className={classes.root} shadow="xs" radius="md">
    <Stack>
      <Group>
        <Button variant="outline" color="red">
          Remove order
        </Button>
      </Group>

      <Group align="flex-start" gap="xl">
        <Stack flex={1}>
          <Group>
            <NumberInput
              size="sm"
              styles={{
                root: { display: 'flex', alignItems: 'center' },
                label: { marginLeft: '8px' },
                input: { width: 80 },
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
              styles={{
                root: { display: 'flex', alignItems: 'center' },
                label: { marginLeft: '8px' },
                input: { width: 80 },
              }}
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

          <Select
            styles={{
              root: { display: 'flex', alignItems: 'center' },
              label: { marginLeft: '8px' },
              input: { width: 200 },
            }}
            label="מספר מסגרת"
          />

          <Group>
            <NumberInput
              styles={{
                root: { display: 'flex', alignItems: 'center' },
                label: { marginLeft: '8px' },
                input: { width: 200 },
              }}
              label="רוחב"
              hideControls
            />

            <Select
              styles={{
                root: { display: 'flex', alignItems: 'center' },
                label: { marginLeft: '8px' },
                input: { width: 200 },
              }}
              label="מספר פספרטו"
            />
          </Group>

          <Group gap={40}>
            <Checkbox label="זכוכית שקוף" />
            <Checkbox label="זכוכית מט" />
            <Checkbox label="בלי זכוכית" />
            <Checkbox label="פרספקס" />
            <Checkbox label="מראה" />
          </Group>

          <TextInput
            styles={{
              root: { display: 'flex', alignItems: 'center' },
              label: { marginLeft: '8px', minWidth: 56 },
              input: { width: 400 },
            }}
            label="הדבקות"
          />

          <TextInput
            styles={{
              root: { display: 'flex', alignItems: 'center' },
              label: { marginLeft: '8px', minWidth: 56 },
              input: { width: 400 },
            }}
            label="הדפסות"
          />

          <TextInput
            styles={{
              root: { display: 'flex', alignItems: 'center' },
              label: { marginLeft: '8px', minWidth: 56 },
              input: { width: 400 },
            }}
            label="תיאור"
          />
        </Stack>

        <Stack flex={1} maw={300}>
          <Image fallbackSrc="https://placehold.co/600x400?text=Placeholder" radius="lg" />
          <Textarea placeholder="הערות" autosize minRows={4} />
        </Stack>
      </Group>

      <Divider w="100%" />

      <Group>
        <TextInput
          styles={{
            root: { display: 'flex', alignItems: 'center' },
            label: { marginLeft: '8px' },
            input: { width: 160 },
          }}
          label="כמות"
        />

        <TextInput
          styles={{
            root: { display: 'flex', alignItems: 'center' },
            label: { marginLeft: '8px' },
            input: { width: 160 },
          }}
          label="מחיר יחידה"
        />

        <TextInput
          styles={{
            root: { display: 'flex', alignItems: 'center' },
            label: { marginLeft: '8px' },
            input: { width: 160 },
          }}
          label="מחיר"
        />
      </Group>
    </Stack>
  </Paper>
));

OrderItemCard.displayName = 'OrderItemCard';

export default OrderItemCard;
