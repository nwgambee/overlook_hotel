import chai from 'chai';
const expect = chai.expect;

const spies = require('chai-spies');
chai.use(spies);

import Customer from '../src/Customer'

describe('Customer', function() {
  let customer;
  let spyFetch;

  beforeEach(function() {
    spyFetch = chai.spy.on(global, 'fetch', () => {
      return new Promise((resolve, reject) => {
        resolve({message: 'fetch complete'})
      })
    })
    customer = new Customer(13, 'Christina Kulas',[],[]);
  });

  // https://stackoverflow.com/questions/39244242/what-is-the-correct-way-of-using-sinon-spy-restore-or-reset
  afterEach(() => {
    chai.spy.restore(spyFetch);
  })

  it('should have access to the Customer class', function() {
    expect(customer).to.be.an.instanceOf(Customer);
  })
  it('should have a name and id property', function() {
    expect(customer.id).to.equal(13);
    expect(customer.name).to.equal('Christina Kulas')
  })
  it('should have two booking properties', function() {
    expect(customer.pastBookings).to.be.a('array');
    expect(customer.upcomingBookings).to.be.a('array');
  })
  it('should utilize fetch() in customer.bookRoom', function() {
    customer.bookRoom(5, '2020/11/11');
    expect(spyFetch).to.have.been.called(1);
  })




})
