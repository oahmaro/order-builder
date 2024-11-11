// spell-checker: disable

import Polyglot from 'node-polyglot';

export enum OrderItemCardContentPhrases {
  REMOVE_ORDER = 'remove-order',
  IMAGE_DIMENSIONS = 'image-dimensions',
  WIDTH = 'width',
  HEIGHT = 'height',
  FRAME_NUMBER = 'frame-number',
  PASSEPARTOUT_NUMBER = 'passepartout-number',
  PASSEPARTOUT_WIDTH = 'passepartout-width',
  GLASS_TRANSPARENT = 'glass-transparent',
  GLASS_MATTE = 'glass-matte',
  GLASS_NONE = 'glass-none',
  GLASS_PERSPEX = 'glass-perspex',
  GLASS_MIRROR = 'glass-mirror',
  ADHESIONS = 'adhesions',
  PRINTS = 'prints',
  DESCRIPTION = 'description',
  NOTES = 'notes',
  QUANTITY = 'quantity',
  UNIT_PRICE = 'unit-price',
  PRICE = 'price',
  DIMENSIONS_REQUIRED = 'dimensions-required',
}

export const orderItemCardContent = new Polyglot({
  locale: 'he',
  phrases: {
    [OrderItemCardContentPhrases.REMOVE_ORDER]: 'הסר הזמנה',
    [OrderItemCardContentPhrases.IMAGE_DIMENSIONS]: 'מידות תמונה',
    [OrderItemCardContentPhrases.WIDTH]: 'רוחב',
    [OrderItemCardContentPhrases.HEIGHT]: 'גובה',
    [OrderItemCardContentPhrases.FRAME_NUMBER]: 'מספר מסגרת',
    [OrderItemCardContentPhrases.PASSEPARTOUT_NUMBER]: 'מספר פספרטו',
    [OrderItemCardContentPhrases.PASSEPARTOUT_WIDTH]: 'רוחב פספרטו',
    [OrderItemCardContentPhrases.GLASS_TRANSPARENT]: 'זכוכית שקוף',
    [OrderItemCardContentPhrases.GLASS_MATTE]: 'זכוכית מט',
    [OrderItemCardContentPhrases.GLASS_NONE]: 'בלי זכוכית',
    [OrderItemCardContentPhrases.GLASS_PERSPEX]: 'פרספקס',
    [OrderItemCardContentPhrases.GLASS_MIRROR]: 'מראה',
    [OrderItemCardContentPhrases.ADHESIONS]: 'הדבקות',
    [OrderItemCardContentPhrases.PRINTS]: 'הדפסות',
    [OrderItemCardContentPhrases.DESCRIPTION]: 'תיאור',
    [OrderItemCardContentPhrases.NOTES]: 'הערות',
    [OrderItemCardContentPhrases.QUANTITY]: 'כמות',
    [OrderItemCardContentPhrases.UNIT_PRICE]: 'מחיר יחידה',
    [OrderItemCardContentPhrases.PRICE]: 'מחיר',
    [OrderItemCardContentPhrases.DIMENSIONS_REQUIRED]: 'רוחב וגובה נדרשים',
  },
});
