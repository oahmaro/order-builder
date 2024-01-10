module.exports = ({ shouldForwardRef, files }) => {
  const actions = [];

  const template = 'templates/component';

  const path = '../components/{{dashCase componentName}}';

  if (shouldForwardRef) {
    actions.push({
      type: 'add',
      path: `${path}/{{dashCase componentName}}.tsx`,
      templateFile: `${template}/component-with-forwarded-ref.hbs`,
    });
  } else {
    actions.push({
      type: 'add',
      path: `${path}/{{dashCase componentName}}.tsx`,
      templateFile: `${template}/component.hbs`,
    });
  }

  actions.push({
    type: 'add',
    path: `${path}/{{dashCase componentName}}.module.css`,
    templateFile: `${template}/component.module.hbs`,
  });

  actions.push({
    type: 'add',
    path: `${path}/index.ts`,
    templateFile: `${template}/index.hbs`,
  });

  files.forEach((file) => {
    if (file === 'storybook') {
      actions.push({
        type: 'add',
        path: `${path}/{{dashCase componentName}}.story.tsx`,
        templateFile: `${template}/component.stories.hbs`,
      });
    }

    if (file === 'unit-test') {
      actions.push({
        type: 'add',
        path: `${path}/{{dashCase componentName}}.test.tsx`,
        templateFile: `${template}/component.test.hbs`,
      });
    }
  });

  return actions;
};
