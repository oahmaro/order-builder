'use client';

import { modals } from '@mantine/modals';

import { PageHeader } from '@/components';
import { CreatePassepartoutForm } from '../create-passepartout-form';
import PassepartoutFormContainer from '../passepartout-form/passepartout-form.container';

import {
  passepartoutsPageHeaderContent,
  PassepartoutsPageHeaderPhrases,
} from './passepartouts-page-header.content';

interface PassepartoutsPageHeaderProps {
  numberOfPassepartouts: number;
}

export default function PassepartoutsPageHeader({
  numberOfPassepartouts,
}: PassepartoutsPageHeaderProps) {
  return (
    <PageHeader
      title={passepartoutsPageHeaderContent.t(PassepartoutsPageHeaderPhrases.TITLE)}
      subtitle={passepartoutsPageHeaderContent.t(
        PassepartoutsPageHeaderPhrases.SUBTITLE,
        numberOfPassepartouts
      )}
      backPath="/"
      actions={[
        {
          label: passepartoutsPageHeaderContent.t(PassepartoutsPageHeaderPhrases.ACTION),
          onClick: () => {
            modals.open({
              title: passepartoutsPageHeaderContent.t(PassepartoutsPageHeaderPhrases.MODAL_TITLE),
              size: 'lg',
              children: (
                <PassepartoutFormContainer>
                  <CreatePassepartoutForm />
                </PassepartoutFormContainer>
              ),
            });
          },
        },
      ]}
    />
  );
}
