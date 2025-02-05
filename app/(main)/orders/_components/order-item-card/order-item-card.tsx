'use client';

import { modals } from '@mantine/modals';
import { Adhesion, Description, Frame, Passepartout, Print } from '@prisma/client';

import {
  Box,
  Text,
  Group,
  Stack,
  Select,
  Button,
  Divider,
  Tooltip,
  Checkbox,
  Accordion,
  NumberInput,
  MultiSelect,
  NumberFormatter,
} from '@mantine/core';

import { MediaCapture } from '../media-capture';
import { NothingFoundButton, StaticField } from '@/components';
import { useOrderFormContext } from '../order-form/order-form.container';
import { CreateFrameForm } from '@/app/(main)/frames/_components/create-frame-form';
import { CreatePrintForm } from '@/app/(main)/prints/_components/create-print-form';
import { TextAreaWithCounter } from './text-area-with-counter/text-area-with-counter';
import { CreateAdhesionForm } from '@/app/(main)/adhesions/_components/create-adhesion-form';
import { orderItemCardContent, OrderItemCardContentPhrases } from './order-item-card.content';
import PrintFormContainer from '@/app/(main)/prints/_components/print-form/print-form.container';
import FrameFormContainer from '@/app/(main)/frames/_components/frame-form/frame-form.container';
import { CreateDescriptionForm } from '@/app/(main)/descriptions/_components/create-description-form';
import { CreatePassepartoutForm } from '@/app/(main)/passepartouts/_components/create-passepartout-form';
import AdhesionFormContainer from '@/app/(main)/adhesions/_components/adhesion-form/adhesion-form.container';
import DescriptionFormContainer from '@/app/(main)/descriptions/_components/description-form/description-form.container';
import PassepartoutFormContainer from '@/app/(main)/passepartouts/_components/passepartout-form/passepartout-form.container';

export interface OrderItemCardProps {
  index: number;
  frames: Frame[];
  prints: Print[];
  disabled?: boolean;
  adhesions: Adhesion[];
  isRemoveDisabled?: boolean;
  descriptions: Description[];
  passepartouts: Passepartout[];
  onRemove: () => void;
}

