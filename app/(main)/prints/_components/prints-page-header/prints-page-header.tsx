'use client';

import { modals } from '@mantine/modals';

import { PageHeader } from '@/components';
import { printsPageHeaderContent, PrintsPageHeaderPhrases } from './prints-page-header.content';
import CreatePrintFormContainer from '../create-print-form/create-print-form.container';
import { CreatePrintForm } from '../create-print-form';

export interface PrintsPageHeaderProps {
  numberOfPrints: number;
}

export default function PrintsPageHeader({ numberOfPrints }: PrintsPageHeaderProps) {
  return (
    <PageHeader
      title={printsPageHeaderContent.t(PrintsPageHeaderPhrases.TITLE)}
      subtitle={printsPageHeaderContent.t(PrintsPageHeaderPhrases.SUBTITLE, numberOfPrints)}
      action={{
        label: printsPageHeaderContent.t(PrintsPageHeaderPhrases.ACTION),
        onClick: () =>
          modals.open({
            title: printsPageHeaderContent.t(PrintsPageHeaderPhrases.MODAL_TITLE),
            size: 'lg',
            children: (
              <CreatePrintFormContainer>
                <CreatePrintForm />
              </CreatePrintFormContainer>
            ),
          }),
      }}
    />
  );
}
