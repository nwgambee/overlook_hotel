import chai from 'chai';
const expect = chai.expect;

import Customer from '../src/Customer'

describe('Customer', function() {
  let customer;

  beforeEach(function() {
    customer = new Customer();
  })

  it('should have access to the Custmer class', function() {
    expect(customer).to.be.an.instanceOf(Customer);
  })




})
