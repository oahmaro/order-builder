'use client';

import { modals } from '@mantine/modals';

import { PageHeader } from '@/components';
import { CreatePrintForm } from '../create-print-form';
import PrintFormContainer from '../print-form/print-form.container';
import { printsPageHeaderContent, PrintsPageHeaderPhrases } from './prints-page-header.content';

export interface PrintsPageHeaderProps {
  numberOfPrints: number;
}

export default function PrintsPageHeader({ numberOfPrints }: PrintsPageHeaderProps) {
  return (
    <PageHeader
      title={printsPageHeaderContent.t(PrintsPageHeaderPhrases.TITLE)}
      subtitle={printsPageHeaderContent.t(PrintsPageHeaderPhrases.SUBTITLE, numberOfPrints)}
      backPath="/"
      actions={[
        {
          label: printsPageHeaderContent.t(PrintsPageHeaderPhrases.ACTION),
          onClick: () =>
            modals.open({
              title: printsPageHeaderContent.t(PrintsPageHeaderPhrases.MODAL_TITLE),
              size: 'lg',
              children: (
                <PrintFormContainer>
                  <CreatePrintForm />
                </PrintFormContainer>
              ),
            }),
        },
      ]}
    />
  );
}
