import React from 'react';
import { MantineProvider, ColorSchemeScript, DirectionProvider } from '@mantine/core';
import '@mantine/core/styles.css';

import { theme } from '@/theme';
import classes from './layout.module.css';

export const metadata = {
  title: 'בונה מסדר עומנו',
  description: 'אפליקציה ליצירה וניהול הזמנות',
};

export default async function RootLayout({ children }: { children: any }) {
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

      <body className={classes.body}>
        <DirectionProvider>
          <MantineProvider theme={theme}>
            <main className={classes.main}>{children}</main>
          </MantineProvider>
        </DirectionProvider>
      </body>
    </html>
  );
}
