'use client';

import { PageHeader } from '@/components';
import { companyPageHeaderContent, CompanyPageHeaderPhrases } from './company-page-header.content';
import { useCompanyFormContext } from '../company-form/company-form.container';

interface CompanyPageHeaderProps {
  title: string;
}

export default function CompanyPageHeader({ title }: CompanyPageHeaderProps) {
  const form = useCompanyFormContext();

  return (
    <PageHeader
      title={title}
      backPath="/"
      actions={[
        {
          label: companyPageHeaderContent.t(CompanyPageHeaderPhrases.SAVE_ACTION),
          onClick: () => {},
          disabled: !form.isDirty(),
          type: 'submit',
          tooltipLabel: !form.isDirty()
            ? companyPageHeaderContent.t(CompanyPageHeaderPhrases.SAVE_DISABLED_TOOLTIP)
            : undefined,
        },
      ]}
    />
  );
}
