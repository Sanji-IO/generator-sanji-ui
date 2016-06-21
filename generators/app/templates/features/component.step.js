import * as chai from 'chai';

chai.should();

module.exports = function() {
  this.Given('a user', (next) => {
    browser.get('/');
    next();
  });
};
