// spell-checker: disable

import Polyglot from 'node-polyglot';

export enum OrdersTableContentPhrases {
  ID = 'id',
  STATUS = 'status',
}

export const ordersTableContent = new Polyglot({
  locale: 'he',
  phrases: {
    [OrdersTableContentPhrases.STATUS]: 'סטטוס',
    [OrdersTableContentPhrases.ID]: 'זהות ההזמנה',
  },
});
