import Customer from './Customer';

class Manager extends Customer {
  constructor(id, name, pastBookings, upcomingBookings) {
    super(id, name, pastBookings, upcomingBookings)
  }
  removeBooking(id) {
    console.log(id);
    fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: id,
      })
    }).then(() => {
      console.log('room booking deleted!');
    }).catch(() => {
      console.log('failure to delete booking');
    })
  }
}


export default Manager;
