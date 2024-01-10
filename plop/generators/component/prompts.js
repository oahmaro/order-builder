module.exports = [
  {
    type: 'input',
    name: 'componentName',
    message: "What is the name of your component? (Don't worry about casing)",
    validate: function (value) {
      if (!value || value.trim() === '') {
        return 'Component name is required';
      }
      return true;
    },
  },
  {
    type: 'confirm',
    name: 'shouldForwardRef',
    message: 'Do you want to forward ref in your component?',
    default: false,
  },
  {
    type: 'checkbox',
    name: 'files',
    message: 'Which additional files would you like to generate for your component?',
    choices: [
      { name: 'Storybook', value: 'storybook' },
      { name: 'Unit test', value: 'unit-test' },
    ],
  },
];
