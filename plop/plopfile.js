const component = require('./generators/component');

module.exports = async function (plop) {
  plop.setGenerator('component', component);
};
