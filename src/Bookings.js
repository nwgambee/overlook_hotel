class Bookings {
  constructor(bookingData, roomData) {
    this.bookingData = bookingData;
    this.roomData = roomData;
  }
  findPastBookings(date, id) {
    // find this customer's bookings
    // return 'past bookings';
    console.log(date);
    console.log(id);
  }
  findUpcomingBookings(date, id) {
    return 'upcoming bookings';
  }
}

export default Bookings;
