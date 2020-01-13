class Bookings {
  constructor(bookingData, roomData) {
    this.bookingData = bookingData;
    this.roomData = roomData;
  }
  findPastBookings() {
    // find this customer's bookings
    return 'past bookings';
  }
  findUpcomingBookings() {
    return 'upcoming bookings';
  }
}

export default Bookings;
