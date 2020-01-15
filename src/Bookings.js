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
    let currentGuestBookings = this.bookingData.filter(booking => booking.userID === id);
    return currentGuestBookings.reduce((acc, sum) => {
      let pricePerRoom = Math.floor(this.roomData.find(room => parseInt(room.number) === parseInt(sum.roomNumber)).costPerNight);
      return acc += pricePerRoom;
    }, 0);
  }
  findAvailableRooms(date, selectedType) {
    if (selectedType === undefined) {
      return this.roomData.filter(room => {
        return !this.bookingData.find(booking => {
          return (room.number === booking.roomNumber && date === booking.date);
        })
      })
    } else {
      let filteredByType = this.roomData.filter(room => room.roomType === selectedType)
      return filteredByType.filter(room => {
        return !this.bookingData.find(booking => {
          return (room.number === booking.roomNumber && date === booking.date);
        })
      })
    }
  }
  findTotalRevenue(date) {
    // NOTE: Due to weird bug, 'date' is hardcoded as '2020/02/16' in index.js line 103-104
    return this.bookingData.filter(booking => booking.date === date).reduce((acc, sum) => {
      let pricePerRoom = Math.floor(this.roomData.find(room => room.number === sum.roomNumber).costPerNight);
      return acc += pricePerRoom;
    }, 0)
  }
}

export default Bookings;
