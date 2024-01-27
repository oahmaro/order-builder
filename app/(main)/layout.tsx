import React, { Suspense } from 'react';
import { MantineProvider, ColorSchemeScript, DirectionProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { NavigationProgress } from '@mantine/nprogress';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/nprogress/styles.css';

import { theme } from '../../theme';
import './global.css';
import { Header } from '@/components/header';
import NProgressDone from '@/components/nprogress-complete/nprogress-complete';

export const metadata = {
  title: 'בונה מסדר עומנו',
  description: 'אפליקציה ליצירה וניהול הזמנות',
};

export default function RootLayout({ children }: { children: any }) {
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
              <NProgressDone />
            </Suspense>

            <Header />

            <main>{children}</main>
          </MantineProvider>
        </DirectionProvider>
      </body>
    </html>
  );
}
