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
  getTotalSpent(id) {
    // return id;
    let currentGuestBookings = this.bookingData.filter(booking => booking.userID === id);
    return currentGuestBookings.reduce((acc, sum) => {
      let pricePerRoom = Math.floor(this.roomData.find(room => room.number === sum.roomNumber).costPerNight);
      return acc += pricePerRoom;
    }, 0);
  }
  findAvailableRooms(date) {
    return this.roomData.filter(room => {
      return !this.bookingData.find(booking => {
        return (room.number === booking.roomNumber && date === booking.date);
      })
    })
  }
}

export default Bookings;
