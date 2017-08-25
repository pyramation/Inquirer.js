/**
 * Inquirer overrides
 */

var expect = require('chai').expect;
var inquirer = require('../../lib/inquirer');
var autosubmit = require('../helpers/events').autosubmit;

describe('inquirer overrides', function () {
  beforeEach(function () {
    this.prompt = inquirer.createPromptModule();
  });

  it('should allow user to specify overrides', function () {
    var overrides = {
      q1: false
    };
    var prompts = [
      {
        type: 'confirm',
        name: 'q1',
        message: 'message',
        default: true
      },
      {
        type: 'confirm',
        name: 'q2',
        message: 'message',
        default: false
      }
    ];
    var promise = this.prompt(prompts, overrides);
    autosubmit(promise.ui);

    return promise.then(function (answers) {
      expect(answers.q1).to.be.false;
      expect(answers.q2).to.be.false;
    });
  });
});
