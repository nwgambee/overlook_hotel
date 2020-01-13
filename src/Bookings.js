class Bookings {
  constructor(bookingData, roomData) {
    this.bookingData = bookingData;
    this.roomData = roomData;
  }
  findPastBookings(date, id) {
    return this.bookingData.filter(booking => booking.userID === id && date > booking.date)
  }
  findUpcomingBookings(date, id) {
    return this.bookingData.filter(booking => booking.userID === id && date <= booking.date)
  }
}

export default Bookings;
