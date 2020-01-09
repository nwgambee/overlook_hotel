import chai from 'chai';
const expect = chai.expect;

import Manager from '../src/Manager'

describe('Manager', function() {
  let manager;

  beforeEach(function() {
    manager = new Manager();
  })

  it('should have access to the Manager class', function() {
    expect(manager).to.be.an.instanceOf(Manager);
  })




})
