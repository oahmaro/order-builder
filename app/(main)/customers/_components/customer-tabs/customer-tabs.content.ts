// spell-checker:disable

import Polyglot from 'node-polyglot';

export enum CustomerTabsPhrases {
  DETAILS = 'details',
  ORDERS = 'orders',
}

export const customerTabsContent = new Polyglot({
  locale: 'he',
  phrases: {
    [CustomerTabsPhrases.DETAILS]: 'פרטים',
    [CustomerTabsPhrases.ORDERS]: 'הזמנות',
  },
});
