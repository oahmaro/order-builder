'use client';

import { modals } from '@mantine/modals';

import { PageHeader } from '@/components';
import {
  DescriptionsPageHeaderPhrases,
  descriptionsPageHeaderContent,
} from './description-page-header.content';
import CreateDescriptionFormContainer from '../create-description-form/create-description-form.container';
import { CreateDescriptionForm } from '../create-description-form';

export interface DescriptionsPageHeaderProps {
  numberOfDescriptions: number;
}

export default function DescriptionsPageHeader({
  numberOfDescriptions,
}: DescriptionsPageHeaderProps) {
  return (
    <PageHeader
      title={descriptionsPageHeaderContent.t(DescriptionsPageHeaderPhrases.TITLE)}
      subtitle={descriptionsPageHeaderContent.t(
        DescriptionsPageHeaderPhrases.SUBTITLE,
        numberOfDescriptions
      )}
      action={{
        label: descriptionsPageHeaderContent.t(DescriptionsPageHeaderPhrases.ACTION),
        onClick: () =>
          modals.open({
            title: descriptionsPageHeaderContent.t(DescriptionsPageHeaderPhrases.MODAL_TITLE),
            size: 'lg',
            children: (
              <CreateDescriptionFormContainer>
                <CreateDescriptionForm />
              </CreateDescriptionFormContainer>
            ),
          }),
      }}
    />
  );
}
