'use client';

import { modals } from '@mantine/modals';

import { PageHeader } from '@/components';

import { CreateAdhesionForm } from '../create-adhesion-form';

import {
  adhesionsPageHeaderContent,
  AdhesionsPageHeaderPhrases,
} from './adhesions-page-header.content';
import AdhesionFormContainer from '../adhesion-form/adhesion-form.container';

export interface AdhesionsPageHeaderProps {
  numberOfAdhesions: number;
}

export default function AdhesionsPageHeader({ numberOfAdhesions }: AdhesionsPageHeaderProps) {
  return (
    <PageHeader
      title={adhesionsPageHeaderContent.t(AdhesionsPageHeaderPhrases.TITLE)}
      subtitle={adhesionsPageHeaderContent.t(
        AdhesionsPageHeaderPhrases.SUBTITLE,
        numberOfAdhesions
      )}
      backPath="/"
      actions={[
        {
          label: adhesionsPageHeaderContent.t(AdhesionsPageHeaderPhrases.ACTION),
          onClick: () =>
            modals.open({
              title: adhesionsPageHeaderContent.t(AdhesionsPageHeaderPhrases.MODAL_TITLE),
              size: 'xl',
              closeOnClickOutside: false,
              children: (
                <AdhesionFormContainer>
                  <CreateAdhesionForm />
                </AdhesionFormContainer>
              ),
            }),
        },
      ]}
    />
  );
}
