import React, { ReactNode, Suspense } from 'react';
import { MantineProvider, ColorSchemeScript, DirectionProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { NavigationProgress } from '@mantine/nprogress';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/nprogress/styles.css';

import { theme } from '../../theme';
import './global.css';
import { Header } from '@/components/header';
import { NprogressComplete } from '@/components';
import { auth } from '@/auth';

export const metadata = {
  title: 'בונה מסדר עומנו',
  description: 'אפליקציה ליצירה וניהול הזמנות',
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const session = await auth();

  return (
    <html lang="he" dir="rtl">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>

      <body>
        <DirectionProvider>
          <MantineProvider theme={theme}>
            <Notifications />
            <NavigationProgress />
            <Suspense fallback={null}>
              <NprogressComplete />
            </Suspense>
            <Header user={session?.user} />
            <main>{children}</main>
          </MantineProvider>
        </DirectionProvider>
      </body>
    </html>
  );
}
