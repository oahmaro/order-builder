import { db } from '@/lib/db';
import CompanyFormContainer from './_components/company-form/company-form.container';
import UpdateCompanyForm from './_components/update-company-form/update-company-form';

export default async function CompanyPage() {
  const company = await db.company.findUnique({
    where: {
      id: 1,
    },
    include: {
      address: true,
      phones: true,
    },
  });

  if (!company) {
    return null;
  }

  return (
    <CompanyFormContainer company={company}>
      <UpdateCompanyForm company={company} />
    </CompanyFormContainer>
  );
}
