import $ from 'jquery';
// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

// import classes
import Customer from './Customer.js';
import Manager from './Manager.js';
import Bookings from './Bookings.js';

// variables //
let todaysDate = getDate();
let userData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users').then(response => response.json()).then(data => data.users);
let roomData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms').then(response => response.json()).then(data => data.rooms);
let bookingData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings').then(response => response.json()).then(data => data.bookings);
let currentCustomer;
let chosenDate;
let booking;
let manager;

// fetching logic pt.2 (pt.1 in variables) //
Promise.all([userData, roomData, bookingData]).then(data => {
  userData = data[0];
  roomData = data[1];
  bookingData = data[2];
}).then(() => {
  booking = new Bookings(bookingData, roomData);
})

// EVENT LISTENERS //

$('.login-btn').on('click', evaluateCredentials);
$('.logout-btn').on('click', returnToHome);

// DOM UPDATES //
function returnToHome() {
  location.reload();
}

function evaluateCredentials() {
  let passwordInputVal = $('.password-input').val();
  let usernameInputVal = $('.username-input').val();
  let customerUserName = usernameInputVal.slice(0, 8);
  let customerId = parseInt(usernameInputVal.slice(8, 10));

  if (usernameInputVal.length === 10 && customerUserName === 'customer' && customerId <= 50 && passwordInputVal === 'overlook2019') {
    currentCustomer = new Customer(customerId, userData.find(data => customerId === data.id).name, booking.findPastBookings(todaysDate, customerId), booking.findUpcomingBookings(todaysDate, customerId));
    changeToCustomerDash();
  } else if (usernameInputVal === 'manager' && passwordInputVal === 'overlook2019') {
    manager = new Manager();
    changeToManagerDash();
  } else {
    displayErrors();
  }
}

function changeToCustomerDash() {
  console.log(currentCustomer);

  $('.login-page').addClass('hidden');
  $('.customer-dash').removeClass('hidden');
  $('.username-h2').text(`${currentCustomer.name}'s Guest Portal`);
  $('#book-room-btn').on('click', showBookingPage);

  updatePastBookingsHTML(currentCustomer.pastBookings);
  updateUpcomingBookingsHTML(currentCustomer.upcomingBookings);
  updateTotalSpendHTML();
}

function updatePastBookingsHTML(pastBookings) {
  pastBookings.forEach(booking => $('.past-booked-list').append(`<li>You stayed in room ${booking.roomNumber} on ${booking.date}</li>`));
}

function updateUpcomingBookingsHTML(upcomingBookings) {
  upcomingBookings.forEach(booking => $('.upcoming-booked-list').append(`<li>You are staying in room ${booking.roomNumber} on ${booking.date}</li>`));
}

function updateUpcomingBookingsManager(upcomingBookings) {
  upcomingBookings.forEach(booking => $('.upcoming-booked-list').append(`<li>You are staying in room ${booking.roomNumber} on ${booking.date}<button class="${booking.roomNumber}" id="delete-booking-btn">Delete Booking</button></li>`));
}

function updateTotalSpendHTML(pastBookings) {
  $('#dollar-amount').text(`$${booking.getTotalSpent(currentCustomer.id)}`);
}

function changeToManagerDash() {
  $('.login-page').addClass('hidden');
  $('.manager-dash').removeClass('hidden');
  displayRevenue(booking.findTotalRevenue(todaysDate))
  displayAvailRoomsManager(booking.findAvailableRooms(todaysDate))
  $('#search-guest-btn').on('click', searchForGuest);
}

function searchForGuest() {
  let nameToFind = $('.user-search-input').val();
  let searchedUserID = userData.find(user => user.name === nameToFind).id;
  currentCustomer = new Customer(searchedUserID, userData.find(data => searchedUserID === data.id).name, booking.findPastBookings(todaysDate, searchedUserID), booking.findUpcomingBookings(todaysDate, searchedUserID));

  displayGuestInfo();
}

function displayGuestInfo() {
  $('.manager-dash').addClass('hidden');
  $('.customer-dash').removeClass('hidden');
  $('.username-h2').text(`Manager Portal for Guest: ${currentCustomer.name}`);
  $('#book-room-btn').text('Adjust Guest Bookings');
  $('#book-room-btn').on('click', showBookingPage);

  updatePastBookingsHTML(currentCustomer.pastBookings);
  updateUpcomingBookingsManager(currentCustomer.upcomingBookings);
  updateTotalSpendHTML();

  $('#delete-booking-btn').on('click', removeBooking)
}



function displayAvailRoomsManager(rooms) {
  rooms.forEach(room => $('.available-rooms').append(`<li>Room ${room.number}, a ${room.roomType} with a ${room.bedSize} is still available for tonight. It costs $${room.costPerNight} per night.</li>`));
  $('.percent-occupied').append(`<p id="percentage">${100* (1 - (rooms.length / roomData.length))}% of rooms are occupied tonight so far.</p>`)
}

function displayRevenue(revenue) {
  $('.todays-revenue').append(`<p id="revenue-p">$${revenue}</p>`);
}

function displayErrors() {
  console.log('showing login error');
}

function showBookingPage() {
  $('.room-booking').removeClass('hidden');
  $('.info-boxes').addClass('hidden');
  $('.manager-dash').addClass('hidden');
  $('#check-avail-btn').on('click', displayAvailableRooms);
}

function displayAvailableRooms() {
  $('.available-rooms').html('');
  let selectedType = $('#room-type').val();
  let rawDate = $('#date-input').val();
  let formattedDate = rawDate.toString().replace(/-/g, '/');
  chosenDate = formattedDate;

  let availableRooms = booking.findAvailableRooms(formattedDate, selectedType);
  if (availableRooms.length === 0) {
    displayApology();
  } else {
    availableRooms.forEach(room => $('.available-rooms').append(`<li>Room ${room.number}, a ${room.roomType} with a ${room.bedSize} is available this night. It costs $${room.costPerNight} per night.<button class="book-this-room" id="${room.number}">Book This Room</button></li>`));
    $('.book-this-room').on('click', bookRoom);

  }
}

function displayApology() {
  $('.available-rooms').html('');
  window.alert('We fiercly apologize, but there are no rooms of that type available for your selected date. Please enter a different date or choose a new room type')
}

// these two functions are a little bit of duplication, trying to get around doing this
function bookRoom(event) {
  currentCustomer.bookRoom(event.target.id, chosenDate)
  window.alert(`Room ${event.target.id} has been booked for ${chosenDate}.`)
}

function removeBooking() {
  manager.removeBooking(event.target.classList[0], chosenDate)
}

// helper functions //

function getDate() {
  var today = new Date();
  var date = today.getFullYear() + '/0' + (today.getMonth() + 1) + '/' + today.getDate();
  return date.toString();
}
