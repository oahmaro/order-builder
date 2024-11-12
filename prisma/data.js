// spell-checker: disable

const { UserRole } = require('@prisma/client');

const users = [{ username: 'admin', password: 'admin', role: UserRole.ADMIN, active: true }];

const adhesionOptions = [
  'מתיחה על עץ 1.7',
  'מתיחה על עץ 2.7',
  'מתיחה על עץ 3.0',
  'זכוכית כפול',
  'הדבקה על קרטון ביצוע',
  'הדבקה על קאפה 10 מ״מ',
  'הדבקה על זכוכית',
  'הדבקה על PVC',
  'הדבקה עם למינציה',
  'בלי הדבקה על קרטון ביצוע',
];

const adhesions = adhesionOptions.map((adhesion) => ({
  name: adhesion,
  createdAt: new Date(),
  updatedAt: null,
}));

const printOptions = [
  'הדפסה על קנבס',
  'הדפסה על קנבס עם עיטוף גלריה',
  'הדפסה על קנבס עם עיטוף צבע',
  'הדפסה על נייר luster',
  'הדפסה על נייר art',
  'הדפסה על זכוכית',
  'גרפיקה לתונה',
  'סריק תמונה',
];

const prints = printOptions.map((print) => ({
  name: print,
  createdAt: new Date(),
  updatedAt: null,
}));

const descriptionOptions = [
  'פס זהב',
  'פס כסף',
  'פס שחור',
  'שוליים מסביב לתמונה',
  'לבטל שוליים מסביב לתמונה',
  'פספרטו חלונות',
  'הדבקה תמונה על פספרטו',
];

const descriptions = descriptionOptions.map((description) => ({
  name: description,
  createdAt: new Date(),
  updatedAt: null,
}));

const company = {
  name: 'אומנות המסגור',
  email: 'omanut.hm@gmail.com',
  address: {
    streetAddress: 'שילת בנין מגה אור',
    city: 'ירושלים',
    country: 'ישראל',
    stateProvince: 'ירושלים',
    postalCode: null,
  },
  phones: [
    {
      countryCode: 'IL',
      dialingCode: '+972',
      number: '522039315',
      type: 'WORK',
      isPrimary: true,
    },
  ],
};

module.exports = {
  users,
  adhesions,
  prints,
  descriptions,
  company,
};
