import chai from 'chai';
const expect = chai.expect;

import Booking from '../src/Bookings'

describe('Bookings', function() {
  let booking;

  beforeEach(function() {
    booking = new Booking();
  })

  it('should have access to the Bookings class', function() {
    expect(booking).to.be.an.instanceOf(Booking);
  })




})
