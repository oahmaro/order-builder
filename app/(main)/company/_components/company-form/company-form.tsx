'use client';

import { Accordion, Group, Stack, TextInput, Title } from '@mantine/core';

import { useCompanyFormContext } from './company-form.container';
import { companyFormContent, CompanyFormContentPhrases } from './company-form.content';
import { AddressForm, PhoneForm } from '@/components';

export default function CompanyForm() {
  const form = useCompanyFormContext();

  return (
    <Stack>
      <Stack component="section">
        <Title order={4}>
          {companyFormContent.t(CompanyFormContentPhrases.COMPANY_DETAILS_LABEL)}
        </Title>

        <Group>
          <TextInput flex={1} label="Name" placeholder="Name" {...form.getInputProps('name')} />
          <TextInput flex={1} label="Email" placeholder="Email" {...form.getInputProps('email')} />
        </Group>
      </Stack>

      <Accordion variant="contained" multiple>
        <Accordion.Item value="phones">
          <Accordion.Control>
            <Title order={4}>{companyFormContent.t(CompanyFormContentPhrases.PHONES_LABEL)}</Title>
          </Accordion.Control>

          <Accordion.Panel>
            <PhoneForm form={form} />
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="address">
          <Accordion.Control>
            <Title order={4}>{companyFormContent.t(CompanyFormContentPhrases.ADDRESS_LABEL)}</Title>
          </Accordion.Control>

          <Accordion.Panel>
            <AddressForm form={form} />
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Stack>
  );
}
