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
  it('findPastBookings() method should find bookings older than the date', function() {

  })
  it('findUpcomingBookings() method should find bookings newer than the date', function() {

  })
  it('getTotalSpent() method should return a number', function() {

  })
  it('findAvailableRooms() method should find bookings that match the parameters', function() {

  })
  it('findTotalRevenue() method should return a number', function() {

  })




})
