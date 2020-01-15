import chai from 'chai';
const expect = chai.expect;

const spies = require('chai-spies');
chai.use(spies);

import Manager from '../src/Manager'

describe('Manager', function() {
  let manager;
  let spyFetch;

  beforeEach(function() {
    manager = new Manager();
    spyFetch = chai.spy.on(global, 'fetch', () => {
      return new Promise((resolve, reject) => {
        resolve({message: 'fetch complete'})
      })
    })
  });

  // https://stackoverflow.com/questions/39244242/what-is-the-correct-way-of-using-sinon-spy-restore-or-reset
  afterEach(() => {
    chai.spy.restore(spyFetch);
    })

  it('should have access to the Manager class', function() {
    expect(manager).to.be.an.instanceOf(Manager);
  })

  it('should utilize fetch() in manager.removeBooking', function() {
    manager.bookRoom(5, '2020/11/11');
    expect(spyFetch).to.have.been.called(1);
  })

})
