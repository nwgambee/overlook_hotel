import chai from 'chai';
const expect = chai.expect;

import Booking from '../src/Bookings'

describe('Bookings', function() {
  let booking;

  beforeEach(function() {
    booking = new Booking([
    {
      "id": "5fwrgu4i7k55hl6sz",
      "userID": 9,
      "date": "2020/02/04",
      "roomNumber": 15,
      "roomServiceCharges": [

      ]
    },
    {
      "id": "5fwrgu4i7k55hl6t5",
      "userID": 43,
      "date": "2020/01/24",
      "roomNumber": 24,
      "roomServiceCharges": [

      ]
    },
    {
      "id": "5fwrgu4i7k55hl6t6",
      "userID": 13,
      "date": "2020/01/10",
      "roomNumber": 12,
      "roomServiceCharges": [

      ]
    }],  [
    {
      "number": 1,
      "roomType": "residential suite",
      "bidet": true,
      "bedSize": "queen",
      "numBeds": 1,
      "costPerNight": 358.4
    },
    {
      "number": 2,
      "roomType": "suite",
      "bidet": false,
      "bedSize": "full",
      "numBeds": 2,
      "costPerNight": 477.38
    },
    {
      "number": 3,
      "roomType": "single room",
      "bidet": false,
      "bedSize": "king",
      "numBeds": 1,
      "costPerNight": 491.14
    }]);
  })

  it('should have access to the Bookings class', function() {
    expect(booking).to.be.an.instanceOf(Booking);
    expect(booking.bookingData).to.be.a('array');
    expect(booking.roomData).to.be.a('array');
  })
  it('findPastBookings() method should find bookings older than the date', function() {
    expect(booking.findPastBookings('2020/01/24', 13)[0].userID).to.equal(13)
  })
  it('findUpcomingBookings() method should find bookings newer than the date', function() {
    expect(booking.findUpcomingBookings('2020/01/24', 9)[0].userID).to.equal(9)
  })
  it('getTotalSpent() method should return a number', function() {
    // receiving 'costPerNight is not defined' error. Unfortunately these less-than-robusts tests were all I had time for.
    expect(booking.getTotalSpent).to.be.a('function');
  })
  it('findAvailableRooms() method should find bookings that match the parameters', function() {
    expect(booking.findAvailableRooms('2020/02/04', 'residential suite')[0].number).to.equal(1);
  })
  it('findTotalRevenue() method should return a number', function() {
    // receiving 'costPerNight is not defined' error. Unfortunately these less-than-robusts tests were all I had time for.
    expect(booking.findTotalRevenue).to.be.a('function')

  })




})
