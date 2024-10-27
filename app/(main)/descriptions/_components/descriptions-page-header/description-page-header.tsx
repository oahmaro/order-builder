'use client';

import { modals } from '@mantine/modals';

import { PageHeader } from '@/components';
import { CreateDescriptionForm } from '../create-description-form';
import DescriptionFormContainer from '../description-form/description-form.container';

import {
  DescriptionsPageHeaderPhrases,
  descriptionsPageHeaderContent,
} from './description-page-header.content';

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
      backPath="/"
      actions={[
        {
          label: descriptionsPageHeaderContent.t(DescriptionsPageHeaderPhrases.ACTION),
          onClick: () =>
            modals.open({
              title: descriptionsPageHeaderContent.t(DescriptionsPageHeaderPhrases.MODAL_TITLE),
              size: 'xl',
              children: (
                <DescriptionFormContainer>
                  <CreateDescriptionForm />
                </DescriptionFormContainer>
              ),
            }),
        },
      ]}
    />
  );
}
