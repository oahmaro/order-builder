'use client';

import { modals } from '@mantine/modals';

import { PageHeader } from '@/components';
import {
  adhesionsPageHeaderContent,
  AdhesionsPageHeaderPhrases,
} from './adhesions-page-header.content';
import CreateAdhesionFormContainer from '../create-adhesion-form/create-adhesion-form.container';
import { CreateAdhesionForm } from '../create-adhesion-form';

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
      action={{
        label: adhesionsPageHeaderContent.t(AdhesionsPageHeaderPhrases.ACTION),
        onClick: () =>
          modals.open({
            title: adhesionsPageHeaderContent.t(AdhesionsPageHeaderPhrases.MODAL_TITLE),
            size: 'lg',
            children: (
              <CreateAdhesionFormContainer>
                <CreateAdhesionForm />
              </CreateAdhesionFormContainer>
            ),
          }),
      }}
    />
  );
}
