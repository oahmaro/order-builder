'use client';

import { useEffect } from 'react';
import { nprogress } from '@mantine/nprogress';
import { usePathname, useSearchParams } from 'next/navigation';

export interface NprogressCompleteProps {}

export default function NProgressDone() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => nprogress.complete(), [pathname, searchParams]);
  return null;
}
