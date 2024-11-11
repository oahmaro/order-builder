import { forwardRef } from 'react';
import { Adhesion, Description, Frame, Print } from '@prisma/client';

import {
  Box,
  Button,
  Checkbox,
  Divider,
  Group,
  Image,
  NumberFormatter,
  NumberInput,
  Paper,
  Select,
  Stack,
  Textarea,
  Text,
} from '@mantine/core';

import { StaticField } from '@/components';
import classes from './order-item-card.module.css';
import { useOrderFormContext } from '../order-form/order-form.container';
import { orderItemCardContent, OrderItemCardContentPhrases } from './order-item-card.content';

export interface OrderItemCardProps {
  index: number;
  frames: Frame[];
  prints: Print[];
  adhesions: Adhesion[];
  descriptions: Description[];
  onRemove: () => void;
  isRemoveDisabled?: boolean;
}

const OrderItemCard = forwardRef<HTMLDivElement, OrderItemCardProps>(
  ({ index, frames, prints, adhesions, descriptions, onRemove, isRemoveDisabled }, ref) => {
    const form = useOrderFormContext();

    return (
      <Paper ref={ref} className={classes.root} shadow="xs" radius="md">
        <Stack>
          <Group>
            <Button variant="outline" color="red" onClick={onRemove} disabled={isRemoveDisabled}>
              {orderItemCardContent.t(OrderItemCardContentPhrases.REMOVE_ORDER)}
            </Button>
          </Group>

          <Group align="flex-start" gap="xl">
            <Stack flex={1}>
              <Group align="flex-start">
                <Stack justify="center" h={36}>
                  <Text fz="sm">
                    {orderItemCardContent.t(OrderItemCardContentPhrases.IMAGE_DIMENSIONS)}
                  </Text>
                </Stack>

                <Stack gap={0}>
                  <Group align="flex-end">
                    <NumberInput
                      w={120}
                      min={1}
                      max={999}
                      size="sm"
                      prefix="cm "
                      hideControls
                      clampBehavior="strict"
                      placeholder={orderItemCardContent.t(OrderItemCardContentPhrases.WIDTH)}
                      error={!!form.errors[`orderItems.${index}.width`]}
                      {...form.getInputProps(`orderItems.${index}.width`, {
                        type: 'input',
                        withError: false,
                      })}
                    />

                    <Box fw="bold" h={36} lh={2.075}>
                      x
                    </Box>

                    <NumberInput
                      w={120}
                      min={1}
                      max={999}
                      size="sm"
                      prefix="cm "
                      hideControls
                      clampBehavior="strict"
                      placeholder={orderItemCardContent.t(OrderItemCardContentPhrases.HEIGHT)}
                      error={!!form.errors[`orderItems.${index}.height`]}
                      {...form.getInputProps(`orderItems.${index}.height`, {
                        type: 'input',
                        withError: false,
                      })}
                    />
                  </Group>

                  {(form.errors[`orderItems.${index}.width`] ||
                    form.errors[`orderItems.${index}.height`]) && (
                    <Text c="red" size="xs" mt={5}>
                      {orderItemCardContent.t(OrderItemCardContentPhrases.DIMENSIONS_REQUIRED)}
                    </Text>
                  )}
                </Stack>
              </Group>

              <Select
                styles={{
                  root: { display: 'flex', alignItems: 'center' },
                  label: { marginLeft: '8px' },
                  input: { width: 200 },
                }}
                nothingFoundMessage={orderItemCardContent.t(
                  OrderItemCardContentPhrases.NOTHING_FOUND
                )}
                label={orderItemCardContent.t(OrderItemCardContentPhrases.FRAME_NUMBER)}
                data={frames.map((frame) => ({ value: frame.id.toString(), label: frame.name }))}
                {...form.getInputProps(`orderItems.${index}.frameId`)}
              />

              <Group>
                <Stack justify="center" h={36}>
                  <Text fz="sm">
                    {orderItemCardContent.t(OrderItemCardContentPhrases.PASSEPARTOUT_WIDTH)}
                  </Text>
                </Stack>

                <NumberInput
                  w={120}
                  min={1}
                  max={999}
                  size="sm"
                  prefix="cm "
                  hideControls
                  clampBehavior="strict"
                  {...form.getInputProps(`orderItems.${index}.passepartoutWidth`)}
                />

                <Select
                  styles={{
                    root: { display: 'flex', alignItems: 'center' },
                    label: { marginLeft: '8px' },
                    input: { width: 200 },
                  }}
                  nothingFoundMessage={orderItemCardContent.t(
                    OrderItemCardContentPhrases.NOTHING_FOUND
                  )}
                  label={orderItemCardContent.t(OrderItemCardContentPhrases.PASSEPARTOUT_NUMBER)}
                  {...form.getInputProps(`orderItems.${index}.passepartoutNum`)}
                />
              </Group>

              <Group gap={40}>
                <Checkbox
                  label={orderItemCardContent.t(OrderItemCardContentPhrases.GLASS_TRANSPARENT)}
                  {...form.getInputProps(`orderItems.${index}.glassTypes.transparent`, {
                    type: 'checkbox',
                  })}
                />
                <Checkbox
                  label={orderItemCardContent.t(OrderItemCardContentPhrases.GLASS_MATTE)}
                  {...form.getInputProps(`orderItems.${index}.glassTypes.matte`, {
                    type: 'checkbox',
                  })}
                />
                <Checkbox
                  label={orderItemCardContent.t(OrderItemCardContentPhrases.GLASS_NONE)}
                  {...form.getInputProps(`orderItems.${index}.glassTypes.none`, {
                    type: 'checkbox',
                  })}
                />
                <Checkbox
                  label={orderItemCardContent.t(OrderItemCardContentPhrases.GLASS_PERSPEX)}
                  {...form.getInputProps(`orderItems.${index}.glassTypes.perspex`, {
                    type: 'checkbox',
                  })}
                />
                <Checkbox
                  label={orderItemCardContent.t(OrderItemCardContentPhrases.GLASS_MIRROR)}
                  {...form.getInputProps(`orderItems.${index}.glassTypes.mirror`, {
                    type: 'checkbox',
                  })}
                />
              </Group>

              <Select
                styles={{
                  root: { display: 'flex', alignItems: 'center' },
                  label: { marginLeft: '8px', minWidth: 56 },
                  input: { width: 400 },
                }}
                label={orderItemCardContent.t(OrderItemCardContentPhrases.ADHESIONS)}
                nothingFoundMessage={orderItemCardContent.t(
                  OrderItemCardContentPhrases.NOTHING_FOUND
                )}
                data={adhesions.map((adhesion) => ({
                  value: adhesion.id.toString(),
                  label: adhesion.name,
                }))}
                {...form.getInputProps(`orderItems.${index}.adhesionId`)}
              />

              <Select
                styles={{
                  root: { display: 'flex', alignItems: 'center' },
                  label: { marginLeft: '8px', minWidth: 56 },
                  input: { width: 400 },
                }}
                nothingFoundMessage={orderItemCardContent.t(
                  OrderItemCardContentPhrases.NOTHING_FOUND
                )}
                label={orderItemCardContent.t(OrderItemCardContentPhrases.PRINTS)}
                data={prints.map((print) => ({ value: print.id.toString(), label: print.name }))}
                {...form.getInputProps(`orderItems.${index}.printId`)}
              />

              <Select
                styles={{
                  root: { display: 'flex', alignItems: 'center' },
                  label: { marginLeft: '8px', minWidth: 56 },
                  input: { width: 400 },
                }}
                nothingFoundMessage={orderItemCardContent.t(
                  OrderItemCardContentPhrases.NOTHING_FOUND
                )}
                label={orderItemCardContent.t(OrderItemCardContentPhrases.DESCRIPTION)}
                data={descriptions.map((description) => ({
                  value: description.id.toString(),
                  label: description.name,
                }))}
                {...form.getInputProps(`orderItems.${index}.descriptionId`)}
              />
            </Stack>

            <Stack flex={1} maw={300}>
              <Image fallbackSrc="https://placehold.co/600x400?text=Placeholder" radius="lg" />
              <Textarea
                placeholder={orderItemCardContent.t(OrderItemCardContentPhrases.NOTES)}
                autosize
                minRows={4}
                {...form.getInputProps(`orderItems.${index}.notes`)}
              />
            </Stack>
          </Group>

          <Divider w="100%" />

          <Group align="flex-start">
            <NumberInput
              styles={{
                root: { display: 'flex', alignItems: 'center' },
                label: { marginLeft: '8px' },
                input: { width: 160 },
              }}
              label={orderItemCardContent.t(OrderItemCardContentPhrases.QUANTITY)}
              {...form.getInputProps(`orderItems.${index}.quantity`)}
            />

            <Group align="flex-start">
              <Stack justify="center" h={36}>
                <Text>{orderItemCardContent.t(OrderItemCardContentPhrases.UNIT_PRICE)}</Text>
              </Stack>

              <NumberInput
                prefix="₪"
                hideControls
                {...form.getInputProps(`orderItems.${index}.unitPrice`)}
              />
            </Group>

            <Stack justify="center" h={36}>
              <StaticField
                label={orderItemCardContent.t(OrderItemCardContentPhrases.PRICE)}
                value={
                  <NumberFormatter
                    prefix="₪"
                    value={
                      (form.values.orderItems[index].unitPrice || 0) *
                      (form.values.orderItems[index].quantity || 1)
                    }
                    thousandSeparator
                  />
                }
                separator=": "
              />
            </Stack>
          </Group>
        </Stack>
      </Paper>
    );
  }
);

OrderItemCard.displayName = 'OrderItemCard';

export default OrderItemCard;
