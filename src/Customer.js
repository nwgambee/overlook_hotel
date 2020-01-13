class Customer {
  constructor(id, name, pastBookings, upcomingBookings) {
    this.id = id;
    this.name = name;
    this.pastBookings = pastBookings;
    this.upcomingBookings = upcomingBookings;
  }
  bookRoom(roomNumber, date) {
    console.log(roomNumber);
    console.log(date);
  }
}

export default Customer;
