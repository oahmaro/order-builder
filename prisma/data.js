const { UserRole } = require('@prisma/client');

const users = [
  { id: 1, username: 'rami', password: '12345678', role: UserRole.ADMIN },
  { id: 2, username: 'ashraf', password: '12345678', role: UserRole.USER },
];

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

const adhesions = adhesionOptions.map((adhesion, index) => ({
  id: index + 1,
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

const prints = printOptions.map((print, index) => ({
  id: index + 1,
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

const descriptions = descriptionOptions.map((description, index) => ({
  id: index + 1,
  name: description,
  createdAt: new Date(),
  updatedAt: null,
}));

module.exports = {
  users,
  adhesions,
  prints,
  descriptions,
};
