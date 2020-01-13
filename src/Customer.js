class Customer {
  constructor(id, name, pastBookings, upcomingBookings) {
    this.id = id;
    this.name = name;
    this.pastBookings = pastBookings;
    this.upcomingBookings = upcomingBookings;
  }
  bookRoom(roomNumber, date) {
    fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "userID": this.id,
        "date": date,
        "roomNumber": roomNumber
      })
    }).then(() => {
      console.log('room booked!');
    }).catch(() => {
      console.log('failure to book room');
    })
  }
}

export default Customer;