export default function OrderItemCard({
  index,
  frames,
  prints,
  adhesions,
  descriptions,
  passepartouts,
  onRemove,
  isRemoveDisabled,
  disabled,
}: OrderItemCardProps) {
  const form = useOrderFormContext();

  const handleImageCapture = async (file: File | undefined) => {
    if (disabled) return;

    if (file) {
      form.setFieldValue(`orderItems.${index}.imageFile`, file);
      form.setFieldValue(`orderItems.${index}.image`, null);
    } else {
      form.setFieldValue(`orderItems.${index}.imageFile`, null);
      form.setFieldValue(`orderItems.${index}.image`, null);
    }
  };

  const handleCreateFrame = () => {
    modals.open({
      title: orderItemCardContent.t(OrderItemCardContentPhrases.CREATE_FRAME),
      size: 'xl',
      closeOnClickOutside: false,
      children: (
        <FrameFormContainer>
          <CreateFrameForm />
        </FrameFormContainer>
      ),
    });
  };

  const handleCreateAdhesion = () => {
    modals.open({
      title: orderItemCardContent.t(OrderItemCardContentPhrases.CREATE_ADHESION),
      size: 'xl',
      closeOnClickOutside: false,
      children: (
        <AdhesionFormContainer>
          <CreateAdhesionForm />
        </AdhesionFormContainer>
      ),
    });
  };

  const handleCreatePrint = () => {
    modals.open({
      title: orderItemCardContent.t(OrderItemCardContentPhrases.CREATE_PRINT),
      size: 'xl',
      closeOnClickOutside: false,
      children: (
        <PrintFormContainer>
          <CreatePrintForm />
        </PrintFormContainer>
      ),
    });
  };

  const handleCreateDescription = () => {
    modals.open({
      title: orderItemCardContent.t(OrderItemCardContentPhrases.CREATE_DESCRIPTION),
      size: 'xl',
      closeOnClickOutside: false,
      children: (
        <DescriptionFormContainer>
          <CreateDescriptionForm />
        </DescriptionFormContainer>
      ),
    });
  };

  const handleCreatePassepartout = () => {
    modals.open({
      title: orderItemCardContent.t(OrderItemCardContentPhrases.CREATE_PASSEPARTOUT),
      size: 'xl',
      closeOnClickOutside: false,
      children: (
        <PassepartoutFormContainer>
          <CreatePassepartoutForm />
        </PassepartoutFormContainer>
      ),
    });
  };

  return (
    <Accordion.Item value={`item-${index}`} pos="relative">
      <Tooltip
        disabled={!isRemoveDisabled}
        label={orderItemCardContent.t(OrderItemCardContentPhrases.REMOVE_ORDER_DISABLED_TOOLTIP)}
      >
        <Button
          ml="xl"
          top={10}
          left={16}
          size="xs"
          color="red"
          pos="absolute"
          variant="outline"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          disabled={isRemoveDisabled}
        >
          {orderItemCardContent.t(OrderItemCardContentPhrases.REMOVE_ORDER)}
        </Button>
      </Tooltip>

      <Accordion.Control>
        <Text fw={500}>
          {orderItemCardContent.t(OrderItemCardContentPhrases.ORDER_ITEM)} {index + 1}
        </Text>
      </Accordion.Control>

      <Accordion.Panel>
        <Box px="xl" pb="xl">
          <Group align="flex-start">
            <Stack flex={1}>
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
                          prefix="cm"
                          hideControls
                          clampBehavior="strict"
                          allowLeadingZeros={false}
                          placeholder={orderItemCardContent.t(
                            OrderItemCardContentPhrases.WIDTH_PLACEHOLDER
                          )}
                          error={!!form.errors[`orderItems.${index}.width`]}
                          {...form.getInputProps(`orderItems.${index}.width`, {
                            type: 'input',
                            withError: false,
                          })}
                          disabled={disabled}
                        />

                        <Box fw="bold" h={36} lh={2.075}>
                          x
                        </Box>

                        <NumberInput
                          w={120}
                          min={1}
                          max={999}
                          size="sm"
                          prefix="cm"
                          hideControls
                          clampBehavior="strict"
                          allowLeadingZeros={false}
                          placeholder={orderItemCardContent.t(
                            OrderItemCardContentPhrases.HEIGHT_PLACEHOLDER
                          )}
                          error={!!form.errors[`orderItems.${index}.height`]}
                          {...form.getInputProps(`orderItems.${index}.height`, {
                            type: 'input',
                            withError: false,
                          })}
                          disabled={disabled}
                        />
                      </Group>

                      {(form.errors[`orderItems.${index}.width`] ||
                        form.errors[`orderItems.${index}.height`]) && (
                        <Text c="red" size="sm" mt={5}>
                          {orderItemCardContent.t(OrderItemCardContentPhrases.DIMENSIONS_REQUIRED)}
                        </Text>
                      )}
                    </Stack>
                  </Group>

                  <Select
                    size="sm"
                    clearable
                    searchable
                    styles={{
                      root: { display: 'flex', alignItems: 'center' },
                      label: { marginLeft: '8px' },
                      input: { width: 200 },
                      empty: { padding: 0 },
                    }}
                    nothingFoundMessage={
                      <NothingFoundButton
                        label={orderItemCardContent.t(OrderItemCardContentPhrases.CREATE_NEW_FRAME)}
                        onClick={handleCreateFrame}
                      />
                    }
                    label={orderItemCardContent.t(OrderItemCardContentPhrases.FRAME_NUMBER)}
                    data={[
                      ...frames.map((frame) => ({
                        value: frame.id.toString(),
                        label: frame.name,
                      })),
                    ]}
                    onChange={(value) => {
                      form.setFieldValue(`orderItems.${index}.frameId`, value);
                    }}
                    value={form.values.orderItems[index].frameId?.toString()}
                    placeholder={orderItemCardContent.t(
                      OrderItemCardContentPhrases.FRAME_NUMBER_PLACEHOLDER
                    )}
                    disabled={disabled}
                  />

                  <Group>
                    <Select
                      size="sm"
                      clearable
                      searchable
                      styles={{
                        root: { display: 'flex', alignItems: 'center' },
                        label: { marginLeft: '8px' },
                        input: { width: 200 },
                        empty: { padding: 0 },
                      }}
                      comboboxProps={{ shadow: 'md' }}
                      label={orderItemCardContent.t(OrderItemCardContentPhrases.PASSEPARTOUT)}
                      nothingFoundMessage={
                        <NothingFoundButton
                          label={orderItemCardContent.t(
                            OrderItemCardContentPhrases.CREATE_NEW_PASSEPARTOUT
                          )}
                          onClick={handleCreatePassepartout}
                        />
                      }
                      data={passepartouts.map((passepartout) => ({
                        value: passepartout.id.toString(),
                        label: passepartout.name,
                      }))}
                      onChange={(value) => {
                        form.setFieldValue(`orderItems.${index}.passepartoutId`, value);
                      }}
                      value={form.values.orderItems[index].passepartoutId?.toString()}
                      placeholder={orderItemCardContent.t(
                        OrderItemCardContentPhrases.PASSEPARTOUT_PLACEHOLDER
                      )}
                      disabled={disabled}
                    />

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
                      prefix="cm"
                      hideControls
                      clampBehavior="strict"
                      allowLeadingZeros={false}
                      {...form.getInputProps(`orderItems.${index}.passepartoutWidth`)}
                      placeholder={orderItemCardContent.t(
                        OrderItemCardContentPhrases.PASSEPARTOUT_WIDTH_PLACEHOLDER
                      )}
                      disabled={disabled}
                    />
                  </Group>

                  <Group gap={40}>
                    <Checkbox
                      size="sm"
                      label={orderItemCardContent.t(OrderItemCardContentPhrases.GLASS_TRANSPARENT)}
                      {...form.getInputProps(`orderItems.${index}.glassTypes.transparent`, {
                        type: 'checkbox',
                      })}
                      disabled={disabled}
                    />

                    <Checkbox
                      size="sm"
                      label={orderItemCardContent.t(OrderItemCardContentPhrases.GLASS_MATTE)}
                      {...form.getInputProps(`orderItems.${index}.glassTypes.matte`, {
                        type: 'checkbox',
                      })}
                      disabled={disabled}
                    />

                    <Checkbox
                      size="sm"
                      label={orderItemCardContent.t(OrderItemCardContentPhrases.GLASS_NONE)}
                      {...form.getInputProps(`orderItems.${index}.glassTypes.none`, {
                        type: 'checkbox',
                      })}
                      disabled={disabled}
                    />

                    <Checkbox
                      size="sm"
                      label={orderItemCardContent.t(OrderItemCardContentPhrases.GLASS_PERSPEX)}
                      {...form.getInputProps(`orderItems.${index}.glassTypes.perspex`, {
                        type: 'checkbox',
                      })}
                      disabled={disabled}
                    />

                    <Checkbox
                      size="sm"
                      label={orderItemCardContent.t(OrderItemCardContentPhrases.GLASS_MIRROR)}
                      {...form.getInputProps(`orderItems.${index}.glassTypes.mirror`, {
                        type: 'checkbox',
                      })}
                      disabled={disabled}
                    />
                  </Group>

                  <MultiSelect
                    size="sm"
                    clearable
                    searchable
                    styles={{
                      root: { display: 'flex', alignItems: 'center' },
                      label: { marginLeft: '8px', minWidth: 56 },
                      input: { width: 400 },
                      empty: { padding: 0 },
                    }}
                    comboboxProps={{ shadow: 'md' }}
                    label={orderItemCardContent.t(OrderItemCardContentPhrases.ADHESIONS)}
                    nothingFoundMessage={
                      <NothingFoundButton
                        label={orderItemCardContent.t(
                          OrderItemCardContentPhrases.CREATE_NEW_ADHESION
                        )}
                        onClick={handleCreateAdhesion}
                      />
                    }
                    data={adhesions.map((adhesion) => ({
                      value: adhesion.id.toString(),
                      label: adhesion.name,
                    }))}
                    onChange={(values) => {
                      form.setFieldValue(
                        `orderItems.${index}.adhesionIds`,
                        values.map((v) => parseInt(v, 10))
                      );
                    }}
                    value={
                      form.values.orderItems[index].adhesionIds?.map((id) => id.toString()) || []
                    }
                    placeholder={orderItemCardContent.t(
                      OrderItemCardContentPhrases.ADHESIONS_PLACEHOLDER
                    )}
                    disabled={disabled}
                  />

                  <MultiSelect
                    size="sm"
                    clearable
                    searchable
                    styles={{
                      root: { display: 'flex', alignItems: 'center' },
                      label: { marginLeft: '8px', minWidth: 56 },
                      input: { width: 400 },
                      empty: { padding: 0 },
                    }}
                    comboboxProps={{ shadow: 'md' }}
                    label={orderItemCardContent.t(OrderItemCardContentPhrases.PRINTS)}
                    nothingFoundMessage={
                      <NothingFoundButton
                        label={orderItemCardContent.t(OrderItemCardContentPhrases.CREATE_NEW_PRINT)}
                        onClick={handleCreatePrint}
                      />
                    }
                    data={prints.map((print) => ({
                      value: print.id.toString(),
                      label: print.name,
                    }))}
                    onChange={(values) => {
                      form.setFieldValue(
                        `orderItems.${index}.printIds`,
                        values.map((v) => parseInt(v, 10))
                      );
                    }}
                    value={form.values.orderItems[index].printIds?.map((id) => id.toString()) || []}
                    placeholder={orderItemCardContent.t(
                      OrderItemCardContentPhrases.PRINTS_PLACEHOLDER
                    )}
                    disabled={disabled}
                  />

                  <MultiSelect
                    size="sm"
                    clearable
                    searchable
                    styles={{
                      root: { display: 'flex', alignItems: 'center' },
                      label: { marginLeft: '8px', minWidth: 56 },
                      input: { width: 400 },
                      empty: { padding: 0 },
                    }}
                    comboboxProps={{ shadow: 'md' }}
                    label={orderItemCardContent.t(OrderItemCardContentPhrases.DESCRIPTION)}
                    nothingFoundMessage={
                      <NothingFoundButton
                        label={orderItemCardContent.t(
                          OrderItemCardContentPhrases.CREATE_NEW_DESCRIPTION
                        )}
                        onClick={handleCreateDescription}
                      />
                    }
                    data={descriptions.map((description) => ({
                      value: description.id.toString(),
                      label: description.name,
                    }))}
                    onChange={(values) => {
                      form.setFieldValue(
                        `orderItems.${index}.descriptionIds`,
                        values.map((v) => parseInt(v, 10))
                      );
                    }}
                    value={
                      form.values.orderItems[index].descriptionIds?.map((id) => id.toString()) || []
                    }
                    placeholder={orderItemCardContent.t(
                      OrderItemCardContentPhrases.DESCRIPTION_PLACEHOLDER
                    )}
                    disabled={disabled}
                  />
                </Stack>
              </Group>

              <Divider w="100%" />

              <Group align="flex-start">
                <NumberInput
                  size="sm"
                  styles={{
                    root: { display: 'flex', alignItems: 'center' },
                    label: { marginLeft: '8px' },
                    input: { width: 160 },
                  }}
                  label={orderItemCardContent.t(OrderItemCardContentPhrases.QUANTITY)}
                  {...form.getInputProps(`orderItems.${index}.quantity`)}
                  placeholder={orderItemCardContent.t(
                    OrderItemCardContentPhrases.QUANTITY_PLACEHOLDER
                  )}
                  disabled={disabled}
                />

                <Group align="flex-start">
                  <Stack justify="center" h={36}>
                    <Text>{orderItemCardContent.t(OrderItemCardContentPhrases.UNIT_PRICE)}</Text>
                  </Stack>

                  <NumberInput
                    size="sm"
                    prefix="₪"
                    hideControls
                    allowLeadingZeros={false}
                    allowDecimal={false}
                    {...form.getInputProps(`orderItems.${index}.unitPrice`)}
                    placeholder={orderItemCardContent.t(
                      OrderItemCardContentPhrases.UNIT_PRICE_PLACEHOLDER
                    )}
                    disabled={disabled}
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

            <Stack flex={1} maw={400}>
              <MediaCapture
                value={form.values.orderItems[index].image || undefined}
                onCapture={handleImageCapture}
                disabled={disabled}
              />

              <TextAreaWithCounter
                label={orderItemCardContent.t(OrderItemCardContentPhrases.NOTES)}
                placeholder={orderItemCardContent.t(OrderItemCardContentPhrases.NOTES)}
                maxLength={45}
                {...form.getInputProps(`orderItems.${index}.notes`)}
                disabled={disabled}
              />
            </Stack>
          </Group>
        </Box>
      </Accordion.Panel>
    </Accordion.Item>
  );
}
